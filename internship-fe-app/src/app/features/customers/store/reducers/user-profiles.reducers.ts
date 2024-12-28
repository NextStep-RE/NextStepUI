import { createReducer, on } from '@ngrx/store';
import { UserProfile } from '../../../../core/models/userProfile.model';
import {
  LOAD_USER_PROFILES,
  LOAD_USER_PROFILES_FAILURE,
  LOAD_USER_PROFILES_SUCCESS,
  UPDATE_SELECTED_PROFILE_ROLE,
} from '../actions/user-profiles.actions';

export interface IUserProfileState {
  profiles: UserProfile[];
  error: string;
  newEvent: Partial<Event>;
  selectedProfileRole: string | null;
}

const INITIAL_STATE: IUserProfileState = {
  profiles: [],
  error: '',
  newEvent: {},
  selectedProfileRole: null,
};

export const PROFILE_REDUCER = createReducer(
  INITIAL_STATE,
  on(
    LOAD_USER_PROFILES,
    (state: IUserProfileState): IUserProfileState => ({
      ...state,
    })
  ),
  on(
    LOAD_USER_PROFILES_SUCCESS,
    (
      state: IUserProfileState,
      action: { profiles: UserProfile[] }
    ): IUserProfileState => ({
      ...state,
      profiles: action.profiles,
    })
  ),
  on(
    LOAD_USER_PROFILES_FAILURE,
    (
      state: IUserProfileState,
      action: { error: string }
    ): IUserProfileState => ({
      ...state,
      error: action.error,
    })
  ),
  on(
    UPDATE_SELECTED_PROFILE_ROLE,
    (state: IUserProfileState, action: { role: string }) => ({
      ...state,
      selectedProfileRole: action.role,
    })
  )
);
