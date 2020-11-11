import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { InstituteInterface } from '../Models/Institute';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private token = this.authService.getToken();

  private url_api: string = "http://localhost:3000/api/containers/images";

  headers: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
    Authorization: this.authService.getToken()
  });

  saveImage(file: File) {
    const formData = new FormData();
    formData.append(file.name, file);
    const url_api = `${this.url_api}/upload`;
    return this.http.post(url_api, formData).pipe(map(data => data));
  }

  getImageByName(imagen: string) {
    const url = `${this.url_api}/download/${imagen}?access_token=${this.token}`;
    return this.http.get(url, {responseType: 'blob'});
  }

  getAllImages(institutes: InstituteInterface[]): Observable<InstituteInterface[]>{
    for(let i in institutes){
      this.getImageByName(institutes[i].image).subscribe(imagen => {
        const blob = new Blob([imagen], {type: 'image/jpg'})
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          institutes[i].pathImage = reader.result.toString();
        }, false)
        if(blob)
        reader.readAsDataURL(blob);
      })
    }
    return of<InstituteInterface[]>(institutes);
  }

  deleteImage(name: string) {
    const url_api = `${this.url_api}/files/${name}?access_token=${this.token}`;
    return this.http.delete(url_api, { headers: this.headers }).pipe(map(data => data));
  }
}
