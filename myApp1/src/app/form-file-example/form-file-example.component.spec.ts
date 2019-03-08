import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFileExampleComponent } from './form-file-example.component';

describe('FormFileExampleComponent', () => {
  let component: FormFileExampleComponent;
  let fixture: ComponentFixture<FormFileExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFileExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFileExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
