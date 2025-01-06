import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadInternships } from '../../core/store/actions/internships.actions';
import { Internship, FilterInternship } from '../../core/models/internship.model';
import { selectInternships, selectLoading, selectError } from '../../core/store/selectors/internships.selector';
import { PageEvent } from '@angular/material/paginator';

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
  filters: FilterInternship = {}; 
  sortBy: string = '';
  isFilterSidebarVisible: boolean = false;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(private store: Store) {
    this.internships$ = this.store.select(selectInternships);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.loadInternships();
  }

  loadInternships() {
    const filter: FilterInternship = {
      ...this.filters,
      title: this.searchQuery,
      sortBy: this.sortBy,
    };

    this.store.dispatch(loadInternships({ 
      offset: this.currentPage * this.pageSize, 
      limit: this.pageSize, 
      filter 
    }));    
  }

  onFiltersChanged(filters: FilterInternship) {
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

  // Handle page change event
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex; // Update currentPage based on pagination
    this.pageSize = event.pageSize;
    this.loadInternships(); // Reload internships with new page and size
  }
}
