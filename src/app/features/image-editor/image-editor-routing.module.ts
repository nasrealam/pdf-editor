import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageEditorComponent } from './components/image-editor.component';

const routes: Routes = [
  {
    path: '',
    component: ImageEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageEditorRoutingModule { }