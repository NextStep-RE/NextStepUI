import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewChecked {
  title = 'hr-management-fe-app';
  scrollable: boolean = false;
 
  constructor(private cdr: ChangeDetectorRef) {}
 
  ngAfterViewChecked(): void {
    this.scrollable = this.isScrollable();
    this.cdr.detectChanges();
  }
 
  isScrollable(): boolean {
    return document.body.scrollHeight > window.innerHeight;
  }
}
