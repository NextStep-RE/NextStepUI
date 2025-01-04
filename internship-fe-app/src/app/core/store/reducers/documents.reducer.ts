import { createReducer, on } from '@ngrx/store';
import { Document } from '../../models/document.model';
import {
  LOAD_DOCUMENTS_DATA_SUCCESS,
  SET_DOCUMENTS_LOADING,
  LOAD_DOCUMENTS_DATA_FAIL,
  DELETE_DOCUMENT,
} from '../actions/documents.actions';

export interface IDocumentState {
  documents: Document[];
  isLoading: boolean;
  error: string;
  newDocument: Partial<Document>;
}

const INITIAL_STATE: IDocumentState = {
  documents: [],
  isLoading: false,
  error: '',
  newDocument: {},
};

export const DOCUMENT_REDUCER = createReducer(
  INITIAL_STATE,
  on(
    LOAD_DOCUMENTS_DATA_SUCCESS,
    (state: IDocumentState, action: { data: Document[] }) => ({
      ...state,
      documents: action.data,
      isLoading: false,
      error: '',
      newDocument: {},
    })
  ),
  on(
    LOAD_DOCUMENTS_DATA_FAIL,
    (state: IDocumentState, action: { error: string }) => ({
      ...state,
      isLoading: false,
      error: action.error,
      newDocument: {},
    })
  ),
  on(
    SET_DOCUMENTS_LOADING,
    (state: IDocumentState, action: { isLoading: boolean }) => ({
      ...state,
      isLoading: action.isLoading,
      error: '',
      newDocument: {},
    })
  ),
  on(DELETE_DOCUMENT,
    (state: IDocumentState, action: {customerId: number, documentId: number}) => ({
      ...state,
      documents: state.documents.filter(document => document.id !== action.documentId),
      isLoading: false,
      error: '',
      newDocument: {},
    })
  )
);
