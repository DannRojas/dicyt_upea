import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AuxiliarInterface } from '../Models/auxiliar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuxiliarService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private url_api: string = "http://localhost:3000/api/auxiliaries";
  private token: string = this.authService.getToken();

  private selectedAuxiliar: AuxiliarInterface = {};

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token
  });

  getAllAuxiliaries(): Observable<AuxiliarInterface[]>{
    let url = `${this.url_api}?access_token=${this.token}`;
    return this.http.get<AuxiliarInterface[]>(url, {headers: this.headers});
  }

  getAuxiliarById(auxiliarCode: number){
    let url: string = `${this.url_api}/${auxiliarCode}?access_token=${this.token}`;
    return this.http.get<AuxiliarInterface>(url, {headers: this.headers});
  }

  saveAuxiliar(auxiliar: AuxiliarInterface): Observable<AuxiliarInterface>{
    this.onPrepareAuxiliar(auxiliar);
    let url: string = `${this.url_api}?access_token=${this.token}`;
    return this.http.post<AuxiliarInterface>(url, this.selectedAuxiliar, {headers: this.headers});
  }

  updateAuxiliar(auxiliar: AuxiliarInterface): Observable<AuxiliarInterface> {
    this.onPrepareAuxiliar(auxiliar);
    const url = `${this.url_api}/${auxiliar.auxiliarCode}?access_token=${this.token}`;
    return this.http.put<AuxiliarInterface>(url, this.selectedAuxiliar, { headers: this.headers }).pipe(map(data => data));
  }

  deleteAuxiliar(auxiliarCode: number) {
    const url = `${this.url_api}/${auxiliarCode}?access_token=${this.token}`;
    return this.http.delete(url, { headers: this.headers }).pipe(map(data => data));
  }

  onPrepareAuxiliar(auxiliar: AuxiliarInterface){
    this.selectedAuxiliar.id_user = auxiliar.id_user;
    this.selectedAuxiliar.turn = auxiliar.turn;
    this.selectedAuxiliar.year = auxiliar.year;
    this.selectedAuxiliar.institute_code = auxiliar.institute_code;
  }
}
