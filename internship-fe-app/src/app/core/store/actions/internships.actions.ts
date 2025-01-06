import { createAction, props } from '@ngrx/store';
import { Internship, FilterInternship } from '../../models/internship.model';

export const loadInternships = createAction(
  '[Internships] Load Internships',
  props<{ offset?: number; limit?: number; filter?: FilterInternship }>()  // Use filter instead of searchDTO
);

export const loadInternshipsSuccess = createAction(
  '[Internships] Load Internships Success',
  props<{ internships: Internship[] }>()
);

export const loadInternshipsFailure = createAction(
  '[Internships] Load Internships Failure',
  props<{ error: any }>()
);

export const loadInternshipById = createAction(
  '[Internships] Load Internship By ID',
  props<{ id: number }>()
);

export const loadInternshipByIdSuccess = createAction(
  '[Internships] Load Internship By ID Success',
  props<{ internship: Internship }>()
);

export const loadInternshipByIdFailure = createAction(
  '[Internships] Load Internship By ID Failure',
  props<{ error: any }>()
);
