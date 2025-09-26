import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
<<<<<<< HEAD
    loadComponent: () => import('./components/home/home.page').then((m) => m.HomePage),
=======
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'pdf-editor',
    loadComponent: () => import('./features/pdf-editor/components/pdf-editor.component')
      .then(m => m.PdfEditorComponent)
  },
  {
    path: 'image-editor',
    loadComponent: () => import('./features/image-editor/components/image-editor.component')
      .then(m => m.ImageEditorComponent)
>>>>>>> origin/main
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
