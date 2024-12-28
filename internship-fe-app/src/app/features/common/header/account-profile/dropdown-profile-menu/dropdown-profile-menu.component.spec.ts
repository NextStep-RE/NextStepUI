import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownProfileMenuComponent } from './dropdown-profile-menu.component';

describe('DropdownProfileMenuComponent', () => {
  let component: DropdownProfileMenuComponent;
  let fixture: ComponentFixture<DropdownProfileMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownProfileMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownProfileMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
