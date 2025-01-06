import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InternshipState } from '../reducers/internships.reducers';

export const selectInternshipState =
  createFeatureSelector<InternshipState>('internships');

export const selectAllInternships = createSelector(
  selectInternshipState,
  (state: InternshipState) => state.internships
);

export const selectLoading = createSelector(
  selectInternshipState,
  (state: InternshipState) => state.loading
);

export const selectError = createSelector(
  selectInternshipState,
  (state: InternshipState) => state.error
);

export const selectSelectedInternship = createSelector(
  selectInternshipState,
  (state: InternshipState) => state.selectedInternship
);

export const selectFilteredInternships = createSelector(
  selectAllInternships,
  (internships) => internships
);

