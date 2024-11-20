import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from 'angular-custom-modal';
import { Events, FileUploadWithPreview, ImageAddedEvent } from 'file-upload-with-preview';
import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { DataMasterService } from 'src/app/service/dataMaster.service';
import { OperationsService } from 'src/app/service/operations.service';
import Swal from 'sweetalert2';

@Component({
    moduleId: module.id,
    templateUrl: './add.html',
})
export class ClassAddComponent {
    @ViewChild('modal2') modal!: ModalComponent;
    userList: any[] = [];
    

    constructor(private operationService: OperationsService, public router: Router, private dataMasterService: DataMasterService) {}
    items: any = [];
    selectedFile = null;
    params: any = {};
    currencyList = [
        'USD - US Dollar',
        'GBP - British Pound',
        'IDR - Indonesian Rupiah',
        'INR - Indian Rupee',
        'BRL - Brazilian Real',
        'EUR - Germany (Euro)',
        'TRY - Turkish Lira',
    ];
    selectedCurrency = 'USD - US Dollar';
    tax: number | undefined;
    discount: number | undefined;
    shippingCharge: number | undefined;
    paymentMethod = '';

    ngOnInit() {
        //set default data
        this.getUser();
        // single image upload
    }

    getUser(): void {
        this.dataMasterService.getMembers().subscribe(
            (data) => {
                this.userList = data;
                console.log(this.userList);
            },
            (error) => {
                console.error('Error fetching unit', error);
            }
        );
    }


    changeDesa(selectedDesa: any): void {
        this.params.provinsi = selectedDesa.province;
        this.params.kabupaten = selectedDesa.regency;
        this.params.kecamatan = selectedDesa.district;
    }

    save() {
        this.operationService.createClass(this.params).subscribe(
            (response) => {
                this.router.navigate(['/apps/training/class/list']);
                this.showMessage('Create Data Successful!', 'top-end', 'success');
            },
            (error) => {
                this.showMessage('Create Data Error!', 'top-end', 'error');
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

    delete(id: number) {
        this.operationService.deleteClass(id).subscribe(
            (response) => {
                console.log('Employee deleted successfully', response);
            },
            (error) => {
                console.error('Error deleting employee', error);
            }
        );
    }

    addItem() {
        let maxId = 0;
        if (this.items && this.items.length) {
            maxId = this.items.reduce((max: number, character: any) => (character.id > max ? character.id : max), this.items[0].id);
        }
        this.items.push({
            id: maxId + 1,
            title: '',
            description: '',
            rate: 0,
            quantity: 0,
            amount: 0,
        });
    }

    removeItem(item: any = null) {
        this.items = this.items.filter((d: any) => d.id != item.id);
    }
}
