import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DicytComponent } from './dicyt.component';

describe('DicytComponent', () => {
  let component: DicytComponent;
  let fixture: ComponentFixture<DicytComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DicytComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DicytComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
