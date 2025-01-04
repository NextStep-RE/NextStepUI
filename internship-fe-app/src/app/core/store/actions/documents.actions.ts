import { createAction, props } from '@ngrx/store';
import { Document } from '../../models/document.model';

export const LOAD_DOCUMENTS_DATA = createAction(
  '[Documets] Load Data',
  props<{ customerId: number }>()
);

export const LOAD_DOCUMENTS_DATA_SUCCESS = createAction(
  '[Documents] Load Data Succes',
  props<{ data: Document[] }>()
);

export const LOAD_DOCUMENTS_DATA_FAIL = createAction(
  '[Documents] Load Data Fail',
  props<{ error: string }>()
);

export const ADD_DOCUMENT = createAction(
  '[Documents] Add Document',
  props<{ customerId: number; document: File[] }>()
);

export const SET_DOCUMENTS_LOADING = createAction(
  '[Documents] Set Loading',
  props<{ isLoading: boolean }>()
);

export const DELETE_DOCUMENT = createAction(
  '[Documents] Delete Document',
  props<{ customerId: number; documentId: number }>()
);
