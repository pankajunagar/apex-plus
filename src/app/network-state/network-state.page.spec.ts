import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkStatePage } from './network-state.page';

describe('NetworkStatePage', () => {
  let component: NetworkStatePage;
  let fixture: ComponentFixture<NetworkStatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkStatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkStatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
