import { createAction, props } from '@ngrx/store';
import { Event } from '../../models/event.model';

export const LOAD_EVENTS = createAction('[Events] Load Events');

export const LOAD_EVENTS_SUCCESS = createAction(
  '[Events] Load Events Success',
  props<{ events: Event[] }>()
);

export const LOAD_EVENTS_FAILURE = createAction(
  '[Events] Load Events Failure',
  props<{ error: string }>()
);

export const ADD_EVENT = createAction(
  '[Events] Add Event',
  props<{ event: Partial<Event> }>()
);

export const SET_LOADING = createAction(
  '[Events] Set Loading',
  props<{ isLoading: boolean }>()
);
