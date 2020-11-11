import { Component, OnInit } from '@angular/core';
import { IDHProjectInterface } from '../../../Models/Project';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-idh-projects',
  templateUrl: './idh-projects.component.html',
  styleUrls: ['./idh-projects.component.scss']
})
export class IdhProjectsComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  
  public projects: IDHProjectInterface[];

  ngOnInit(): void {
    this.getListIdhProyects();
  }

  getListIdhProyects(): void {
    this.projectService.getAllProject().subscribe(project => {this.projects = project;
        // for (let i in this.projects) {
        //   this.projects[i].start_date = new Date(this.projects[i].start_date);
        //   this.projects[i].ending_date = new Date(this.projects[i].ending_date);
        // }
      });
    }
}
