import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfEditorComponent } from './components/pdf-editor.component';

const routes: Routes = [
  {
    path: '',
    component: PdfEditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfEditorRoutingModule { }