import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { ADD_DOCUMENT } from '../../store/actions/documents.actions';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

@Component({
  selector: 'app-dnd',
  templateUrl: './dnd.component.html',
  styleUrl: './dnd.component.scss',
})
export class DndComponent {
  @ViewChild('fileInput', { static: false }) fileDropEl!: ElementRef;
  @Output() onSaveClick = new EventEmitter<void>();

  allowedFileTypes = ALLOWED_FILE_TYPES;
  files: File[] = [];
  id!: number;

  constructor(
    private toastr: ToastrService,
    private store: Store,
    private route: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {}

  onFileDropped(files: FileList) {
    const fileArray: File[] = Array.from(files);

    this.prepareFilesList(fileArray);
  }

  fileBrowseHandler(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input && input.files) {
      const fileArray: File[] = Array.from(input.files);
      const invalidFiles = fileArray.filter(
        (file) => !this.allowedFileTypes.includes(file.type)
      );

      if (invalidFiles.length > 0) {
        this.toastr.error('File type not allowed!');
      } else {
        this.toastr.success('File successfully uploaded!');
        this.prepareFilesList(fileArray);
      }
    }
  }

  uploadFiles(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      }
    }, 1000);
  }

  prepareFilesList(files: File[]) {
    this.files = [];

    for (const file of files) {
      this.files.push(file);
    }

    this.fileDropEl.nativeElement.value = '';

    this.uploadFiles(0);
  }

  onAddDocument(file: File[]): void {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params: Params) => {
        this.id = +params['id'];
      });

    this.store.dispatch(ADD_DOCUMENT({ customerId: this.id, document: file }));
  }

  onDocumentUpload(): void {
    this.onSaveClick.emit();
  }

  onSaveButtonClick(): void {
    this.onDocumentUpload();
    this.onAddDocument(this.files);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}
