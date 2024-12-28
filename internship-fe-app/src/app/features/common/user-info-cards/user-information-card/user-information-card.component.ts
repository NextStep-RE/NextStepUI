import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../../../core/models/employee.model';
import { Observable } from 'rxjs';
import { UserInfo } from '../../../../core/models/userInfo.model';
import { Store } from '@ngrx/store';
import { LOAD_USER_INFO } from '../../../customers/store/actions/userInfo.actions';
import {
  SELECT_USER_INFO,
  SELECT_USER_INFO_ERROR,
  SELECT_USER_INFO_LOADING,
} from '../../../customers/store/selectors/userInfo.selectors';
import { EmployeeService } from '../../../../core/services/employee.service';

@Component({
  selector: 'app-user-information-card',
  templateUrl: './user-information-card.component.html',
  styleUrl: './user-information-card.component.scss',
})
export class UserInformationCardComponent implements OnInit {
  @Input() leaveDaysLeft!: number;
  userInfo$!: Observable<UserInfo | null>;
  isLoading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(private store: Store, private employeeService: EmployeeService) {
    this.userInfo$ = this.store.select(SELECT_USER_INFO);
    this.isLoading$ = this.store.select(SELECT_USER_INFO_LOADING);
    this.error$ = this.store.select(SELECT_USER_INFO_ERROR);
  }

  ngOnInit(): void {
      this.loadUserInfo();
  }

  private loadUserInfo(): void {
    this.store.dispatch(
      LOAD_USER_INFO({
        id: this.employeeService.getSelectedEmployeeId()
      })
    );
  }
}
