import { Observable } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInterface } from '../Models/User';
import { map } from 'rxjs/operators';
import { AuxiliarInterface } from '../Models/auxiliar';
import { InvestigatorInterface } from '../Models/investigator';
import { ResponsableInterface } from '../Models/responsable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  private api_url: string = "http://localhost:3000/api/users";

  public confirm: EventEmitter<string> = new EventEmitter<string>();
  public response: EventEmitter<boolean> = new EventEmitter<boolean>();

  private headers: HttpHeaders = new HttpHeaders({
    "Content-type": "application/json",
    Authorization: this.getToken()
  });

  selectedUser: UserInterface = {};

  loginUser(username: string, password: string): any{
    const url = `${this.api_url}/login?include=user`;
    return this.http.post<any>(url,{username: username, password: password});
  }

  logoutUser(){
    let accessToken = localStorage.getItem('accessToken');
    const url_api = `${this.api_url}/logout?access_token=${accessToken}`;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    return this.http.post<UserInterface>(url_api, {headers: this.headers});
  }

  createUser(user: UserInterface){
    let accessToken = localStorage.getItem('accessToken');
    const api_url = `${this.api_url}?access_token=${accessToken}`;
    this.prepareUser(user);
    return this.http.post<UserInterface>(api_url, this.selectedUser, {headers: this.headers}).pipe(map(data => data));
  }

  updateUser(user: UserInterface): Observable<UserInterface>{
    let accessToken = localStorage.getItem('accessToken');
    const url_api = `${this.api_url}/${user.id_user}?access_token=${accessToken}`;
    return this.http.put<UserInterface>(url_api, user, {headers: this.headers});
  }

  changePassword(oldPassword: string, newPassword: string){
    const token = this.getToken();
    const url_api = `${this.api_url}/change-password?access_token=${token}`;
    return this.http.post(url_api, {oldPassword: oldPassword, newPassword: newPassword}, {headers: this.headers});
  }

  deleteUser(idUser: number){
    const accessToken = localStorage.getItem('accessToken');
    const url_api = `${this.api_url}/${idUser}?access_token=${accessToken}`;
    return this.http.delete(url_api, {headers: this.headers});
  }

  setUser(user: UserInterface):void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  setToken(token):void {
    localStorage.setItem('accessToken', token);
  }

  getToken():string {
    return localStorage.getItem("accessToken");
  }

  getCurrentUser():UserInterface {
    let user_string = localStorage.getItem('currentUser');
    if(user_string !== null || user_string !== undefined){
      let user: UserInterface = JSON.parse(user_string);
      return user;
    }else{
      return null;
    }
  }

  getUsers(): Observable<UserInterface[]>{
    return this.http.get<UserInterface[]>(this.api_url, {headers: this.headers});
  }

  getUsersByAttribute(attribute: string, argument: string){
    const token = this.getToken();
    const url = `${this.api_url}?filter[where][${attribute}]=${argument}&access_token=${token}`;
    return this.http.get<UserInterface[]>(this.api_url, {headers: this.headers});
  }

  getUserByID(idUser: number): Observable<UserInterface>{
    const url = `${this.api_url}/${idUser}`
    return this.http.get<UserInterface>(url, {headers: this.headers});
  }

  getUserAndRole(idUser: string, role: string): Observable<AuxiliarInterface | InvestigatorInterface | ResponsableInterface>{
    const token = this.getToken();
    const api_url = `${this.api_url}/${idUser}/${role}?access_token=${token}`;
    return this.http.get<AuxiliarInterface | InvestigatorInterface | ResponsableInterface>(api_url, {headers: this.headers});
  }

  prepareUser(user: UserInterface){
    this.selectedUser.ci = user.ci,
    this.selectedUser.type = user.type,
    this.selectedUser.names = user.names,
    this.selectedUser.last_name = user.last_name,
    this.selectedUser.phone = user.phone,
    this.selectedUser.username = user.username,
    this.selectedUser.password = user.password,
    this.selectedUser.email = user.email
  }

  deleteAuxiliar(idUser: number){
    const token = this.getToken();
    const url_api = `${this.api_url}/${idUser}/auxiliars?access_token=${token}`;
    return this.http.delete(url_api, {headers: this.headers});
  }

  deleteInvestigator(idUser: number){
    const token = this.getToken();
    const url_api = `${this.api_url}/${idUser}/investigators?access_token=${token}`;
    return this.http.delete(url_api, {headers: this.headers});
  }

  deleteResponsable(idUser: number){
    const token = this.getToken();
    const url_api = `${this.api_url}/${idUser}/responsables?access_token=${token}`;
    return this.http.delete(url_api, {headers: this.headers});
  }

}
