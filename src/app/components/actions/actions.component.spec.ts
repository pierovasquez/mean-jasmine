import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatBottomSheetRef } from '@angular/material';
import { PinsService } from '../pins/pins.service';

import { ActionsComponent } from './actions.component';

export class MatBottomSheetRefSTUB {
  dismiss() { }
}

export class PinsServiceSTUB {
  resolveActionObserver(action) { }
}

fdescribe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionsComponent],
      providers: [
        { provide: MatBottomSheetRef, useClass: MatBottomSheetRefSTUB },
        { provide: PinsService, useClass: PinsServiceSTUB },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openLink', () => {
    const event = new MouseEvent('click');
    const eventCall = spyOn(event, 'preventDefault').and.callFake(() => { });
    const dismiss = spyOn((<any>component).bottomSheetRef, 'dismiss');
    const resolveActionObserver = spyOn(
      (<any>component).pinsService,
      'resolveActionObserver'
    );
    component.openLink(event, '');
    expect(eventCall).toHaveBeenCalled();
    expect(dismiss).toHaveBeenCalled();
    expect(resolveActionObserver).toHaveBeenCalled();
  });
});
