import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Internship } from '../../../core/models/internship.model';
import { loadInternshipById } from '../../../core/store/actions/internships.actions';
import { selectInternship } from '../../../core/store/selectors/internships.selector';
import { InternshipService } from '../../../core/services/internship.service'; // Importă serviciul pentru aplicații
import { AuthenticationService } from '../../../core/services/authentication.service'; // Importă serviciul de autentificare

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
    private store: Store,
    private internshipService: InternshipService, // Injectează serviciul InternshipService
    private authService: AuthenticationService // Injectează serviciul AuthenticationService
  ) {}

  ngOnInit() {
    this.internshipId = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(loadInternshipById({ id: +this.internshipId }));
    this.internshipDetails$ = this.store.select(selectInternship);
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

  applyLocally(internshipId: number): void {
    const userId = this.authService.getUserId(); // Obține userId din AuthenticationService
  
    if (userId === null) {
      alert('You must be logged in to apply locally.');
      return; // Nu trimitem aplicația dacă utilizatorul nu este logat
    }
  
    const applicationRequest = {
      internshipId,
      userId, // Include userId în cererea de aplicație
    };
  
    // Trimite cererea de aplicație locală
    this.internshipService.applyLocal(applicationRequest).subscribe(
      (response) => {
        console.log('Application submitted locally:', response);
  
        // Redirect către pagina de internship-uri aplicate
        this.router.navigate(['/applied-internships']);
      },
      (error) => {
        console.error('Error applying locally:', error);
      }
    );
  }
}
