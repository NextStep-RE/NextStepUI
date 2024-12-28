import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DocumentLoaderPopupComponent } from '../document-loader-popup/document-loader-popup.component';

@Component({
  selector: 'app-document-loader',
  templateUrl: './document-loader.component.html',
  styleUrls: ['./document-loader.component.scss'],
})
export class DocumentLoaderComponent {
  @Output() files: File[] = [];
  confirmation: boolean = true;
  @Output() documentAdded = new EventEmitter<DocumentLoaderComponent>();

  constructor(private toastr: ToastrService, private dialog: MatDialog) {}
  onFileDropped(files: FileList): void {
    this.prepareFilesList(files);
  }

  fileBrowseHandler(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.prepareFilesList(input.files);
    }
  }

  prepareFilesList(files: FileList): void {
    Array.from(files).forEach((file) => {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      if (allowedTypes.includes(file.type)) {
        this.files.push(file);
        this.confirmationDialogDocument();
      } else {
        this.toastr.warning(
          'Only PDF and Word documents are allowed!',
          'Warning'
        );
      }
    });
  }

  // TODO: Modify this to use the newly created generic Dialog `ConfirmationOptionsDialog`
  confirmationDialogDocument(): void {
    this.dialog.open(DocumentLoaderPopupComponent, {
      width: '710px',
    });
    this.documentAdded.emit();
  }

  handleCancel(): void {
    this.confirmation = false;
  }
}
