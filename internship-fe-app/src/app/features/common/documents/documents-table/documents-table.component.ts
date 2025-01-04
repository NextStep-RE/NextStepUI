import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../../../../core/models/document.model';
import { IDocumentState } from '../../../../core/store/reducers/documents.reducer';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import {
  SELECT_DOCUMENT,
  SELECT_DOCUMENTS_ERROR,
} from '../../../../core/store/selectors/documents.selector';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentsDetailedDialogComponent } from '../documents-detailed-dialog/documents-detailed-dialog.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  DELETE_DOCUMENT,
  LOAD_DOCUMENTS_DATA,
} from '../../../../core/store/actions/documents.actions';

@Component({
  selector: 'app-documents-table',
  templateUrl: './documents-table.component.html',
  styleUrl: './documents-table.component.scss',
})
export class DocumentsTableComponent implements OnInit {
  @Input() customerId!: number;
  documents$!: Observable<Document[]>;
  documentsError$!: Observable<string>;

  dataSource = new MatTableDataSource<Document>();
  showHeader: boolean = false;

  constructor(
    private store: Store<IDocumentState>,
    public matDialog: MatDialog,
    private router: Router
  ) {
    this.documents$ = this.store.select(SELECT_DOCUMENT);
    this.documentsError$ = this.store.select(SELECT_DOCUMENTS_ERROR);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showHeader = this.router.url.includes('/addCustomer');
      });

    this.documents$.subscribe((documents) => {
      this.dataSource.data = documents;
    });

    if (this.customerId) {
      this.loadDocuments(this.customerId);
    }
  }

  private loadDocuments(customerId: number): void {
    this.store.dispatch(LOAD_DOCUMENTS_DATA({ customerId }));
  }

  onDownloadDocument(document: Document): void {
    let mimeType = 'application/pdf';

    switch (document.type) {
      case 'application/pdf':
        mimeType = 'application/pdf';
        break;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        mimeType =
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      default:
        console.error('Unsupported document type');
        return;
    }

    const blob = new Blob([document.file], { type: mimeType });

    const url = window.URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = document.name;
    window.document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    window.document.body.removeChild(a);
  }

  onViewDocument(document: Document): void {
    this.matDialog.open(DocumentsDetailedDialogComponent, {
      width: 'fit-content',
      height: '80%',
      data: document,
    });
  }

  onDeleteDocument(customerId: number, document: Document): void {
    if (
      confirm(`Are you sure you want to delete the document: ${document.name}`)
    ) {
      this.store.dispatch(
        DELETE_DOCUMENT({ customerId, documentId: document.id })
      );
    }
  }
}
