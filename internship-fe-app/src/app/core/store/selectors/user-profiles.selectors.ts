import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserProfileState } from '../reducers/user-profiles.reducers';

export const SELECT_USER_PROFILE_STATE =
  createFeatureSelector<IUserProfileState>('profiles');

export const SELECT_USER_PROFILES = createSelector(
  SELECT_USER_PROFILE_STATE,
  (state: IUserProfileState) => state.profiles
);

export const SELECT_USER_PROFILE_ERROR = createSelector(
  SELECT_USER_PROFILE_STATE,
  (state: IUserProfileState) => state.error
);

export const SELECT_USER_PROFILE_ROLE = createSelector(
  SELECT_USER_PROFILE_STATE,
  (state: IUserProfileState) => state.selectedProfileRole
);
