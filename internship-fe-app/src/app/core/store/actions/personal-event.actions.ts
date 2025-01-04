import { createAction, props } from '@ngrx/store';
import { PersonalEvent } from '../../models/personalEvent.model';

export const LOAD_PERSONAL_EVENTS = createAction(
  '[PersonalEvents] Load Personal Events',
  props<{ employeeId: number }>()
);

export const LOAD_PERSONAL_EVENTS_SUCCESS = createAction(
  '[PersonalEvents] Load PersonalEvents Success',
  props<{ personalEvents: PersonalEvent[] }>()
);

export const LOAD_PERSONAL_EVENTS_FAILURE = createAction(
  '[PersonalEvents] Load PersonalEvents Failure',
  props<{ error: string }>()
);

export const SET_LOADING = createAction(
  '[PersonalEvents] Set Loading',
  props<{ isLoading: boolean }>()
);
