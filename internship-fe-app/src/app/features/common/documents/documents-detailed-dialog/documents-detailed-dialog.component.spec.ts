import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsDetailedDialogComponent } from './documents-detailed-dialog.component';

describe('DocumentsDetailedDialogComponent', () => {
  let component: DocumentsDetailedDialogComponent;
  let fixture: ComponentFixture<DocumentsDetailedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentsDetailedDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentsDetailedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
