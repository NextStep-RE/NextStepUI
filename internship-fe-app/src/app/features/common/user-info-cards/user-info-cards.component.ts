import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TimesheetCard } from '../../../core/models/timesheetCard.model';
import { SELECT_USER_PROFILE_ROLE } from '../../../core/store/selectors/user-profiles.selectors';

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

    this.userCards = [
      { title: 'My Applications', imagePath: 'assets/icons/applications.svg' },
      { title: 'My Education', imagePath: 'assets/icons/education.svg' },
      { title: 'My Experience', imagePath: 'assets/icons/experience.svg' },
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
