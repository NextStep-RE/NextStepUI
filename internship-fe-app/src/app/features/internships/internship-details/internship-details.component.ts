import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Internship } from '../../../core/models/internship.model';
import { loadInternshipById } from '../../../core/store/actions/internships.actions';
import { selectSelectedInternship } from '../../../core/store/selectors/internships.selector';

@Component({
  selector: 'app-internship-details',
  templateUrl: './internship-details.component.html',
  styleUrls: ['./internship-details.component.scss'],
})
export class InternshipDetailsComponent implements OnInit {
  internshipId!: string;
  internshipDetails$!: Observable<Internship | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.internshipId = this.route.snapshot.paramMap.get('id')!;

    this.store.dispatch(loadInternshipById({ id: +this.internshipId }));

    this.internshipDetails$ = this.store.select(selectSelectedInternship);
  }

  getFormattedDate(date?: Date): string {
    if (!date) return 'Not available';

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  isDeadlineApproaching(deadline: Date): boolean {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate.getTime() - currentDate.getTime();
    const daysRemaining = timeDifference / (1000 * 3600 * 24);
    return daysRemaining <= 10 && daysRemaining >= 0;
  }

  closeDetails() {
    this.router.navigate(['/internships']);
  }

  openWebsite(url: string): void {
    window.open(url, '_blank');
  }
}
