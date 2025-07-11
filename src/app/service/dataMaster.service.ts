import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataMasterService {
  private subjekapiUrl = 'http://127.0.0.1:8000/api/subjeks';
  private subjekSumApiUrl = 'http://127.0.0.1:8000/api/subjeks/summary';
  private memberapiUrl = 'http://127.0.0.1:8000/api/members';
  private pbnapiUrl = 'http://127.0.0.1:8000/api/pbn';
  private pendidikanapiUrl = 'http://127.0.0.1:8000/api/pendidikan';
  private roleapiUrl = 'http://127.0.0.1:8000/api/role';
  private rolePermissionapiUrl = 'http://127.0.0.1:8000/api/rolePermission';
  private statusapiUrl = 'http://127.0.0.1:8000/api/status';
  private unitapiUrl = 'http://127.0.0.1:8000/api/unit';
  private usersapiUrl = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) { }



  //student
  getMembers(): Observable<any> {
    return this.http.get<any>(`${this.memberapiUrl}/`);
  }

  getMembersbyId(id: number): Observable<any> {
    return this.http.get<any>(`${this.memberapiUrl}/${id}/`);
  }

  createMember(members: any): Observable<any> {
    return this.http.post(`${this.memberapiUrl}/`, members);
  }

  updateMember(id: number, members: any): Observable<any> {
    return this.http.put(`${this.memberapiUrl}/${id}/`, members);
  }

  deleteMember(id: number): Observable<any> {
    return this.http.delete(`${this.memberapiUrl}/${id}/`);
  }

  //summary
  getSummarySubjek(): Observable<any> {
    return this.http.get<any>(`${this.subjekSumApiUrl}/`);
  }

  //employee
  getEmployees(): Observable<any> {
    return this.http.get<any>(`${this.subjekapiUrl}/`);
  }

  getEmployeebyId(id: number): Observable<any> {
    return this.http.get<any>(`${this.subjekapiUrl}/${id}/`);
  }

  createEmployee(members: any): Observable<any> {
    return this.http.post(`${this.subjekapiUrl}/`, members);
  }

  updateEmployee(id: number, members: any): Observable<any> {
    return this.http.put(`${this.subjekapiUrl}/${id}/`, members);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.subjekapiUrl}/${id}/`);
  }

  getPbn(): Observable<any> {
    return this.http.get<any>(`${this.pbnapiUrl}/`);
  }

  getPendidikan(): Observable<any> {
    return this.http.get<any>(`${this.pendidikanapiUrl}/`);
  }

  getRole(): Observable<any> {
    return this.http.get<any>(`${this.roleapiUrl}/`);
  }

  getRolePermission(): Observable<any> {
    return this.http.get<any>(`${this.rolePermissionapiUrl}/`);
  }

  getStatus(): Observable<any> {
    return this.http.get<any>(`${this.statusapiUrl}/`);
  }

  getUnit(): Observable<any> {
    return this.http.get<any>(`${this.unitapiUrl}/`);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.usersapiUrl}/`);
  }

  uploadImage(vals: any): Observable<any> {
    let data = vals;

    return this.http.post('https://api.cloudinary.com/v1_1/insabaaset/image/upload', data);
  }

}
