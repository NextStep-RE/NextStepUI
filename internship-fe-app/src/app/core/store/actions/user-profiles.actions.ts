import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../../models/userProfile.model';

export const LOAD_USER_PROFILES = createAction(
  '[UserProfiles] Load User Profiles'
);

export const LOAD_USER_PROFILES_SUCCESS = createAction(
  '[UserProfiles] Load User Profiles Success',
  props<{ profiles: UserProfile[] }>()
);

export const LOAD_USER_PROFILES_FAILURE = createAction(
  '[UserProfiles] Load User Profiles Failure',
  props<{ error: string }>()
);

export const UPDATE_SELECTED_PROFILE_ROLE = createAction(
  '[UserProfiles] Update Selected Profile Role',
  props<{ role: string }>()
);
