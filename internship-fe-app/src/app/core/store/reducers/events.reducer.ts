import { createReducer, on } from '@ngrx/store';
import {
  LOAD_EVENTS_FAILURE,
  LOAD_EVENTS_SUCCESS,
  SET_LOADING,
} from '../actions/events.actions';
import { Event } from '../../models/event.model';

export interface IEventState {
  events: Event[];
  isLoading: boolean;
  error: string;
  newEvent: Partial<Event>;
}

const INITIAL_STATE: IEventState = {
  events: [],
  isLoading: false,
  error: '',
  newEvent: {},
};

export const EVENT_REDUCER = createReducer(
  INITIAL_STATE,
  on(
    LOAD_EVENTS_SUCCESS,
    (state: IEventState, action: { events: Event[] }): IEventState => ({
      ...state,
      events: action.events,
    })
  ),
  on(
    LOAD_EVENTS_FAILURE,
    (state: IEventState, action: { error: string }): IEventState => ({
      ...state,
      error: action.error,
    })
  ),
  on(
    SET_LOADING,
    (state: IEventState, action: { isLoading: boolean }): IEventState => ({
      ...state,
      isLoading: action.isLoading,
    })
  )
);
