import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrl: './customer-search.component.scss',
})
export class CustomerSearchComponent {
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  inputValue: string = '';

  constructor(private store: Store) {}

  onSearch(): void {
    this.searchValue.emit(this.inputValue);
  }
}
