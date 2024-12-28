import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EventsService } from '../../../../core/services/events.service';
import { Action, Store } from '@ngrx/store';
import {
  LOAD_PERSONAL_EVENTS,
  LOAD_PERSONAL_EVENTS_FAILURE,
  LOAD_PERSONAL_EVENTS_SUCCESS,
  SET_LOADING,
} from '../actions/personal-event.actions';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { PersonalEvent } from '../../../../core/models/personalEvent.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PersonalEventsEffect {
  constructor(
    private actions$: Actions,
    private eventsService: EventsService,
    private store: Store
  ) {}

  loadPersonalEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_PERSONAL_EVENTS),
      mergeMap((action: { employeeId: number }): Observable<Action> => {
        this.store.dispatch(SET_LOADING({ isLoading: true }));
        return this.eventsService
          .getPersonalEventsByEmployeeId(action.employeeId)
          .pipe(
            map((response: PersonalEvent[]) => {
              this.store.dispatch(SET_LOADING({ isLoading: false }));
              return LOAD_PERSONAL_EVENTS_SUCCESS({ personalEvents: response });
            }),
            catchError((error: HttpErrorResponse) => {
              this.store.dispatch(SET_LOADING({ isLoading: false }));
              return of(LOAD_PERSONAL_EVENTS_FAILURE({ error: error.message }));
            })
          );
      })
    )
  );
}
