import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss'],
})
export class FilterSidebarComponent {
  @Output() filterChanged = new EventEmitter<any>();
  @Output() sortChanged = new EventEmitter<string>();

  filters = {
    remote: false,
    fullTime: false,
    location: '',
    experience: '',
    commonRequirements: '',
    experienceRange: 0,
    company: '',
    onSite: false
  };

  sortBy: string = 'name';

  commonRequirements = ['HTML', 'CSS', 'JavaScript', 'React', 'Python'];
  companies = [
    { id: '1', name: 'Company A' },
    { id: '2', name: 'Company B' },
    { id: '3', name: 'Company C' },
    { id: '4', name: 'Company D' }
  ];

  onFilterChange() {
    this.filterChanged.emit(this.filters);
  }

  onSortChange(sortBy: string) {
    this.sortChanged.emit(sortBy);
  }
}
