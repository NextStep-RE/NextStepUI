import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipWindowComponent } from './internship-window.component';

describe('InternshipWindowComponent', () => {
  let component: InternshipWindowComponent;
  let fixture: ComponentFixture<InternshipWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternshipWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
