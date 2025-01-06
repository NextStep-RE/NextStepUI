import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { mergeMap, map, catchError, of } from "rxjs";
import { InternshipService } from "../../services/internship.service";
import { loadInternships, loadInternshipsSuccess, loadInternshipsFailure, loadInternshipById, loadInternshipByIdSuccess, loadInternshipByIdFailure } from "../actions/internships.actions";

@Injectable()
export class InternshipEffects {
  loadInternships$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInternships),
      mergeMap(({ offset, limit, searchDTO }) =>
        this.internshipService.getAllInternships(offset, limit, searchDTO).pipe(
          map((internships) => loadInternshipsSuccess({ internships })),
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
