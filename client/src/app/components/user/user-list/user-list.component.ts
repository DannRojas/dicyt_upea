import { UserInterface } from './../../../Models/User';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ComunicationService } from '../../../services/comunication.service';
import { Subscription } from 'rxjs';
import { AuxiliarService } from '../../../services/auxiliar.service';
import { InvestigationService } from '../../../services/investigation.service';
import { ResponsableService } from '../../../services/responsable.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy{

  public users: UserInterface[];
  private selectedUser: UserInterface = {};
  private unsubcribe: Subscription;

  public currentUser: UserInterface;

  constructor( private authService: AuthService, private comunicationService: ComunicationService, private auxiliarService: AuxiliarService, private investigationService: InvestigationService, private responsableService: ResponsableService, private toastrService: ToastrService ) { }

  ngOnInit(): void {
    this.currentUser = Object.assign({}, this.authService.getCurrentUser());
    this.getUsersList();
    this.unsubcribe = this.comunicationService.confirmObservable.subscribe(confirm =>{
      this.confirmDelete(confirm);
    })
  }

  getUsersList(){
    this.authService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  onPreConfirmDelete(user: UserInterface){
    this.selectedUser = Object.assign({}, user);
    this.comunicationService.confirmMessage(`Está seguro de que desea eliminar a el usuario: ${this.selectedUser.names}`);
  }

  confirmDelete(confirm: boolean){
    if(confirm){
      switch(this.selectedUser.type){
        case "aux":
          this.authService.deleteAuxiliar(this.selectedUser.id_user).subscribe(response => {
            this.onDeleteUser();
          });
          break;
        case "responsable":
          this.authService.deleteResponsable(this.selectedUser.id_user).subscribe(response => {
            this.onDeleteUser();
          });
          break;
        case "investigator":
          this.authService.deleteInvestigator(this.selectedUser.id_user).subscribe(response => {
            this.onDeleteUser();
          });
          break;
        case "admin":
          this.onDeleteUser();
          break;
      }
    }
  }

  onDeleteUser(){
    this.authService.deleteUser(this.selectedUser.id_user).subscribe(response =>{
      this.toastrService.warning(`Se ha eliminado el usuario: ${this.selectedUser.names}`, "Usuario eliminado");
      this.getUsersList();
    })
  }

  ngOnDestroy(): void {
    this.unsubcribe.unsubscribe();
  }
}
