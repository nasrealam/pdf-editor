import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { FileHandlerService } from './services/file-handler';

@NgModule({
  declarations: [
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule
  ],
  exports: [
    FileUploadComponent,
    NgxFileDropModule
  ],
  providers: [
    FileHandlerService
  ]
})
export class SharedModule { }
