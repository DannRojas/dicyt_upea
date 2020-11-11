import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../../../services/project.service";
import { IDHProjectInterface } from "src/app/Models/Project";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { state } from "@angular/animations";

///////////////////////////////////
// import { InstituteInterface } from '../../Models/Institute';
// import { ImageService } from '../../services/image.service';
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { isNullOrUndefined } from "util";

////////////////////////////////////////////////////7
@Component({
  selector: "app-details-projects",
  templateUrl: "./details-projects.component.html",
  styleUrls: ["./details-projects.component.scss"],
})
export class DetailsProjectsComponent implements OnInit {
  constructor(private projectService: ProjectService, private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const project_id = this.route.snapshot.params["id"];
  }
}
