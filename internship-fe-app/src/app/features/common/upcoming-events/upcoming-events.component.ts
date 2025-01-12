import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SELECT_PERSONAL_EVENTS } from '../../../core/store/selectors/personal-events.selectors';
import { LOAD_PERSONAL_EVENTS } from '../../../core/store/actions/personal-event.actions';
import { PersonalEvent } from '../../../core/models/personalEvent.model';
import { AuthenticationService } from '../../../core/services/authentication.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrl: './upcoming-events.component.scss',
})
export class UpcomingEventsComponent implements OnInit {
  personalEvents$!: Observable<PersonalEvent[]>;

  constructor(private store: Store, private authentificationService: AuthenticationService) {}

  ngOnInit(): void {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    this.personalEvents$ = this.store.select(SELECT_PERSONAL_EVENTS).pipe(
      map((personalEvents) =>
        personalEvents.filter((event) => {
          const eventStartDate = new Date(event.startDate);
          return eventStartDate >= yesterday;
        })
      )
    );

    this.loadEvents();
  }

  loadEvents(): void {
    this.store.dispatch(
      LOAD_PERSONAL_EVENTS({
        userId: this.authentificationService.getUserId(),
      })
    );
  }
}
