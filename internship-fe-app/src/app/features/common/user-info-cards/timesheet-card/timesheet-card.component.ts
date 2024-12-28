import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  styleUrl: './timesheet-card.component.scss',
})
export class TimesheetCardComponent {
  @Input() title!: string;
  @Input() imagePath!: string;
}
