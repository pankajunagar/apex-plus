import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewImagePage } from './view-image.page';

describe('ViewImagePage', () => {
  let component: ViewImagePage;
  let fixture: ComponentFixture<ViewImagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewImagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
