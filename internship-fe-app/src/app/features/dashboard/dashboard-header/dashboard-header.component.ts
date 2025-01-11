import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {
  constructor(private router: Router) {}
}
