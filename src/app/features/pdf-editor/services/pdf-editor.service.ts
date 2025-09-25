import { Injectable } from '@angular/core';
import { PDFDocument, rgb } from 'pdf-lib';
import { PdfEdit } from '../models/pdf.model';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfEditorService {
  constructor() {}

  async loadPDF(pdfData: ArrayBuffer): Promise<PDFDocument> {
    return await PDFDocument.load(pdfData);
  }

  async applyEdits(pdfDoc: PDFDocument, edits: PdfEdit[]): Promise<ArrayBuffer> {
    for (const edit of edits) {
      const page = pdfDoc.getPages()[edit.position.pageIndex];
      
      switch (edit.type) {
        case 'text':
          const { width, height } = page.getSize();
          page.drawText(edit.content, {
            x: edit.position.x,
            y: height - edit.position.y, // PDF coordinates start from bottom-left
            size: edit.style?.fontSize || 12,
            color: rgb(0, 0, 0), // Default black color
          });
          break;
          
        case 'image':
          // Handle image insertion
          break;
          
        case 'shape':
          // Handle shape drawing
          break;
      }
    }
    
    return await pdfDoc.save();
  }

  getPage(pdfDoc: PDFDocument, pageIndex: number): Observable<Uint8Array> {
    return from(this.getPageData(pdfDoc, pageIndex));
  }

  private async getPageData(pdfDoc: PDFDocument, pageIndex: number): Promise<Uint8Array> {
    const newPdfDoc = await PDFDocument.create();
    const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [pageIndex]);
    newPdfDoc.addPage(copiedPage);
    return await newPdfDoc.save();
  }
}