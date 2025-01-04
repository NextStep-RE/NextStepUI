import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserInfoState } from '../reducers/userInfo.reducer';

export const SELECT_USER_INFO_STATE =
  createFeatureSelector<IUserInfoState>('userInfo');

export const SELECT_USER_INFO = createSelector(
  SELECT_USER_INFO_STATE,
  (state) => state.userInfo
);

export const SELECT_USER_INFO_ERROR = createSelector(
  SELECT_USER_INFO_STATE,
  (state) => state.error
);

export const SELECT_USER_INFO_LOADING = createSelector(
  SELECT_USER_INFO_STATE,
  (state) => state.isLoading
);
