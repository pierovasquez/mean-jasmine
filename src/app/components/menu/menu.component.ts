import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  counter = 0;
  @Output() clicked = new EventEmitter<boolean>();

  increase() {
    this.counter++;
  }
}
