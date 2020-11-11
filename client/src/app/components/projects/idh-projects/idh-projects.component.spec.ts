import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdhProjectsComponent } from './idh-projects.component';

describe('IdhProjectsComponent', () => {
  let component: IdhProjectsComponent;
  let fixture: ComponentFixture<IdhProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdhProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdhProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
}
);
