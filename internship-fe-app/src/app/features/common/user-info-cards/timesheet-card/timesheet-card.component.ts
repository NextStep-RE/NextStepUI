import { Component, Input } from '@angular/core'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-timesheet-card',
  templateUrl: './timesheet-card.component.html',
  styleUrls: ['./timesheet-card.component.scss'],
})
export class TimesheetCardComponent {
  @Input() title!: string;
  @Input() imagePath!: string;

  constructor(private router: Router) {}

  handleButtonClick(): void {
    const routeMapping: Record<string, string> = {
      'My Education': 'my-education',
      'My Experience': 'my-experience',
      'My Applications': 'my-applications',
    };

    const route = routeMapping[this.title];
    if (route) {
      this.router.navigate([route]);
    } else {
      console.error(`No route defined for title: ${this.title}`);
    }
  }
}
