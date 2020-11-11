import { ComunicationService } from './../../../services/comunication.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestigationInterface } from 'src/app/Models/Investigation_Project';
import { InvestigationService } from '../../../services/investigation.service';

@Component({
  selector: 'app-investigation-projects',
  templateUrl: './investigation-projects.component.html',
  styleUrls: ['./investigation-projects.component.scss']
})
export class InvestigationProjectsComponent implements OnInit {

  public investigations: InvestigationInterface[];

  constructor(private investigationService: InvestigationService, private route: ActivatedRoute, private comunicationService: ComunicationService) { }

  ngOnInit(): void {
    this.getListInvestigations();
  }

  getListInvestigations(){
    const institute_id = this.route.snapshot.params["id"];
    this.comunicationService.id_institute = institute_id;
    this.investigationService.getInvestigationsByAttribute("institute_code", institute_id).subscribe(investigations => {
      this.investigations = investigations;
    })
  }

}
