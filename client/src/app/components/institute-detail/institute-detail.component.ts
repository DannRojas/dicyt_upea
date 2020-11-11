import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstituteInterface } from '../../Models/Institute';
import { CareerService } from '../../services/career.service';
import { ImageService } from '../../services/image.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-institute-detail',
  templateUrl: './institute-detail.component.html',
  styleUrls: ['./institute-detail.component.scss']
})
export class InstituteDetailComponent implements OnInit {

  constructor( private _activatedRoute: ActivatedRoute, private careerService: CareerService, private imageService: ImageService, private toastrService: ToastrService, private routes: Router ) { }

  public institute: InstituteInterface = {};

  public isUpdate: boolean;
  public isDisabled: boolean;
  public image: File = null;

  @ViewChild('instituteForm')
  instituteForm: NgForm;

  ngOnInit(): void {
    const institite_code = this._activatedRoute.snapshot.params['code'];
    if(institite_code !== "0"){
      this.getInstitute(institite_code);
      this.isUpdate = true;
      this.isDisabled = true;
    }else{
      this.institute.pathImage = "assets/img/404imagen.png";
      this.isUpdate = false;
      this.isDisabled = false;
    }
  }

  getInstitute(institute_code){
    this.careerService.getInstituteById(institute_code).subscribe((institute: InstituteInterface) => {
      this.imageService.getImageByName(institute.image).subscribe( image => {
        this.institute = institute;
        const blob = new Blob([image], { type: 'image/jpg' })
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.institute.pathImage = reader.result.toString();
        }, false)
        if (blob)
          reader.readAsDataURL(blob);
      })
    })
  }

  onFileSelected(image){
    try{
      this.image = image.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.image);
      reader.onload = () => {
        this.institute.pathImage = reader.result.toString();
      }
    }catch(e) {
      this.institute.pathImage = "assets/img/404imagen.png";
    }
  }

  onAddOrUpdate(): void{
    if(this.instituteForm.valid){
      if(this.isUpdate){
        console.log("update");
        if(this.image !== null){
          console.log("width image");
          this.imageService.deleteImage(this.institute.image).subscribe(deleteImage => {
            this.institute.image = this.image.name;
            this.imageService.saveImage(this.image).subscribe(saveImage => {
              this.careerService.updateInstitute(this.institute).subscribe(updateInstitute => {
                this.toastrService.success(`${updateInstitute.institute_name} ha sido modificado exitosamente`, 'Modificación exitosa');
                this.isDisabled = true;
              })
            })
          })
        }else{
          console.log("image null")
          this.careerService.updateInstitute(this.institute).subscribe(updateInstitute => {
            this.isDisabled = true;
            this.toastrService.success(`${updateInstitute.institute_name} ha sido modificado exitosamente`, 'Modificación exitosa');
          })
        }
      }else{
        if(this.institute.image !== "assets/img/404imagen.png" && !(this.image === null || this.image === undefined)){
          this.imageService.saveImage(this.image).subscribe(saveImage => {
            console.log("image added");
            this.institute.image = this.image.name;
            this.careerService.saveInstitute(this.institute).subscribe(newInstitute => {
              console.log("added New");
              this.isDisabled = true;
              this.routes.navigate(['/institute']);
              this.toastrService.success("La institución "+newInstitute.institute_name+" se ha guardado satisfactoriamente.", "Instituto agregado")
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




