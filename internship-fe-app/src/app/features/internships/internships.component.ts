import { Component } from '@angular/core';

@Component({
  selector: 'app-internships',
  templateUrl: './internships.component.html',
  styleUrl: './internships.component.scss'
})
export class InternshipsComponent {
  selectedInternshipId: number | null = null;

  viewDetails(internshipId: number): void {
    this.selectedInternshipId = internshipId;
  }
}
