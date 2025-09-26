import { Injectable } from '@angular/core';
import { createWorker, Worker, PSM } from 'tesseract.js';
import { BehaviorSubject, Observable } from 'rxjs';

export interface OcrProgress {
  status: string;
  progress: number;
}

@Injectable({
  providedIn: 'root'
})
export class OcrService {
  private worker: Worker | null = null;
  private progressSubject = new BehaviorSubject<OcrProgress>({ status: '', progress: 0 });
  progress$ = this.progressSubject.asObservable();

  async initialize(): Promise<void> {
    if (!this.worker) {
      this.worker = await createWorker({
        logger: progress => {
          this.progressSubject.next({
            status: progress.status,
            progress: progress.progress * 100
          });
        }
      });
      
      await this.worker.loadLanguage('eng');
      await this.worker.initialize('eng');
      await this.worker.setParameters({
        tessedit_pageseg_mode: PSM.AUTO
      });
    }
  }

  async extractText(imageData: string | Blob): Promise<string> {
    if (!this.worker) {
      await this.initialize();
    }

    if (!this.worker) {
      throw new Error('OCR worker initialization failed');
    }

    const result = await this.worker.recognize(imageData);
    return result.data.text;
  }

  async dispose(): Promise<void> {
    if (this.worker) {
      await this.worker.terminate();
      this.worker = null;
    }
  }
}