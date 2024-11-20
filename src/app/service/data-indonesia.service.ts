import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataIndonesiaService {
  private apiUrl = 'https://kodepos.vercel.app/search/?q=';

  constructor(private http: HttpClient) {}

  searchDesa(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${query}`).pipe(
      map((response: any) => response.data || [])
    );
  }
}
