import { NgForm } from '@angular/forms';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterInterface, UserInterface } from '../../../Models/User';
import { InvestigatorService } from '../../../services/investigator.service';
import { AuxiliarService } from '../../../services/auxiliar.service';
import { ResponsableService } from '../../../services/responsable.service';
import { ToastrService } from 'ngx-toastr';
import { AuxiliarInterface } from '../../../Models/auxiliar';
import { InvestigatorInterface } from '../../../Models/investigator';
import { ResponsableInterface } from '../../../Models/responsable';
import { InstituteInterface } from '../../../Models/Institute';
import { CareerService } from '../../../services/career.service';
import { IDHProjectInterface } from '../../../Models/Project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  hide = true;

  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public roles:any[] = [{value: "admin", valor: "Administrador"}, {value: "responsable", valor: "Responsable"}, {value: "investigator", valor: "Investigador"}, {value: "aux", valor: "Auxiliar"}];

  public years:number[]=[]
  public turns:any[]=[{value: "morning", valor: "Mañana"},{value: "afternoon", valor: "Tarde"},{value: "evening", valor: "Noche"}]

  public institutes: InstituteInterface[] = [];
  public projectsIDH: IDHProjectInterface[] = [];

  public user: UserInterface = {};
  public responsable;

  register: RegisterInterface;


  public idUser = this._activatedRoute.snapshot.params['id'];

  @ViewChild('stepper')
  stepper;

  @ViewChild('btnReset')
  btnReset: ElementRef;

  @ViewChild('userForm')
  userForm: NgForm;

  @ViewChild('btnStepTwoNext')
  btnStepTwoNext: ElementRef;
  @ViewChild('btnStepTwoPrev')
  btnStepTwoPrev: ElementRef;

  @ViewChild('investigatorForm')
  investigatorForm: NgForm;
  @ViewChild('auxForm')
  auxForm: NgForm;
  @ViewChild('responsableForm')
  responsableForm: NgForm;

  public isAdmin:boolean;
  public isUpdate:boolean;

  constructor(private _activatedRoute: ActivatedRoute, private authService: AuthService, private auxiliarService: AuxiliarService, private investigatorService: InvestigatorService, private responsableService: ResponsableService, private cd: ChangeDetectorRef, private toastrService: ToastrService, private router: Router, private careerService: CareerService, private projectService: ProjectService) {
    let year: number = new Date().getFullYear();
    this.years = [(year-1), year, (year+1)];
    this.register = {
      user : Object.assign({}),
      investigator : Object.assign({}),
      responsable : Object.assign({}),
      auxiliar : Object.assign({})
    }
    this.careerService.getAllInstitutes().subscribe(institutes => {
      this.institutes = institutes;
    })
    this.projectService.getAllProject().subscribe(projectsIDH => {
      this.projectsIDH = projectsIDH;
    })
  }

  ngOnInit(): void {
    this.isAdmin = false;
    this.isUpdate = false
    this.cd.detectChanges();
    if(this.idUser === "0"){
      this.register = {
        user : Object.assign({}),
        investigator : Object.assign({}),
        responsable : Object.assign({}),
        auxiliar : Object.assign({})
      }
    }else{
      this.authService.getUserByID(this.idUser).subscribe(user =>{
        this.register.user = Object.assign({}, user);
        this.cd.detectChanges();
        this.isUpdate = true;
        switch(this.register.user.type){
          case "aux":
            this.authService.getUserAndRole(this.idUser, "auxiliars").subscribe((auxiliar: AuxiliarInterface) => {
              this.register.auxiliar = Object.assign({}, auxiliar);
            });
            break;
          case "investigator":
            this.authService.getUserAndRole(this.idUser, "investigators").subscribe((investigator: InvestigatorInterface) => {
              this.register.investigator = Object.assign({}, investigator);
            });
            break;
          case "responsable":
            this.authService.getUserAndRole(this.idUser, "responsables").subscribe((responsable: ResponsableInterface) => {
              this.register.responsable = Object.assign({}, responsable);
            });
            break;
          case "admin":
            this.isAdmin = true;
            this.cd.detectChanges();
            break;
        }
      })
    }
  }

  getUser(){
    this.authService.getUserByID(this.idUser).subscribe(user => {
      this.user = user;
    }, response=>{console.log(response)})
  }

  addUser(){
    if(!this.isUpdate){
      this.authService.createUser(this.register.user).subscribe( user => {
        this.user = Object.assign({}, user);
        this.register.investigator.id_user = user.id_user;
        this.register.responsable.id_user = user.id_user;
        this.register.auxiliar.id_user = user.id_user;
        switch(this.user.type){
          case "investigator":
            if(this.investigatorForm.valid){
              this.investigatorService.saveInvestigator(this.register.investigator).subscribe(investigator => {
                this.toastrService.success("El investigador se ha agregado con éxito", "¡operación exitosa!");
                this.router.navigate(["/user/user-list"]);
              })
            }
            break;
          case "aux":
            if(this.auxForm.valid){
              this.auxiliarService.saveAuxiliar(this.register.auxiliar).subscribe(auxiliar => {
                this.toastrService.success("El auxiliar se ha agregado con éxito", "¡operación exitosa!");
                this.router.navigate(["/user/user-list"]);
              })
            }
            break;
          case "responsable":
            if(this.responsableForm.valid){
              this.responsableService.saveResponsable(this.register.responsable).subscribe(responsable => {
                this.toastrService.success("El responsable se ha agregado con éxito", "¡operación exitosa!");
                this.router.navigate(["/user/user-list"]);
              })
            }
            break;
          case "admin":
            this.toastrService.success("El administrador se ha agregado con éxito", "¡operación exitosa!");
            this.router.navigate(["/user/user-list"]);
            break;
        }
      })
    }else{
      this.authService.updateUser(this.register.user).subscribe((user: UserInterface) => {
        switch(this.register.user.type){
          case "investigator":
            if(this.investigatorForm.valid){
              this.investigatorService.updateInvestigator(this.register.investigator).subscribe(investigator => {
                this.toastrService.success("El investigador se ha modificado con éxito", "¡operación exitosa!");
                this.router.navigate(["/user/user-list"]);
              })
            }
            break;
          case "aux":
            if(this.auxForm.valid){
              this.auxiliarService.updateAuxiliar(this.register.auxiliar).subscribe(auxiliar => {
                this.toastrService.success("El auxiliar se ha modificado con éxito", "¡operación exitosa!");
                this.router.navigate(["/user/user-list"]);
              })
            }
            break;
          case "responable":
            if(this.responsableForm.valid){
              this.responsableService.updateResponsable(this.register.responsable).subscribe(responsable => {
                this.toastrService.success("El responsable se ha modificado con éxito", "¡operación exitosa!");
                this.router.navigate(["/user/user-list"]);
              })
            }
            break;
          case "admin":
            this.toastrService.success("El administrador se ha modificado con éxito", "¡operación exitosa!");
            this.router.navigate(["/user/user-list"]);
            break;
        }
      })
    }
  }

  nextAdmin(){
    if(this.register.user.type === "admin"){
      this.btnStepTwoNext.nativeElement.click();
    }
  }
  previousAdmin(){
    if(this.register.user.type === "admin"){
      this.btnStepTwoPrev.nativeElement.click();
    }
  }

  observableType(type: any){
    if(type === "admin"){
      this.isAdmin = true;
      this.cd.detectChanges();
    }else{
      this.isAdmin = false;
      this.cd.detectChanges();
    }
  }

}
