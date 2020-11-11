import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestigationReceptionComponent } from './investigation-reception.component';

describe('InvestigationReceptionComponent', () => {
  let component: InvestigationReceptionComponent;
  let fixture: ComponentFixture<InvestigationReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestigationReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestigationReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
