import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = 'http://localhost:8000/auth';
    private apiiUrl = 'http://localhost:8000/api';

    constructor(private http: HttpClient, private router: Router) {}

    login(email: string, password: string): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap((response) => {
                if (response && response.access_token) {
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('user_info', JSON.stringify(response));  // Store the user info
                }
            }),
            catchError((error) => {
                console.error('Login error', error);
                return throwError(error);
            })
        );
    }

    logout(): void {
        const token = localStorage.getItem('access_token');
        this.http.post(`${this.apiUrl}/logout`, { token }).subscribe(() => {
            localStorage.removeItem('access_token');
            this.router.navigate(['/login']);
        });
    }

    isLoggedIn(): boolean {
        return localStorage.getItem('access_token') !== null;
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }

    getAuthHeaders(): HttpHeaders {
        const token = this.getToken();
        if (token) {
            return new HttpHeaders({
                Authorization: `Bearer ${token}`,
            });
        }
        return new HttpHeaders();
    }

    getUserInfo(): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get<any>(`${this.apiiUrl}/users/`, { headers }).pipe(
            tap((response) => {
                // Lakukan sesuatu dengan data pengguna yang diterima
            }),
            catchError((error) => {
                console.error('Error fetching user info', error); // Tambahkan log untuk debug
                return throwError(error);
            })
        );
    }
}
