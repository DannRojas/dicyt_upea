import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { InvestigatorInterface } from '../Models/investigator';
import { CompInvestigatorInterface } from '../Models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InvestigatorService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private url_api: string = "http://localhost:3000/api/investigators";
  private token: string = this.authService.getToken();

  private selectedInvestigator: InvestigatorInterface = {};

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token
  });

  getCompleteInvestigators(investigators: CompInvestigatorInterface[]){
    investigators.map(investigator => {
      this.authService.getUserByID(investigator.id_user).subscribe(user => {
        investigator.user = Object.assign({}, user);
      })
    })
    return of<CompInvestigatorInterface[]>(investigators);
  }

  getAllInvestigators(): Observable<InvestigatorInterface[]>{
    let url = `${this.url_api}?access_token=${this.token}`;
    return this.http.get<InvestigatorInterface[]>(url, {headers: this.headers});
  }

  getInvestigatorById(investigatorCode: number){
    let url: string = `${this.url_api}/${investigatorCode}?access_token=${this.token}`;
    return this.http.get<InvestigatorInterface>(url, {headers: this.headers});
  }

  getInvestigatorsByAttribute(attribute: string, equal:any): Observable<any[]>{
    let url: string = `${this.url_api}?filter[where][${attribute}]=${equal}&access_token=${this.token}`;
    return this.http.get<any[]>(url, {headers : this.headers});
  }

  saveInvestigator(investigator: InvestigatorInterface): Observable<InvestigatorInterface>{
    this.onPrepareInvestigator(investigator);
    let url: string = `${this.url_api}?access_token=${this.token}`;
    return this.http.post<InvestigatorInterface>(url, this.selectedInvestigator, {headers: this.headers});
  }

  updateInvestigator(investigator: InvestigatorInterface): Observable<InvestigatorInterface> {
    this.onPrepareInvestigator(investigator);
    const url = `${this.url_api}/${investigator.investigatorCode}?access_token=${this.token}`;
    return this.http.put<InvestigatorInterface>(url, this.selectedInvestigator, { headers: this.headers }).pipe(map(data => data));
  }

  deleteInvestigator(investigatorCode: number) {
    const url = `${this.url_api}/${investigatorCode}?access_token=${this.token}`;
    return this.http.delete(url, { headers: this.headers }).pipe(map(data => data));
  }

  onPrepareInvestigator(investigator: InvestigatorInterface){
    this.selectedInvestigator.id_user = investigator.id_user;
    this.selectedInvestigator.type = investigator.type;
    this.selectedInvestigator.turn = investigator.turn;
    this.selectedInvestigator.year = investigator.year;
    this.selectedInvestigator.institute_code = investigator.institute_code;
  }
}
