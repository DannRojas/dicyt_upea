import { ActivityInterface } from './../Models/activity';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  private url_api: string = "http://localhost:3000/api/activityes";
  private token: string = this.authService.getToken();

  private selectedActivity: ActivityInterface = {};

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: this.token
  });

  getAllActivities(): Observable<ActivityInterface[]>{
    let url = `${this.url_api}?access_token=${this.token}`;
    return this.http.get<ActivityInterface[]>(url, {headers: this.headers});
  }

  getActivityById(activity_code: number): Observable<ActivityInterface>{
    let url: string = `${this.url_api}/${activity_code}?access_token=${this.token}`;
    return this.http.get<ActivityInterface>(url, {headers: this.headers});
  }

  getActivityByAttribute(attribute: string, equal:any): Observable<ActivityInterface[]>{
    let url: string = `${this.url_api}?filter[where][${attribute}]=${equal}&access_token=${this.token}`;
    return this.http.get<ActivityInterface[]>(url, {headers : this.headers});
  }

  saveActivity(activity: ActivityInterface): Observable<ActivityInterface>{
    let url: string = `${this.url_api}?access_token=${this.token}`;
    this.onPrepareActivity(activity);
    return this.http.post<ActivityInterface>(url, this.selectedActivity, {headers: this.headers});
  }

  updateActivity(activity: ActivityInterface): Observable<ActivityInterface>{
    this.onPrepareActivity(activity);
    console.log(this.selectedActivity);
    const url = `${this.url_api}/${activity.activity_code}?access_token=${this.token}`;
    return this.http.put<ActivityInterface>(url, this.selectedActivity, { headers: this.headers });
  }

  deleteActivity(activity_code: number) {
    const url = `${this.url_api}/${activity_code}?access_token=${this.token}`;
    return this.http.delete(url, { headers: this.headers }).pipe(map(data => data));
  }

  onPrepareActivity(activity: ActivityInterface){
    this.selectedActivity.start_date = activity.start_date;
    this.selectedActivity.ending_date = activity.ending_date;
    this.selectedActivity.finished = activity.finished;
    this.selectedActivity.type = activity.type;
    this.selectedActivity.project_code = activity.project_code;
  }
}
