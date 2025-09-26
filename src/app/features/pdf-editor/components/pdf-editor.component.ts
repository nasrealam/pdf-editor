import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfEditorService } from '../services/pdf-editor.service';
import { FileHandlerService } from '../../../shared/services/file-handler.service';
import { PdfEdit } from '../models/pdf.model';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-pdf-editor',
  standalone: true,
  imports: [CommonModule, IonicModule, PdfViewerModule],
  template: `
    <ion-content>
      <div class="editor-container">
        <div class="toolbar">
          <ion-button (click)="addText()">Add Text</ion-button>
          <ion-button (click)="downloadPdf()">Download</ion-button>
        </div>
        <div class="viewer-container">
          <pdf-viewer
            [src]="pdfSrc"
            [render-text]="true"
            [original-size]="false"
            [show-all]="true"
            (page-rendered)="pageRendered($event)"
            (click)="handlePageClick($event)"
          ></pdf-viewer>
        </div>
      </div>
    </ion-content>
  `,
  styles: [`
    .editor-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .toolbar {
      padding: 1rem;
      background: var(--ion-color-light);
      border-bottom: 1px solid var(--ion-color-medium);
    }
    
    .viewer-container {
      flex: 1;
      overflow: auto;
      padding: 1rem;
      
      ::ng-deep {
        pdf-viewer {
          display: block;
          height: 100%;
        }
      }
    }
  `]
})
export class PdfEditorComponent implements OnInit {
  pdfSrc: Uint8Array | undefined;
  pdfDoc: PDFDocument | undefined;
  edits: PdfEdit[] = [];
  currentPage = 0;

  constructor(
    private pdfEditorService: PdfEditorService,
    private fileHandler: FileHandlerService
  ) {}

  ngOnInit() {
    // Initialize if needed
  }

  async loadPdf(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    this.pdfDoc = await this.pdfEditorService.loadPDF(arrayBuffer);
    this.pdfSrc = await this.pdfDoc.save();
  }

  pageRendered(event: any) {
    this.currentPage = event.pageNumber - 1;
  }

  async handlePageClick(event: MouseEvent) {
    if (!this.pdfDoc) return;
    
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Add text at click position
    this.edits.push({
      type: 'text',
      content: 'Sample Text',
      position: {
        x,
        y,
        pageIndex: this.currentPage
      },
      style: {
        fontSize: 12,
        color: '#000000'
      }
    });

    // Apply edits and update view
    const edited = await this.pdfEditorService.applyEdits(this.pdfDoc, this.edits);
    this.pdfSrc = new Uint8Array(edited);
  }

  addText() {
    // Implementation for adding text
  }

  async downloadPdf() {
    if (!this.pdfDoc) return;
    
    const edited = await this.pdfEditorService.applyEdits(this.pdfDoc, this.edits);
    this.fileHandler.downloadFile(edited, 'edited-document.pdf');
  }
}