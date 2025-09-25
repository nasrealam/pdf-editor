import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgxFileDropModule } from 'ngx-file-drop';
import { RouterModule } from '@angular/router';
import { FileHandlerService } from './services/file-handler.service';
import { OcrService } from './services/ocr.service';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    NgxFileDropModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    IonicModule,
    RouterModule,
    NgxFileDropModule,
    FileUploadComponent
  ],
  providers: [
    FileHandlerService,
    OcrService
  ]
})
export class SharedModule { }