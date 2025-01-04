import { Component, OnInit } from '@angular/core';
import { Event } from '../../../core/models/event.model';
import { combineLatest, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SELECT_EVENTS } from '../../customers/store/selectors/events.selectors';
import { LOAD_EVENTS } from '../../customers/store/actions/events.actions';
import { SELECT_PERSONAL_EVENTS } from '../../customers/store/selectors/personal-events.selectors';
import { LOAD_PERSONAL_EVENTS } from '../../customers/store/actions/personal-event.actions';
import { PersonalEvent } from '../../../core/models/personalEvent.model';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-upcoming-events',
  templateUrl: './upcoming-events.component.html',
  styleUrl: './upcoming-events.component.scss',
})
export class UpcomingEventsComponent implements OnInit {
  combinedEvents$!: Observable<(PersonalEvent | Event)[]>;

  constructor(private store: Store, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    this.combinedEvents$ = combineLatest([
      this.store.select(SELECT_PERSONAL_EVENTS),
      this.store.select(SELECT_EVENTS),
    ]).pipe(
      map(([personalEvents, events]) => {
        return [...personalEvents, ...events].filter((event) => {
          const eventStartDate = new Date(event.startDate);
          return eventStartDate >= yesterday;
        });
      })
    );

    this.loadEvents();
  }

  loadEvents(): void {
    this.store.dispatch(
      LOAD_PERSONAL_EVENTS({
        employeeId: this.employeeService.getSelectedEmployeeId(),
      })
    );
    this.store.dispatch(LOAD_EVENTS());
  }
}
