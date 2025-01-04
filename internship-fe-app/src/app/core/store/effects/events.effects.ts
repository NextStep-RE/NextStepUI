import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EventsService } from '../../services/events.service';
import { catchError, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import {
  ADD_EVENT,
  LOAD_EVENTS,
  LOAD_EVENTS_FAILURE,
  LOAD_EVENTS_SUCCESS,
  SET_LOADING,
} from '../actions/events.actions';
import { Action, Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Event } from '../../models/event.model';

@Injectable()
export class EventsEffects {
  constructor(
    private actions$: Actions,
    private eventsService: EventsService,
    private store: Store
  ) {}

  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_EVENTS),
      mergeMap((): Observable<Action> => {
        this.store.dispatch(SET_LOADING({ isLoading: true }));
        return this.eventsService.getAllEvents().pipe(
          map((response: Event[]) => {
            this.store.dispatch(SET_LOADING({ isLoading: false }));
            return LOAD_EVENTS_SUCCESS({ events: response });
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(SET_LOADING({ isLoading: false }));
            return of(LOAD_EVENTS_FAILURE({ error: error.message }));
          })
        );
      })
    )
  );

  addEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ADD_EVENT),
      switchMap((action) =>
        this.eventsService.addEvent(action.event).pipe(
          map(() => LOAD_EVENTS()),
          catchError((error) => {
            return of(error);
          })
        )
      )
    )
  );
}
