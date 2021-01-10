import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { of } from 'rxjs';
import { NavigationService } from 'src/app/services/navigation.service';
import { RepositoryService } from 'src/app/services/repository.service';

import { FormComponent } from './form.component';

class RepositoryServiceStub {
  savePins() {
    return of(true);
  }
}

class NavigationServiceStub {
  goToPins() {

  }
}

class MatSnackBarStub {
  open() {
    return {
      afterDismissed: () => {
        return of(true);
      }
    };
  }
}

fdescribe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormComponent],
      providers: [
        // If we add the RepositoryService the way it shows, we will be doing integration test istead of unit test.
        // So we have to simulate the behaviour of the service
        // RepositoryService
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: NavigationService, useClass: NavigationServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub }
      ],
      // NO_ERRORS_SCHEMA -> Defines a schema that allows any property on any element.
      // CUSTOM_ELEMENTS_SCHEMA Defines a schema that allows an NgModule to contain the following:
      // Non-Angular elements named with dash case (`-`).
      // Element properties named with dash case (`-`).
      // Dash case is the naming convention for custom elements.
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When component is initializated', () => {
    it('Should create the forms of the FormComponent', () => {
      console.log('controls', Object.keys(component.firstFormGroup.controls));
      expect(Object.keys(component.firstFormGroup.controls)).toEqual(['title', 'author', 'description']);
      expect(Object.keys(component.secondFormGroup.controls)).toEqual(['firstAsset', 'assets']);
    });
  });

  describe('When addAsset is executed', () => {
    it('should add new asset', () => {
      const assets = <FormArray>component.secondFormGroup.get('assets');

      component.addAsset();
      component.addAsset();
      console.log('assets', Object.keys(assets.controls));
      expect(Object.keys(assets.controls)).toEqual(['0', '1']);
    });
  });
});
