import { Component, OnInit } from '@angular/core';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

@Component({
  selector: 'app-pdf-editor',
  templateUrl: './pdf-editor.component.html',
  styleUrls: ['./pdf-editor.component.scss'],
})
export class PdfEditorComponent  implements OnInit {
  pdfBytes: Uint8Array | null = null;

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // ✅ Embed a font
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // ✅ Edit PDF: Add text to first page
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      firstPage.drawText('Edited with Angular App!', {
        x: 50,
        y: 700,
        size: 20,
        font: font,
        color: rgb(1, 0, 0) // red color
      });

      this.pdfBytes = await pdfDoc.save();
    }
  }

  downloadPdf() {
    if (this.pdfBytes) {
      const blob = new Blob([this.pdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'edited.pdf';
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  constructor() { }

  ngOnInit() {}

}
