import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../../services/employee.service';
import {
  LOAD_USER_INFO,
  LOAD_USER_INFO_FAIL,
  LOAD_USER_INFO_SUCCESS,
  SET_LOADING,
} from '../actions/userInfo.actions';
import { catchError, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { UserInfo } from '../../models/userInfo.model';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserInfoEffects {
  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService,
    private store: Store
  ) {}

  loadUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_USER_INFO),
      switchMap((action: { id: number }): Observable<Action> => {
        this.store.dispatch(SET_LOADING({ isLoading: true }));
        return this.employeeService.getUserInfo(action.id).pipe(
          map((response: UserInfo) => {
            this.store.dispatch(SET_LOADING({ isLoading: false }));
            return LOAD_USER_INFO_SUCCESS({ userInfo: response });
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(SET_LOADING({ isLoading: false }));
            return of(LOAD_USER_INFO_FAIL({ error: error.message }));
          })
        );
      })
    )
  );
}
