import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdhReceptionComponent } from './idh-reception.component';

describe('IdhReceptionComponent', () => {
  let component: IdhReceptionComponent;
  let fixture: ComponentFixture<IdhReceptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdhReceptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdhReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
