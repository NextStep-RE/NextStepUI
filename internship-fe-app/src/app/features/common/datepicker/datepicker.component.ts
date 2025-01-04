import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Event } from '../../../core/models/event.model';
import { combineLatest, filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SELECT_EVENTS } from '../../customers/store/selectors/events.selectors';
import { LOAD_EVENTS } from '../../customers/store/actions/events.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PersonalEvent } from '../../../core/models/personalEvent.model';
import { SELECT_PERSONAL_EVENTS } from '../../customers/store/selectors/personal-events.selectors';
import { LOAD_PERSONAL_EVENTS } from '../../customers/store/actions/personal-event.actions';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit, AfterViewInit {
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;
  selected: Date = new Date();
  today: Date = new Date();
  previousActiveDate!: Date;
  combinedEvents$!: Observable<(PersonalEvent | Event)[]>;
  events: Event[] = [];

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.combinedEvents$ = combineLatest([
      this.store.select(SELECT_PERSONAL_EVENTS),
      this.store.select(SELECT_EVENTS),
    ]).pipe(map(([personalEvents, events]) => [...personalEvents, ...events]));

    this.loadEvents();
    this.updateEvents();
  }

  loadEvents(): void {
    this.store.dispatch(
      LOAD_PERSONAL_EVENTS({
        employeeId: this.employeeService.getSelectedEmployeeId(),
      })
    );
    this.store.dispatch(LOAD_EVENTS());
  }

  ngAfterViewInit(): void {
    this.previousActiveDate = this.calendar.activeDate;

    this.calendar.stateChanges.subscribe(() => {
      if (
        !this.isSameMonthAndYear(
          this.calendar.activeDate,
          this.previousActiveDate
        )
      ) {
        this.previousActiveDate = this.calendar.activeDate;

        const daysInMonth = this.getDaysInMonth(this.calendar.activeDate);
        const day = Math.min(this.selected.getDate(), daysInMonth);

        this.selected = new Date(
          this.calendar.activeDate.getFullYear(),
          this.calendar.activeDate.getMonth(),
          day
        );
      }
      this.updateEvents();
    });
  }

  // isPersonalEvent(event: Event | PersonalEvent): event is PersonalEvent {
  //   return (event as PersonalEvent).employeeId !== undefined;
  // }

  isSameMonthAndYear(d1: Date, d2: Date): boolean {
    const date1 = new Date(d1);
    const date2 = new Date(d2);

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  getDaysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }

  private updateEvents(): void {
    this.getEventsForDay(this.selected)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((events) => {
        this.events = events;
      });
  }

  getEventsForDay(selectedDate: Date): Observable<Event[] | PersonalEvent[]> {
    return this.combinedEvents$.pipe(
      filter((events) => events.length > 0),
      map((events) =>
        events
          .filter((event) => {
            const eventStartDate = new Date(event.startDate);
            return this.isSameMonthAndYear(eventStartDate, selectedDate);
          })
          .sort(
            (a, b) =>
              new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
          )
      )
    );
  }
}
