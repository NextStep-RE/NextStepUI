import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { TimesheetCard } from '../../../core/models/timesheetCard.model';
import { SELECT_USER_PROFILE_ROLE } from '../../../core/store/selectors/user-profiles.selectors';

@Component({
  selector: 'app-user-info-cards',
  templateUrl: './user-info-cards.component.html',
  styleUrls: ['./user-info-cards.component.scss'],
})
export class UserInfoCardsComponent implements OnInit {
  selectedRole$: Observable<string | null>;
  adminCards: TimesheetCard[] = [];
  userCards: TimesheetCard[] = [];
  timesheetCards: TimesheetCard[] = [];

  constructor(private store: Store, private router: Router) {
    this.selectedRole$ = this.store.select(SELECT_USER_PROFILE_ROLE);
  }

  ngOnInit(): void {
    this.initializeTimesheetCards();
    this.getCardsByRole();
  }

  initializeTimesheetCards(): void {
    this.userCards = [
      new TimesheetCard('My Applications', 'assets/icons/applications.svg'),
      new TimesheetCard('My Education', 'assets/icons/education.svg'),
      new TimesheetCard('My Experience', 'assets/icons/experience.svg'),
    ];
  }

  getCardsByRole(): void {
    this.selectedRole$.subscribe((role) => {
      if (role === 'admin') {
        this.timesheetCards = this.adminCards;
      } else {
        this.timesheetCards = this.userCards;
      }
    });
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
