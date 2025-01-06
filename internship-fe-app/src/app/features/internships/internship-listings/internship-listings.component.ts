import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FilterInternship, Internship } from '../../../core/models/internship.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectInternships,
  selectTotalNumber,
} from '../../../core/store/selectors/internships.selector';
import { loadInternships } from '../../../core/store/actions/internships.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LOAD_CUSTOMERS } from '../../../core/store/actions/customers.actions';

@Component({
  selector: 'app-internship-listings',
  templateUrl: './internship-listings.component.html',
  styleUrls: ['./internship-listings.component.scss'],
})
export class InternshipListingsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  internships$!: Observable<Internship[]>;
  totalNumber$: Observable<number>;
  itemsPerPage: number = 5;
  pageIndex=0;

  constructor(private store: Store, private destroyRef: DestroyRef) {
    this.internships$ = this.store.select(selectInternships);
    this.totalNumber$ = this.store.select(selectTotalNumber);
  }

  ngOnInit(): void {
    this.loadInternships();
  }

  ngAfterViewInit(): void {
    this.paginator.page
      .pipe(takeUntilDestroyed(this.destroyRef))
  }

  loadInternships() {
    this.store.dispatch(loadInternships({ 
      offset: this.pageIndex * this.itemsPerPage, 
      limit: this.itemsPerPage 
    }));
  } 

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.loadInternships();
  }
}
