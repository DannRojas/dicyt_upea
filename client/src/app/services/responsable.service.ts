import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ResponsableInterface } from '../Models/responsable';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResponsableService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private url_api: string = "http://localhost:3000/api/responsables";
  private token: string = this.authService.getToken();

  private selectedResponsable: ResponsableInterface = {};

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token
  });

  getAllAuxiliaries(): Observable<ResponsableInterface[]>{
    let url = `${this.url_api}?access_token=${this.token}`;
    return this.http.get<ResponsableInterface[]>(url, {headers: this.headers});
  }

  getResponsableById(responsableCode: number){
    let url: string = `${this.url_api}/${responsableCode}?access_token=${this.token}`;
    return this.http.get<ResponsableInterface>(url, {headers: this.headers});
  }

  saveResponsable(responsable: ResponsableInterface): Observable<ResponsableInterface>{
    this.onPrepareResponsable(responsable);
    let url: string = `${this.url_api}?access_token=${this.token}`;
    return this.http.post<ResponsableInterface>(url, this.selectedResponsable, {headers: this.headers});
  }

  updateResponsable(responsable: ResponsableInterface): Observable<ResponsableInterface> {
    this.onPrepareResponsable(responsable);
    const url = `${this.url_api}/${responsable.responsableCode}?access_token=${this.token}`;
    return this.http.put<ResponsableInterface>(url, this.selectedResponsable, { headers: this.headers }).pipe(map(data => data));
  }

  deleteResponsable(responsableCode: number) {
    const url = `${this.url_api}/${responsableCode}?access_token=${this.token}`;
    return this.http.delete(url, { headers: this.headers }).pipe(map(data => data));
  }

  onPrepareResponsable(responsable: ResponsableInterface){
    this.selectedResponsable.id_user = responsable.id_user;
    this.selectedResponsable.year = responsable.year;
  }
}
