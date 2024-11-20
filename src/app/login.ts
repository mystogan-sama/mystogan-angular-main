import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { AuthService } from './service/auth.service';
import Swal from 'sweetalert2';

@Component({
    moduleId: module.id,
    templateUrl: './login.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    store: any;
    currYear: number = new Date().getFullYear();
    constructor(
        private authService: AuthService,
        public translate: TranslateService,
        public storeData: Store<any>,
        public router: Router,
        private appSetting: AppService
    ) {
        this.initStore();
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    onSubmit(): void {
        this.authService.login(this.email, this.password).subscribe(
            (response) => {
                if (response.access_token) {
                    localStorage.setItem('access_token', response.access_token);
                    this.router.navigate(['/dashboard']); // Ubah ke rute yang sesuai setelah login
                    localStorage.setItem('user_info', JSON.stringify(response));  // Store the user info
                    this.showMessage('Login successful!', 'top-end', 'success');
                } else {
                    console.error('No access token in response', response);
                    this.showMessage('Login failed. No token received.', 'top-end', 'error');
                }
            },
            (error) => {
                console.error('Login failed', error);
                this.showMessage('Login failed. Please try again.', 'top-end', 'error');
            }
        );
    }

    private showMessage(
        msg: string,
        position: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' = 'bottom-start',
        icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'info',
        showCloseButton = true,
        closeButtonHtml = '',
        duration = 3000
    ) {
        const toast = Swal.mixin({
            toast: true,
            position: position || 'bottom-start',
            showConfirmButton: false,
            timer: duration,
            showCloseButton: showCloseButton,
            background: icon === 'success' ? '#228B22' : icon === 'error' ? '#8B0000' : '', // Hijau untuk sukses, merah untuk error
        });
        toast.fire({
            title: msg,
            icon: icon,
        });
    }

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);
        if (this.store.locale?.toLowerCase() === 'ae') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
        }
        window.location.reload();
    }
}
