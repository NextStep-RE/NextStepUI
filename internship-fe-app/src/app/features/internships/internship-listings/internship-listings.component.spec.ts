import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipListingsComponent } from './internship-listings.component';

describe('InternshipListingsComponent', () => {
  let component: InternshipListingsComponent;
  let fixture: ComponentFixture<InternshipListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipListingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternshipListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
