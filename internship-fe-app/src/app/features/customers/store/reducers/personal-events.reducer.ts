import { createReducer, on } from "@ngrx/store";
import { PersonalEvent } from "../../../../core/models/personalEvent.model";
import { SET_LOADING } from "../actions/events.actions";
import { LOAD_PERSONAL_EVENTS,LOAD_PERSONAL_EVENTS_SUCCESS, LOAD_PERSONAL_EVENTS_FAILURE } from "../actions/personal-event.actions";

export interface IPersonalEventState {
    personalEvents: PersonalEvent[];
    error: string | null;
    isLoading: boolean;
}

const INITIAL_STATE: IPersonalEventState = {
    personalEvents: [],
    error: null,
    isLoading: false,
}

export const PERSONAL_EVENT_REDUCER = createReducer(
    INITIAL_STATE,
    on(LOAD_PERSONAL_EVENTS,
        (state:IPersonalEventState): IPersonalEventState => ({
            ...state,
            isLoading: true,
        })
    ),
    on(
        LOAD_PERSONAL_EVENTS_SUCCESS,
        (
          state: IPersonalEventState,
          action: { personalEvents: PersonalEvent[] }
        ): IPersonalEventState => ({
          ...state,
          isLoading: false,
          personalEvents: action.personalEvents,
        })
      ),
      on(
        LOAD_PERSONAL_EVENTS_FAILURE,
        (state: IPersonalEventState, action: { error: string }): IPersonalEventState => ({
          ...state,
          isLoading: false,
          error: action.error,
        })
      ),
      on(
        SET_LOADING,
        (
          state: IPersonalEventState,
          action: { isLoading: boolean }
        ): IPersonalEventState => ({
          ...state,
          isLoading: action.isLoading,
        })
      )
    );