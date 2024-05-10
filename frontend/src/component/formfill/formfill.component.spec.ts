/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormfillComponent } from './formfill.component';

describe('FormfillComponent', () => {
  let component: FormfillComponent;
  let fixture: ComponentFixture<FormfillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormfillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
