import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  private apiUrl = 'http://localhost:8000/api/class';
  private apiClassDetUrl = 'http://localhost:8000/api/classDet';

  constructor(private http: HttpClient) {}

  getClass(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }

  getClassbyId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/`);
  }

  createClass(classes: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, classes);
  }

  updateClass(id: number, classes: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/`, classes);
  }

  deleteClass(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}/`);
  }

  getClassDet(): Observable<any> {
    return this.http.get<any>(`${this.apiClassDetUrl}/`);
  }

  getClassDetbyId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiClassDetUrl}/${id}/`);
  }

  getClassDetbyClass(selectedStudentbyClass: number): Observable<any> {
    return this.http.get<any>(`${this.apiClassDetUrl}/?id_class=${selectedStudentbyClass}`);
  }

  createClassDet(studentList: any): Observable<any> {
    return this.http.post(`${this.apiClassDetUrl}/`, studentList);
  }

  updateClassDet(selectedStudentId: number, student: any): Observable<any> {
    return this.http.put(`${this.apiClassDetUrl}/${selectedStudentId}/`, student);
  }

  deleteClassDet(id: number): Observable<any> {
    return this.http.delete(`${this.apiClassDetUrl}/${id}/`);
  }
}
