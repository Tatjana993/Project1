import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferModalPage } from './offer-modal.page';

describe('OfferModalPage', () => {
  let component: OfferModalPage;
  let fixture: ComponentFixture<OfferModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
