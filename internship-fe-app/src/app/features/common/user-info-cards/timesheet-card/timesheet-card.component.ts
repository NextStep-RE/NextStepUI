import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  styleUrls: ['./timesheet-card.component.scss'],
})
export class TimesheetCardComponent {
  @Input() title!: string;
  @Input() imagePath!: string;
  @Output() cardClick = new EventEmitter<string>();

  handleButtonClick(): void {
    this.cardClick.emit(this.title);
  }
}
