import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MOCK_INTERNSHIPS } from '../../../core/models/mock-data/internship.mock';
import { Internship } from '../../../core/models/internship.model';

@Component({
  selector: 'app-internship-details',
  templateUrl: './internship-details.component.html',
  styleUrls: ['./internship-details.component.scss'],
})
export class InternshipDetailsComponent implements OnInit {
  internshipId!: string;
  internshipDetails!: Internship | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.internshipId = this.route.snapshot.paramMap.get('id')!;

    this.internshipDetails = MOCK_INTERNSHIPS.find(
      (i) => i.internshipId === this.internshipId
    );

    if (this.internshipDetails) {
      console.log('Internship found:', this.internshipDetails);
    } else {
      console.error('Internship not found!');
    }
  }

  getFormattedDate(date?: Date): string {
    if (!date) return 'Not available'; // Return a fallback string if the date is undefined
    
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
    const timeDifference = deadline.getTime() - currentDate.getTime();
    const daysRemaining = timeDifference / (1000 * 3600 * 24);
    return daysRemaining <= 10 && daysRemaining >= 0;
  }

  closeDetails() {
    this.router.navigate(['/internships']);
  }
}
