import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IPersonalEventState } from "../reducers/personal-events.reducer";

export const SELECT_PERSONAL_EVENTS_STATE = createFeatureSelector<IPersonalEventState>('personalEvents');

export const SELECT_PERSONAL_EVENTS = createSelector(
    SELECT_PERSONAL_EVENTS_STATE,
    (state) => state.personalEvents
);

export const SELECT_PERSONAL_EVENTS_ERROR = createSelector(
    SELECT_PERSONAL_EVENTS_STATE,
    (state) => state.error
);

export const SELECT_PERSONAL_EVENTS_LOADING = createSelector(
    SELECT_PERSONAL_EVENTS_STATE,
    (state) => state.isLoading
);
