import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessOrderPage } from './success-order.page';

describe('SuccessOrderPage', () => {
  let component: SuccessOrderPage;
  let fixture: ComponentFixture<SuccessOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessOrderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
