import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'pdf-editor',
    loadComponent: () => import('./components/pdf-editor/pdf-editor.component').then((m) => m.PdfEditorComponent),
  },
  {
    path: 'image-editor',
    loadComponent: () => import('./components/image-editor/image-editor.component').then((m) => m.ImageEditorComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
