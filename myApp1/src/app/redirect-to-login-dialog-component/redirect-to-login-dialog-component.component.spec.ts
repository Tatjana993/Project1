import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedirectToLoginDialogComponentComponent } from './redirect-to-login-dialog-component.component';

describe('RedirectToLoginDialogComponentComponent', () => {
  let component: RedirectToLoginDialogComponentComponent;
  let fixture: ComponentFixture<RedirectToLoginDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedirectToLoginDialogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedirectToLoginDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
