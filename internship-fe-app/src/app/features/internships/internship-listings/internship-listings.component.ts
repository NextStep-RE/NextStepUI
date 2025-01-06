import { Component, Input } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Internship } from '../../../core/models/internship.model';

@Component({
  selector: 'app-internship-listings',
  templateUrl: './internship-listings.component.html',
  styleUrls: ['./internship-listings.component.scss'],
})
export class InternshipListingsComponent {
  @Input() internships!: Internship[];
  itemsPerPage: number = 5;
  currentPage: number = 0;

  get paginatedInternships(): Internship[] {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.internships.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }
}
