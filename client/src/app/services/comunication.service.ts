import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  message: string;
  private messageSubject = new Subject<string>();
  messageObservable =  this.messageSubject.asObservable();

  confirm: boolean;
  private confirmSubject = new Subject<boolean>();
  confirmObservable =  this.confirmSubject.asObservable();

  public id_institute: number;

  constructor() { }

  confirmMessage(message: string){
    this.message = message;
    this.messageSubject.next(this.message);
  }

  confirmDelete(confirm:boolean){
    this.confirm = confirm;
    this.confirmSubject.next(this.confirm);
  }
}
