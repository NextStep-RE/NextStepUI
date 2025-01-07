import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Internship } from '../../../core/models/internship.model';

@Component({
  selector: 'app-internship-listings',
  templateUrl: './internship-listings.component.html',
  styleUrls: ['./internship-listings.component.scss'],
})
export class InternshipListingsComponent {
  @Input() internships: Internship[] | null = [];
  @Output() pageChange = new EventEmitter<{
    pageIndex: number;
    pageSize: number;
  }>();
  @Input() totalNumber: number | null = 0;
  @Input() itemsPerPage: number = 5;
  pageIndex: number = 0;

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.pageChange.emit({
      pageIndex: this.pageIndex,
      pageSize: this.itemsPerPage,
    });
  }
}
