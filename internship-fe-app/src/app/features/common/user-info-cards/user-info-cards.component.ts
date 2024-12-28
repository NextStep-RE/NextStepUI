import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TimesheetCard } from '../../../core/models/timesheetCard.model';
import { SELECT_USER_PROFILE_ROLE } from '../../customers/store/selectors/user-profiles.selectors';

@Component({
  selector: 'app-user-info-cards',
  templateUrl: './user-info-cards.component.html',
  styleUrl: './user-info-cards.component.scss',
})
export class UserInfoCardsComponent implements OnInit {
  selectedRole$: Observable<string | null>;
  adminCards: TimesheetCard[] = [];
  userCards: TimesheetCard[] = [];
  timesheetCards: TimesheetCard[] = [];

  constructor(private store: Store) {
    this.selectedRole$ = this.store.select(SELECT_USER_PROFILE_ROLE);
  }

  ngOnInit(): void {
    this.initializeTimesheetCards();
    this.getCardsByRole();
  }

  initializeTimesheetCards(): void {
    this.adminCards = [
      {
        title: 'Import Timesheet',
        imagePath: 'assets/icons/timesheet-icon.svg',
      },
      {
        title: 'Check Timesheet',
        imagePath: 'assets/icons/timesheet-icon.svg',
      },
      {
        title: 'Approve Invoices',
        imagePath: 'assets/icons/invoices-approve-icon.svg',
      },
    ];

    this.userCards = [
      { title: 'My Applications', imagePath: 'assets/icons/applications.svg' },
      { title: 'My CV', imagePath: 'assets/icons/cv.svg' },
      { title: 'My Profile', imagePath: 'assets/icons/profile.svg' },
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
}
