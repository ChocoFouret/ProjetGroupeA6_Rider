import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() isVisible: boolean = false;
  @Output() emitChoose: EventEmitter<boolean> = new EventEmitter<boolean>();

  updateChoose(choose: boolean) {
    this.isVisible = false;
    this.emitChoose.next(choose);
  }

}
