import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TimesheetCard } from '../../../core/models/timesheetCard.model';
import { SELECT_USER_PROFILE_ROLE } from '../../../core/store/selectors/user-profiles.selectors';
import { Router } from '@angular/router';

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

  constructor(private store: Store, private router: Router) {
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

  navigateTo(cardTitle: string): void {
    console.log(cardTitle)
    if (cardTitle === 'My Applications') {
      this.router.navigate(['/applied-internships']);
    } else if (cardTitle === 'My Education') {
      this.router.navigate(['/education']);
    } else if (cardTitle === 'My Experience') {
      this.router.navigate(['/experience']);
    }
  }
  
}
