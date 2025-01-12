import {
  Component,
  AfterViewInit,
  ViewChild,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { filter, map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PersonalEvent } from '../../../core/models/personalEvent.model';
import { SELECT_PERSONAL_EVENTS } from '../../../core/store/selectors/personal-events.selectors';
import { LOAD_PERSONAL_EVENTS } from '../../../core/store/actions/personal-event.actions';
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
  events$!: Observable<PersonalEvent[]>;
  eventList: PersonalEvent[] = [];

  constructor(
    private store: Store,
    private destroyRef: DestroyRef,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.events$ = this.store.select(SELECT_PERSONAL_EVENTS);
    this.loadEvents();
    this.updateEvents();
  }

  loadEvents(): void {
    this.store.dispatch(
      LOAD_PERSONAL_EVENTS({
        userId: this.employeeService.getSelectedEmployeeId(),
      })
    );
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
        this.eventList = events;
      });
  }

  getEventsForDay(selectedDate: Date): Observable<PersonalEvent[]> {
    return this.events$.pipe(
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
