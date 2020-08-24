import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaArrayCompComponent } from './prueba-array-comp.component';

describe('PruebaArrayCompComponent', () => {
  let component: PruebaArrayCompComponent;
  let fixture: ComponentFixture<PruebaArrayCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaArrayCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaArrayCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
