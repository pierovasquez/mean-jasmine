import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { MenuComponent } from './menu.component';

fdescribe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const title = fixture.debugElement.query(By.css('h1'));
    expect(title.nativeElement.innerHTML).toBe('eLearning Management System');
  });
  it('Testing output', () => {
    const value = true;
    component.clicked.subscribe((result) => {
      expect(result).toBe(value);
    });
    component.clicked.next(value);
  });

  it('testing click', () => {
    const button = fixture.debugElement.query(By.css('button'));
    console.log('counter', component.counter);
    button.triggerEventHandler('click', null);
    console.log('counter', component.counter);
    expect(component.counter).toBe(1);
  });
});
