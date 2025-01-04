import { Component } from '@angular/core';
import { MOCK_INTERNSHIPS } from '../../core/models/mock-data/internship.mock';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrl: './internships.component.scss',
})
export class InternshipsComponent {
  selectedInternshipId: number | null = null;

  internships = MOCK_INTERNSHIPS;
  filteredInternships = MOCK_INTERNSHIPS;
  searchQuery = '';
  filters: any = {};
  sortBy = 'name';
  isFilterSidebarVisible: boolean = false; // Track visibility of filter sidebar


  onFiltersChanged(filters: any) {
    this.filters = { ...this.filters, ...filters };
    this.applyFilters();
  }
  
  onSortChanged(sortBy: string) {
    this.sortBy = sortBy;
    this.applySorting();
  }  

  onSearchChange() {
    if (!this.searchQuery) {
      this.filteredInternships = this.internships;
      this.applyFilters();
    } else {
      this.applyFilters();
    }
  }
  
  applyFilters() {
    this.filteredInternships = this.internships.filter((internship) => {
      const matchesRemote = !this.filters['remote'] || internship.location === 'Remote';
      const matchesFullTime = !this.filters['fullTime'] || internship.title.toLowerCase().includes('full-time');
      const matchesLocation = !this.filters['location'] || internship.location.includes(this.filters['location']);
      const matchesExperience = !this.filters['experience'] || internship.requirements.includes(this.filters['experience']);
      const matchesSearchQuery = internship.title.toLowerCase().includes(this.searchQuery.toLowerCase());
  
      return matchesRemote && matchesFullTime && matchesLocation && matchesExperience && matchesSearchQuery;
    });
  
    this.applySorting();
  }  

  applySorting() {
    this.filteredInternships.sort((a, b) => {
      if (this.sortBy === 'name') return a.title.localeCompare(b.title);
      if (this.sortBy === 'endDate')
        return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
      if (this.sortBy === 'deadline')
        return (
          new Date(a.applicationDeadline).getTime() -
          new Date(b.applicationDeadline).getTime()
        );
      return 0;
    });
  }

  viewDetails(internshipId: number): void {
    this.selectedInternshipId = internshipId;
  }

  toggleFilterSidebar() {
    this.isFilterSidebarVisible = !this.isFilterSidebarVisible;
  }

}
