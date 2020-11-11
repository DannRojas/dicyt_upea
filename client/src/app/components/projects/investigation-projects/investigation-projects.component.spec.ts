import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationProjectsComponent } from './investigation-projects.component';

describe('InvestigationProjectsComponent', () => {
  let component: InvestigationProjectsComponent;
  let fixture: ComponentFixture<InvestigationProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
