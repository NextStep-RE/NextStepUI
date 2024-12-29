import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipBoxComponent } from './internship-box.component';

describe('InternshipBoxComponent', () => {
  let component: InternshipBoxComponent;
  let fixture: ComponentFixture<InternshipBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InternshipBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InternshipBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
