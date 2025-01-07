import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InternshipState } from '../reducers/internships.reducers';

export const selectInternshipsState = createFeatureSelector<InternshipState>('internships');

export const selectInternships = createSelector(
  selectInternshipsState,
  (state: InternshipState) => state.internships
);

export const selectTotalNumber = createSelector(
  selectInternshipsState,
  (state: InternshipState) => state.totalNumber
);

export const selectInternship = createSelector(
  selectInternshipsState,
  (state: InternshipState) => state.selectedInternship
);

export const selectLoading = createSelector(
  selectInternshipsState,
  (state: InternshipState) => state.loading
);

export const selectError = createSelector(
  selectInternshipsState,
  (state: InternshipState) => state.error
);
