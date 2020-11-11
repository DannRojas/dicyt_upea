import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInvestigationComponent } from './details-investigation.component';

describe('DetailsInvestigationComponent', () => {
  let component: DetailsInvestigationComponent;
  let fixture: ComponentFixture<DetailsInvestigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsInvestigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInvestigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
