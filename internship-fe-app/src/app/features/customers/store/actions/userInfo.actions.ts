import { createAction, props } from '@ngrx/store';
import { UserInfo } from '../../../../core/models/userInfo.model';

export const LOAD_USER_INFO = createAction(
  '[UserInfo] Load User Info',
  props<{
    id: number;
  }>()
);

export const LOAD_USER_INFO_SUCCESS = createAction(
  '[UserInfo] Load User Info Success',
  props<{
    userInfo: UserInfo;
  }>()
);

export const LOAD_USER_INFO_FAIL = createAction(
  '[UserInfo] Load User Info Failed',
  props<{ error: string }>()
);

export const SET_LOADING = createAction(
  '[UserInfo] Set Loading',
  props<{ isLoading: boolean }>()
);
