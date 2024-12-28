import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DocumentsService } from '../../../../core/services/documents.service';
import { Action, Store } from '@ngrx/store';
import { Document } from '../../../../core/models/document.model';
import {
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  LOAD_DOCUMENTS_DATA,
  LOAD_DOCUMENTS_DATA_FAIL,
  LOAD_DOCUMENTS_DATA_SUCCESS,
  SET_DOCUMENTS_LOADING,
} from '../actions/documents.actions';
import { catchError, map, mergeMap, Observable, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class DocumentsEffects {
  constructor(
    private actions$: Actions,
    private documentService: DocumentsService,
    private store: Store
  ) {}

  loadDocuments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LOAD_DOCUMENTS_DATA),
      mergeMap((action: { customerId: number }): Observable<Action> => {
        this.store.dispatch(
          SET_DOCUMENTS_LOADING({
            isLoading: true,
          })
        );
        return this.documentService.getAllDocuments(action.customerId).pipe(
          map((response: Document[]) => {
            this.store.dispatch(
              SET_DOCUMENTS_LOADING({
                isLoading: false,
              })
            );
            return LOAD_DOCUMENTS_DATA_SUCCESS({ data: response });
          }),
          catchError((error: HttpErrorResponse) => {
            this.store.dispatch(
              SET_DOCUMENTS_LOADING({
                isLoading: false,
              })
            );
            return of(LOAD_DOCUMENTS_DATA_FAIL({ error: error.message }));
          })
        );
      })
    )
  );

  addDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ADD_DOCUMENT),
      switchMap((action: { customerId: number; document: File[] }) =>
        this.documentService
          .addDocument(action.customerId, action.document)
          .pipe(
            switchMap(() =>
              this.documentService.getAllDocuments(action.customerId).pipe(
                map((documents: Document[]) =>
                  LOAD_DOCUMENTS_DATA_SUCCESS({ data: documents })
                ),
                catchError((error: HttpErrorResponse) =>
                  of(LOAD_DOCUMENTS_DATA_FAIL({ error: error.message }))
                )
              )
            )
          )
      )
    )
  );

  deleteDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DELETE_DOCUMENT),
      switchMap((action: { customerId: number; documentId: number }) =>
        this.documentService
          .deleteDocument(action.customerId, action.documentId)
          .pipe(
            switchMap(() =>
              this.documentService.getAllDocuments(action.customerId).pipe(
                map((documents: Document[]) =>
                  LOAD_DOCUMENTS_DATA_SUCCESS({ data: documents })
                ),
                catchError((error: HttpErrorResponse) =>
                  of(LOAD_DOCUMENTS_DATA_FAIL({ error: error.message }))
                )
              )
            )
          )
      )
    )
  );
}
