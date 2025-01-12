import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-applied-internships',
  templateUrl: './applied-internships.component.html',
  styleUrls: ['./applied-internships.component.scss'],
})
export class AppliedInternshipsComponent implements OnInit, OnDestroy {
  userApplications: any[] = [];
  loading: boolean = false;
  error: any = null;
  isLoggedIn: boolean = false; // Adăugăm statusul autentificării
  private authSubscription: Subscription | undefined;

  constructor(
    private userService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    // Verificăm dacă utilizatorul este autentificat
    this.authSubscription = this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.getUserApplications(); // Dacă utilizatorul este logat, preluăm aplicațiile
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe(); // Dezabonăm pentru a evita scurgerile de memorie
    }
  }

  getUserApplications(): void {
    if (!this.isLoggedIn) return; // Dacă nu este logat, nu încărcăm aplicațiile
    this.loading = true;
    this.userService
      .getUserById('1') // Folosește ID-ul corect al utilizatorului
      .pipe(
        catchError((err) => {
          console.error('Error fetching user data:', err);
          this.error = err;
          return of(null);
        })
      )
      .subscribe({
        next: (user) => {
          this.userApplications = user?.applications || [];
          this.loading = false;
        },
        error: (err) => {
          this.error = err;
          this.loading = false;
        },
      });
  }

  isDeadlineApproaching(deadline: string): boolean {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    return timeDiff <= 7 * 24 * 60 * 60 * 1000; // Mai puțin de 7 zile
  }

  formatStatus(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'Pending';
      case 'CV_IN_REVIEW':
        return 'CV in Review';
      case 'UPCOMING_INTERVIEW':
        return 'Upcoming Interview';
      case 'ACCEPTED':
        return 'Accepted';
      default:
        return status;
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-500';
      case 'CV_IN_REVIEW':
        return 'text-blue-500';
      case 'UPCOMING_INTERVIEW':
        return 'text-purple-500';
      case 'ACCEPTED':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  }
}
