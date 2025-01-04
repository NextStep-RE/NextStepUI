import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../../services/employee.service';
import {
  LOAD_USER_PROFILES,
  LOAD_USER_PROFILES_FAILURE,
  LOAD_USER_PROFILES_SUCCESS,
} from '../actions/user-profiles.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';
import { UserProfile } from '../../models/userProfile.model';

@Injectable()
export class UserProfilesEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}

  loadProfiles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_USER_PROFILES),
      mergeMap(
        (): Observable<Action> =>
          this.employeeService.getAllUserProfiles().pipe(
            map((response: UserProfile[]) =>
              LOAD_USER_PROFILES_SUCCESS({ profiles: response })
            ),
            catchError((error: HttpErrorResponse) =>
              of(LOAD_USER_PROFILES_FAILURE({ error: error.message }))
            )
          )
      )
    )
  );
}
