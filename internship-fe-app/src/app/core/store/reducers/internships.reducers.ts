import { createReducer, on } from '@ngrx/store';
import { Internship } from '../../models/internship.model';
import {
  loadInternships,
  loadInternshipsSuccess,
  loadInternshipsFailure,
  loadInternshipById,
  loadInternshipByIdSuccess,
  loadInternshipByIdFailure,
} from '../actions/internships.actions';

export interface InternshipState {
  totalNumber: number;
  internships: Internship[];
  selectedInternship: Internship | null;
  loading: boolean;
  error: string | null;
}

export const initialState: InternshipState = {
  totalNumber: 0,
  internships: [],
  selectedInternship: null,
  loading: false,
  error: null,
};

export const internshipReducer = createReducer(
  initialState,
  on(loadInternships, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadInternshipsSuccess, (state, { internships }) => ({
    ...state,
    internships,
    loading: false,
  })),
  on(loadInternshipsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(loadInternshipById, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadInternshipByIdSuccess, (state, { internship }) => ({
    ...state,
    selectedInternship: internship,
    loading: false,
  })),
  on(loadInternshipByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
