import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { InvestigationInterface } from '../Models/Investigation_Project';

@Injectable({
  providedIn: 'root'
})
export class InvestigationService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private url_api: string = "http://localhost:3000/api/investigations_projects";
  private token: string = this.authService.getToken();

  private selectedInvestigation: InvestigationInterface = {};

  public pathImage: string = "localhost:3000/api/containers/images/download/"

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token
  });

  getAllInvestigations(): Observable<InvestigationInterface[]>{
    let url = `${this.url_api}?access_token=${this.token}`;
    return this.http.get<InvestigationInterface[]>(url, {headers: this.headers});
  }

  getInvestigationById(investigation_code: number){
    let url: string = `${this.url_api}/${investigation_code}?access_token=${this.token}`;
    return this.http.get<InvestigationInterface>(url, {headers: this.headers});
  }

  getInvestigationsByAttribute(attribute: string, equal:any): Observable<InvestigationInterface[]>{
    let url: string = `${this.url_api}?filter[where][${attribute}]=${equal}&access_token=${this.token}`;
    return this.http.get<InvestigationInterface[]>(url, {headers : this.headers});
  }

  saveInvestigation(investigation: InvestigationInterface): Observable<InvestigationInterface>{
    let url: string = `${this.url_api}?access_token=${this.token}`;
    this.onPrepareInvestigation(investigation);
    return this.http.post<InvestigationInterface>(url, this.selectedInvestigation, {headers: this.headers});
  }

  updateInvestigation(investigation: InvestigationInterface): Observable<InvestigationInterface>{
    this.onPrepareInvestigation(investigation);
    console.log(this.selectedInvestigation);
    const url = `${this.url_api}/${investigation.institute_code}?access_token=${this.token}`;
    return this.http.put<InvestigationInterface>(url, this.selectedInvestigation, { headers: this.headers });
  }

  deleteProject(investigation_code: string) {
    const url = `${this.url_api}/${investigation_code}?access_token=${this.token}`;
    return this.http.delete(url, { headers: this.headers }).pipe(map(data => data));
  }

  onPrepareInvestigation(investigation: InvestigationInterface){
    this.selectedInvestigation.research_name = investigation.research_name;
    this.selectedInvestigation.research_topic = investigation.research_topic;
    this.selectedInvestigation.description = investigation.description || "Sin descripción";
    this.selectedInvestigation.investment_amount = investigation.investment_amount;
    this.selectedInvestigation.start_date = investigation.start_date;
    this.selectedInvestigation.ending_date = investigation.ending_date;
    this.selectedInvestigation.state = investigation.state;
    this.selectedInvestigation.image = investigation.image;
    this.selectedInvestigation.number_activities = investigation.number_activities;
    this.selectedInvestigation.interinstitutional_agreement = investigation.interinstitutional_agreement || "Sin Convenios";
    this.selectedInvestigation.institute_code = investigation.institute_code;
    this.selectedInvestigation.investigatorCode = investigation.investigatorCode || 0;
  }
}
