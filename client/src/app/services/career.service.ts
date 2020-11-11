import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { InstituteInterface, InstitutePrepareInterface } from '../Models/Institute';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private url_api: string = "http://localhost:3000/api/careers_institutes";
  private token: string = this.authService.getToken();

  private selectedInstitute: InstitutePrepareInterface = {};

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token
  });

  getAllInstitutes(): Observable<InstituteInterface[]>{
    let url = `${this.url_api}?access_token=${this.token}`;
    return this.http.get<InstituteInterface[]>(url, {headers: this.headers});
  }

  getInstituteById(institute_code: number){
    let url: string = `${this.url_api}/${institute_code}?access_token=${this.token}`;
    return this.http.get<InstituteInterface>(url, {headers: this.headers});
  }

  saveInstitute(institute: InstituteInterface): Observable<InstituteInterface>{
    this.onPrepareInstitute(institute);
    let url: string = `${this.url_api}?access_token=${this.token}`;
    return this.http.post<InstituteInterface>(url, this.selectedInstitute, {headers: this.headers});
  }

  updateInstitute(institute: InstituteInterface): Observable<InstituteInterface> {
    this.onPrepareInstitute(institute);
    const url = `${this.url_api}/${institute.institute_code}?access_token=${this.token}`;
    return this.http.put<InstituteInterface>(url, this.selectedInstitute, { headers: this.headers }).pipe(map(data => data));
  }

  deleteInstitute(institute_code: number) {
    const url = `${this.url_api}/${institute_code}?access_token=${this.token}`;
    return this.http.delete(url, { headers: this.headers }).pipe(map(data => data));
  }

  onPrepareInstitute(institute: InstituteInterface){
    this.selectedInstitute.institute_name = institute.institute_name;
    this.selectedInstitute.ubication = institute.ubication;
    this.selectedInstitute.type = institute.type;
    this.selectedInstitute.image = institute.image;
  }
}
