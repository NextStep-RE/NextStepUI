import { Component, Input, input } from '@angular/core';
import { Internship } from '../../../core/models/internship.model';

@Component({
  selector: 'app-internship-listings',
  templateUrl: './internship-listings.component.html',
  styleUrl: './internship-listings.component.scss',
})
export class InternshipListingsComponent {
  @Input() internships!: Internship[];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  get paginatedInternships(): Internship[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.internships.slice(startIndex, endIndex);
  }

  totalPages(): number {
    return Math.ceil(this.internships.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
