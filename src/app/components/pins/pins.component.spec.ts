import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { of, Subject } from 'rxjs';
import { PINS } from 'src/app/services/mocks/pins';
import { RepositoryService } from 'src/app/services/repository.service';

import { PinsComponent } from './pins.component';
import { PinsService } from './pins.service';

class RepositoryServiceStub {
  observer = new Subject();

  getPins() {
    return this.observer;
  }

  resolvePins() {
    // the json code returns a new object of the PINS
    this.observer.next(JSON.parse(JSON.stringify(PINS)));
  }

  updatePin() {
    return of(true);
  }

  resolveUpdatePin() {

  }
}

class MatSnackBarStub {
  open() {}
}

class PinsServiceStub {
  observer: Subject<any> = new Subject();

  $actionObserver = this.observer.asObservable();

  resolve(action) {
    return this.observer.next(action);
  }
}

fdescribe('PinsComponent', () => {
  let component: PinsComponent;
  let fixture: ComponentFixture<PinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinsComponent],
      providers: [
        { provide: RepositoryService, useClass: RepositoryServiceStub },
        { provide: MatSnackBar, useClass: MatSnackBarStub },
        { provide: PinsService, useClass: PinsServiceStub}
      ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
