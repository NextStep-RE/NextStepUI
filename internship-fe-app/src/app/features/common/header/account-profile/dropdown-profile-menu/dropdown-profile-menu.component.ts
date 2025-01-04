import {
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserProfile } from '../../../../../core/models/userProfile.model';
import { IUserProfileState } from '../../../../../core/store/reducers/user-profiles.reducers';
import {
  SELECT_USER_PROFILES,
  SELECT_USER_PROFILE_ERROR,
} from '../../../../../core/store/selectors/user-profiles.selectors';
import { UPDATE_SELECTED_PROFILE_ROLE } from '../../../../../core/store/actions/user-profiles.actions';
import { LOAD_USER_PROFILES } from '../../../../../core/store/actions/user-profiles.actions';
import { UserInfo } from '../../../../../core/models/userInfo.model';
import { SELECT_USER_INFO } from '../../../../../core/store/selectors/userInfo.selectors';
import { LOAD_USER_INFO } from '../../../../../core/store/actions/userInfo.actions';
import { LOAD_PERSONAL_EVENTS } from '../../../../../core/store/actions/personal-event.actions';
import { EmployeeService } from '../../../../../core/services/employee.service';

@Component({
  selector: 'app-dropdown-profile-menu',
  templateUrl: './dropdown-profile-menu.component.html',
  styleUrl: './dropdown-profile-menu.component.scss',
})
export class DropdownProfileMenuComponent implements OnInit, OnDestroy {
  profiles$!: Observable<UserProfile[]>;
  profilesError$!: Observable<string>;
  selectedProfile$!: Observable<UserProfile | null>;
  profiles: UserProfile[] = [];
  isDropdownOpen: boolean = false;
  selectedProfile: UserProfile | null = null;
  userInfo$!: Observable<UserInfo | null>;
  private clickListener!: () => void;
  isSwitchPopupShown: boolean = false;

  constructor(
    private store: Store<IUserProfileState>,
    private elRef: ElementRef,
    private renderer: Renderer2,
    private destroyRef: DestroyRef,
    private employeeService: EmployeeService
  ) {
    this.profiles$ = this.store.select(SELECT_USER_PROFILES);
    this.profilesError$ = this.store.select(SELECT_USER_PROFILE_ERROR);
    this.userInfo$ = this.store.select(SELECT_USER_INFO);
  }

  ngOnInit(): void {
    this.loadUserProfiles();

    this.clickListener = this.renderer.listen(
      'document',
      'click',
      (event: Event) => {
        if (!this.elRef.nativeElement.contains(event.target)) {
          this.isDropdownOpen = false;
        }
      }
    );
  }

  private loadUserProfiles(): void {
    this.store.dispatch(LOAD_USER_PROFILES());

    this.profiles$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((userProfiles: UserProfile[]) => {
        this.profiles = userProfiles;
        if (userProfiles.length > 0) {
          this.selectedProfile = userProfiles[0];
          this.loadUserInfo(this.selectedProfile.id);
          this.updateSelectedProfileRole(this.selectedProfile.job.role);
        }
      });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectProfile(profile: UserProfile): void {
    this.selectedProfile = profile;
    this.isDropdownOpen = false;
    this.loadUserInfo(profile.id);
    this.loadPersonalEvents(profile.id);
    this.updateSelectedProfileRole(profile.job.role);
    this.isSwitchPopupShown = true;
    setTimeout(() => {
      this.isSwitchPopupShown = false;
    }, 3000);
    this.employeeService.setSelectedEmployeeId(profile.id);
  }

  loadUserInfo(profileId: number): void {
    this.store.dispatch(LOAD_USER_INFO({ id: profileId }));
  }

  loadPersonalEvents(id: number): void {
    this.store.dispatch(LOAD_PERSONAL_EVENTS({ employeeId: id }));
  }

  updateSelectedProfileRole(role: string): void {
    this.store.dispatch(UPDATE_SELECTED_PROFILE_ROLE({ role: role }));
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      this.clickListener();
    }
    this.loadUserProfiles();
  }
}
