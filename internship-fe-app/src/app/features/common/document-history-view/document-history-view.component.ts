import { Component } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-document-history-view',
  templateUrl: './document-history-view.component.html',
  styleUrl: './document-history-view.component.scss'
})
export class DocumentHistoryViewComponent {
  constructor(private commonService: CommonService){}

  getAllDocuments(){
    return this.commonService.getAllDocuments();
  }
}