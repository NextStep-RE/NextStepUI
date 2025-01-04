import { createReducer, on } from '@ngrx/store';
import { UserInfo } from '../../models/userInfo.model';
import {
  LOAD_USER_INFO,
  LOAD_USER_INFO_FAIL,
  LOAD_USER_INFO_SUCCESS,
  SET_LOADING,
} from '../actions/userInfo.actions';

export interface IUserInfoState {
  userInfo: UserInfo | null;
  error: string | null;
  isLoading: boolean;
}

const INITIAL_STATE: IUserInfoState = {
  userInfo: null,
  error: null,
  isLoading: false,
};

export const USER_INFO_REDUCER = createReducer(
  INITIAL_STATE,
  on(
    LOAD_USER_INFO,
    (state: IUserInfoState): IUserInfoState => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    LOAD_USER_INFO_SUCCESS,
    (
      state: IUserInfoState,
      action: { userInfo: UserInfo }
    ): IUserInfoState => ({
      ...state,
      isLoading: false,
      userInfo: action.userInfo,
    })
  ),
  on(
    LOAD_USER_INFO_FAIL,
    (state: IUserInfoState, action: { error: string }): IUserInfoState => ({
      ...state,
      isLoading: false,
      error: action.error,
    })
  ),
  on(
    SET_LOADING,
    (
      state: IUserInfoState,
      action: { isLoading: boolean }
    ): IUserInfoState => ({
      ...state,
      isLoading: action.isLoading,
    })
  )
);
