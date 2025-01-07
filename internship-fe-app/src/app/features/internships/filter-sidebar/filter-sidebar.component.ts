import { Component, EventEmitter, Output } from '@angular/core';
import { FilterInternship } from '../../../core/models/internship.model';

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss'],
})
export class FilterSidebarComponent {
  @Output() filterChanged = new EventEmitter<any>();
  @Output() sortChanged = new EventEmitter<string>();

  // Filter model aligned with backend expectations
  filters: FilterInternship = {
    title: '',
    companyName: '',
    location: '',
    startDate: undefined,
    endDate: undefined,
    applicationDeadline: undefined,
    requirements: [],
    sortBy: 'title',
    ascending: true,
  };

  // Example common requirements (could be fetched from API if needed)
  commonRequirements = ['HTML', 'CSS', 'JavaScript', 'React', 'Python'];
  companies = [
    { id: '1', name: 'Company A' },
    { id: '2', name: 'Company B' },
    { id: '3', name: 'Company C' },
    { id: '4', name: 'Company D' },
  ];

  // Emit changes whenever a filter is modified
  onFilterChange() {
    this.filterChanged.emit(this.filters);
  }

  // Emit sorting changes
  onSortChange(sortBy: string | undefined) {
    this.sortChanged.emit(sortBy);
  }
}
