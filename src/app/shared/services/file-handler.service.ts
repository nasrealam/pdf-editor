import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileHandlerService {
  constructor() {}

  readFile(file: File): Observable<ArrayBuffer> {
    return from(new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    }));
  }

  downloadFile(content: Blob | ArrayBuffer, filename: string): void {
    const blob = content instanceof Blob ? content : new Blob([content]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  validateFileType(file: File, allowedTypes: string[]): boolean {
    return allowedTypes.some(type => file.type.toLowerCase().includes(type.toLowerCase()));
  }
}
