import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsProjectsComponent } from './details-projects.component';

describe('DetailsProjectsComponent', () => {
  let component: DetailsProjectsComponent;
  let fixture: ComponentFixture<DetailsProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
