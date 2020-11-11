import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { IDHProjectInterface } from '../Models/Project';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient, private authService: AuthService ) { }

  private url_api: string = "http://localhost:3000/api/idh-projects";

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.authService.getToken()
  });

  getAllProject(): Observable<IDHProjectInterface[]>{
    const token = this.authService.getToken();
    const url_api = `${this.url_api}?access_token=${token}`;
    return this.http.get<IDHProjectInterface[]>(this.url_api, { headers: this.headers });
  }

  getProjectById(idProject: number){
    const token = this.authService.getToken();
    let url: string = `${this.url_api}/${idProject}?access_token=${token}`;
    return this.http.get<IDHProjectInterface>(url, { headers: this.headers });
  }

  saveProject(project: IDHProjectInterface){
    const token = this.authService.getToken();
    let url: string = `${this.url_api}?access_token=${token}`;
    return this.http.post(url, project, { headers: this.headers });
  }

  updateProject(project: IDHProjectInterface): Observable<IDHProjectInterface> {
    const token = this.authService.getToken();
    const url_api = `${this.url_api}/${project.project_code}/?access_token=${token}`;
    return this.http.put<IDHProjectInterface>(url_api, project, { headers: this.headers }).pipe(map(data => data));
  }

  deleteProject(id: string) {
    //TODO: get token
    const token = this.authService.getToken();
    const url_api = `${this.url_api}/${id}?access_token=${token}`;
    return this.http.delete(url_api, { headers: this.headers }).pipe(map(data => data));
  }

}



