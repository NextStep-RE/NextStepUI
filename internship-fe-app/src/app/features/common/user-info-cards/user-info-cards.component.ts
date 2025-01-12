import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetCard } from '../../../core/models/timesheetCard.model';

@Component({
  selector: 'app-user-info-cards',
  templateUrl: './user-info-cards.component.html',
  styleUrls: ['./user-info-cards.component.scss'],
})
export class UserInfoCardsComponent implements OnInit {
  adminCards: TimesheetCard[] = [];
  userCards: TimesheetCard[] = [];
  timesheetCards: TimesheetCard[] = [];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.initializeTimesheetCards();
  }

  initializeTimesheetCards(): void {
    this.timesheetCards = [
      new TimesheetCard('My Applications', 'assets/icons/applications.svg'),
      new TimesheetCard('My Education', 'assets/icons/education.svg'),
      new TimesheetCard('My Experience', 'assets/icons/experience.svg'),
    ];
  }

  onCardClick(title: string): void {
    const routeMapping: Record<string, string> = {
      'My Applications': '/applied-internships',
      'My Education': '/education',
      'My Experience': '/experience',
    };

    const route = routeMapping[title];
    if (route) {
      this.router.navigate([route]);
    } else {
      console.error(`No route defined for title: ${title}`);
    }
  }
}
