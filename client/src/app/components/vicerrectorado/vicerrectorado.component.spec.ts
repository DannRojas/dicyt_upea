import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VicerrectoradoComponent } from './vicerrectorado.component';

describe('VicerrectoradoComponent', () => {
  let component: VicerrectoradoComponent;
  let fixture: ComponentFixture<VicerrectoradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VicerrectoradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VicerrectoradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
