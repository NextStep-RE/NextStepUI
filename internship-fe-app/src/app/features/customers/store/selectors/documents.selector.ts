import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IDocumentState } from '../reducers/documents.reducer';

export const SELECT_DOCUMENT_STATE = createFeatureSelector<IDocumentState>('documents');

export const SELECT_DOCUMENT = createSelector(
  SELECT_DOCUMENT_STATE,
  (state: IDocumentState) => state.documents
);

export const SELECT_DOCUMENTS_ERROR = createSelector(
  SELECT_DOCUMENT_STATE,
  (state:IDocumentState) => state.error
)
