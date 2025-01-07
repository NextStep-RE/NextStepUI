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

  onFilterChange() {
    this.filterChanged.emit(this.filters);
  }

  onSortChange(sortBy: string | undefined) {
    this.sortChanged.emit(sortBy);
  }
}
