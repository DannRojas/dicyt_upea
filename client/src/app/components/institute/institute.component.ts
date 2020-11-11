import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CareerService } from '../../services/career.service';
import { ImageService } from '../../services/image.service';
import { InstituteInterface } from '../../Models/Institute';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ComunicationService } from '../../services/comunication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-institute',
  templateUrl: './institute.component.html',
  styleUrls: ['./institute.component.scss']
})
export class InstituteComponent implements OnInit, OnDestroy {

  constructor( private careerService: CareerService, private imageService: ImageService, private toastrService: ToastrService, private comunicationService: ComunicationService ) { }

  public institutes: InstituteInterface[] = [];

  private selectedInstitute: InstituteInterface;
  private unsubscribe: Subscription;

  @ViewChild(ConfirmComponent)
  confirmComponent: ConfirmComponent;

  ngOnInit(): void {
    this.getListInstitutes();
    this.unsubscribe = this.comunicationService.confirmObservable.subscribe(confirm =>{
      console.log(confirm);
      this.onDeleteInstitute(confirm);
    })
  }

  getListInstitutes(): void{
    this.careerService.getAllInstitutes().subscribe( data => {
      this.imageService.getAllImages( data ).subscribe( (institutes: InstituteInterface[]) => {
        this.institutes = institutes;
      } )
    })
  }

  onPreDeleteInstitute(institute: InstituteInterface){
    this.selectedInstitute = Object.assign({}, institute);
    this.comunicationService.confirmMessage(`Está seguro de que desea eliminar el instituto ${institute.institute_name}`)
  }

  onDeleteInstitute(confirm){
    if(confirm){
      this.careerService.deleteInstitute(this.selectedInstitute.institute_code).subscribe(data => {
        this.imageService.deleteImage(this.selectedInstitute.image).subscribe(remover => {
          this.toastrService.success(`Se ha eliminado corractamente`);
          this.getListInstitutes();
        })
      })
    }
  }

  setInstituteCode(institute_code){
    this.comunicationService.id_institute = institute_code
  }

  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
