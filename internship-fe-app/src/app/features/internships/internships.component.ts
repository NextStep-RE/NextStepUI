import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadInternships } from '../../core/store/actions/internships.actions';
import { selectAllInternships, selectLoading, selectError } from '../../core/store/selectors/internships.selector';
import { Internship } from '../../core/models/internship.model';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrls: ['./internships.component.scss'],
})
export class InternshipsComponent implements OnInit {
  selectedInternshipId!: number;

  internships$: Observable<Internship[]>;
  loading$: Observable<boolean>;
  error$: Observable<any>;

  searchQuery: string = '';
  filters: any = {};
  sortBy: string = 'name';
  isFilterSidebarVisible: boolean = false;

  constructor(private store: Store) {
    this.internships$ = this.store.select(selectAllInternships);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.loadInternships();
  }

  loadInternships() {
    const searchDTO = {
      searchQuery: this.searchQuery,
      filters: this.filters,
      sortBy: this.sortBy,
    };

    this.store.dispatch(loadInternships({ offset: 0, limit: 10, searchDTO }));
  }

  onFiltersChanged(filters: any) {
    this.filters = { ...this.filters, ...filters };
    this.loadInternships();
  }

  onSortChanged(sortBy: string) {
    this.sortBy = sortBy;
    this.loadInternships();
  }

  
  onSearchChange() {
    this.loadInternships();
  }

  toggleFilterSidebar() {
    this.isFilterSidebarVisible = !this.isFilterSidebarVisible;
  }

  viewDetails(internshipId: number): void {
    this.selectedInternshipId = internshipId;
  }
}
