import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-investigation-detail',
  templateUrl: './investigation-detail.component.html',
  styleUrls: ['./investigation-detail.component.scss']
})
export class InvestigationDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const investigation_code = this.route.snapshot.params["id"];
  }

}
