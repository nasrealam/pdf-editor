import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImageEditorRoutingModule } from './image-editor-routing.module';
import { ImageEditorComponent } from './components/image-editor.component';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ImageEditorRoutingModule,
    SharedModule,
    ImageEditorComponent
  ]
})
export class ImageEditorModule { }