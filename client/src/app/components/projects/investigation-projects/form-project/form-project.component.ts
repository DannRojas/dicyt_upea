import { ToastrService } from 'ngx-toastr';
import { ImageService } from './../../../../services/image.service';
import { CompInvestigatorInterface } from './../../../../Models/User';
import { ComunicationService } from './../../../../services/comunication.service';
import { InvestigatorService } from './../../../../services/investigator.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestigationInterface } from 'src/app/Models/Investigation_Project';
import { InvestigationService } from '../../../../services/investigation.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.scss']
})
export class FormProjectComponent implements OnInit {

  constructor(private investigationService: InvestigationService, private route: ActivatedRoute, private investigatorService: InvestigatorService, private comunicationService: ComunicationService, private imageService: ImageService, private toastrService: ToastrService, private router: Router) {
    this.investigation.institute_code = this.comunicationService.id_institute;
    if(this.investigation.institute_code === null || this.investigation.institute_code === undefined){
      this.router.navigate(['/institute']);
    }
    this.investigatorService.getInvestigatorsByAttribute("institute_code", 1).subscribe(investigators => {
      this.invUsers = investigators;
      this.investigatorService.getCompleteInvestigators(this.invUsers).subscribe(invUsers => {
        this.invUsers = invUsers;
      })
    })
  }

  @ViewChild('investigationForm')
  investigationForm: NgForm;

  public isUpdate: boolean = false;
  public isDisabled: boolean = false;

  public investigation: InvestigationInterface = {};
  public image: File = null;
  public invUsers :CompInvestigatorInterface[] =  [];
  public institute_code;

  ngOnInit(): void {
    const investigation_id = this.route.snapshot.params["id"];
    if(investigation_id !== "0"){
      this.isUpdate = true;
      this.isDisabled = true;
      this.getInvestigation(investigation_id);
    }else{
      this.isUpdate = false;
      this.isDisabled = false;
      this.investigation.state = false;
      this.investigation.pathImage = "assets/img/404imagen.png";
    }
  }

  getInvestigation(investigation_id: any){
    this.investigationService.getInvestigationById(investigation_id).subscribe(investigation => {
      this.investigation = Object.assign({}, investigation);
      this.investigation.pathImage = "http://localhost:3000/api/containers/images/download/"+this.investigation.image;
    })
  }

  onFileSelected(image){
    try{
      this.image = image.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        this.investigation.pathImage = reader.result.toString();
      }
    }catch(e) {
      this.investigation.pathImage = "assets/img/404imagen.png";
    }
  }

  onAddOrUpdate(){
    if(this.investigationForm.valid){
      if(this.isUpdate){
        console.log("update");
        if(this.image !== null){
          console.log("width image");
          this.imageService.deleteImage(this.investigation.image).subscribe(deleteImage => {
            this.investigation.image = this.image.name;
            this.imageService.saveImage(this.image).subscribe(saveImage => {
              this.investigationService.updateInvestigation(this.investigation).subscribe(updateInvestigation => {
                this.toastrService.success(`${updateInvestigation.research_name} ha sido modificado exitosamente`, 'Modificación exitosa');
                this.isDisabled = true;
              })
            })
          })
        }else{
          console.log("image null")
          this.investigationService.updateInvestigation(this.investigation).subscribe(updateInvestigation => {
            this.isDisabled = true;
            this.toastrService.success(`${updateInvestigation.research_name} ha sido modificado exitosamente`, 'Modificación exitosa');
          })
        }
      }else{
        if(this.investigation.image !== "assets/img/404imagen.png" && (this.image !== null && this.image !== undefined)){
          this.imageService.saveImage(this.image).subscribe(saveImage => {
            console.log("image added");
            this.investigation.image = this.image.name;
            this.investigationService.saveInvestigation(this.investigation).subscribe(newInvestigation => {
              console.log("added New");
              this.isDisabled = true;
              this.router.navigate(['/investigation']);
              this.toastrService.success("El proyecto de investigación "+newInvestigation.research_name+" se ha guardado satisfactoriamente.", "Instituto agregado")
            })
          })
        }else{
          this.toastrService.warning('Asegurese de aver llenado el formulario correctamente y haber subido una imagen', 'Petición fallida')
        }
      }
    }else{
      this.toastrService.warning('Debe llenar bien el formulario', 'Operación fallida');
    }
  }

}
