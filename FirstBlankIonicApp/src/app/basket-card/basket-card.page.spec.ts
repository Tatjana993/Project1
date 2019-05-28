import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketCardPage } from './basket-card.page';

describe('BasketCardPage', () => {
  let component: BasketCardPage;
  let fixture: ComponentFixture<BasketCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketCardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
