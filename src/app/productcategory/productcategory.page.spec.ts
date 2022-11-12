import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategoryPage } from './productcategory.page';

describe('ProductcategoryPage', () => {
  let component: ProductcategoryPage;
  let fixture: ComponentFixture<ProductcategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductcategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
