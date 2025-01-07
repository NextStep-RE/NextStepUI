import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';
import { InternshipService } from '../../services/internship.service';
import {
  loadInternships,
  loadInternshipsSuccess,
  loadInternshipsFailure,
  loadInternshipById,
  loadInternshipByIdSuccess,
  loadInternshipByIdFailure,
} from '../actions/internships.actions';

@Injectable()
export class InternshipEffects {
  loadInternships$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInternships),
      mergeMap(({ offset = 0, limit = 5, filter }) =>
        this.internshipService.getAllInternships(offset, limit, filter).pipe(
          map((response) => 
            loadInternshipsSuccess({ data: response })
          ),
          catchError((error) => of(loadInternshipsFailure({ error })))
        )
      )
    )
  );

  loadInternshipById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInternshipById),
      mergeMap(({ id }) =>
        this.internshipService.getInternshipById(id).pipe(
          map((internship) => loadInternshipByIdSuccess({ internship })),
          catchError((error) => of(loadInternshipByIdFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private internshipService: InternshipService) {}
}
