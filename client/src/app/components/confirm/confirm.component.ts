import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ComunicationService } from '../../services/comunication.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  constructor(private authService: AuthService, private comunicationService: ComunicationService) { }

  @ViewChild('buttonOpenModal')
  buttonOpenModal: ElementRef;

  @ViewChild('buttonCloseModal')
  buttonCloseModal: ElementRef;

  public message:string;

  ngOnInit(): void {
    this.comunicationService.messageObservable.subscribe(message => {
      this.message = message;
      this.buttonOpenModal.nativeElement.click();
    })
  }

  confirm(){
    this.comunicationService.confirmDelete(true);
    this.buttonCloseModal.nativeElement.click();
  }

}
