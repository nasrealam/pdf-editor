import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PdfEditorRoutingModule } from './pdf-editor-routing.module';
import { PdfEditorComponent } from './components/pdf-editor.component';
import { SharedModule } from '../../shared/shared-module';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PdfEditorRoutingModule,
    SharedModule,
    PdfViewerModule,
    PdfEditorComponent
  ]
})
export class PdfEditorModule { }