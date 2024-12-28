import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IEventState } from '../reducers/events.reducer';

export const SELECT_EVENT_STATE = createFeatureSelector<IEventState>('events');

export const SELECT_EVENTS = createSelector(
  SELECT_EVENT_STATE,
  (state: IEventState) => state.events
);
