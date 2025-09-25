import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ImageEditorService } from '../services/image-editor.service';
import { ImageEdit } from '../models/image-editor.model';
import { FileUploadComponent } from '../../../shared/components/file-upload/file-upload.component';
import { FileHandlerService } from '../../../shared/services/file-handler.service';
import { OcrService } from '../../../shared/services/ocr.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-editor',
  standalone: true,
  imports: [CommonModule, IonicModule, FileUploadComponent],
  template: `
    <ion-content>
      <div class="editor-container">
        <div class="toolbar">
          <ion-button (click)="addText()">Add Text</ion-button>
          <ion-button (click)="addRect()">Add Rectangle</ion-button>
          <ion-button (click)="addCircle()">Add Circle</ion-button>
          <ion-button (click)="toggleDrawing()">
            {{ isDrawing ? 'Stop Drawing' : 'Start Drawing' }}
          </ion-button>
          <ion-button (click)="deleteSelected()">Delete</ion-button>
          <ion-button (click)="extractText()">Extract Text</ion-button>
          <ion-button (click)="downloadImage()">Download</ion-button>
        </div>
        <div class="canvas-container">
          <canvas #canvas></canvas>
        </div>
        <ion-progress-bar
          *ngIf="ocrProgress$ | async as progress"
          [value]="progress.progress / 100"
          [type]="progress.progress < 100 ? 'indeterminate' : 'determinate'"
        ></ion-progress-bar>
      </div>
    </ion-content>
  `,
  styles: [`
    .editor-container {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    
    .toolbar {
      padding: 1rem;
      background: var(--ion-color-light);
      border-bottom: 1px solid var(--ion-color-medium);
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    
    .canvas-container {
      flex: 1;
      overflow: auto;
      padding: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--ion-color-medium-tint);
    }
  `]
})
export class ImageEditorComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  isDrawing = false;

  ocrProgress$ = this.ocrService.progress$;
  private progressSubscription: Subscription | null = null;

  constructor(
    private imageEditorService: ImageEditorService,
    private fileHandler: FileHandlerService,
    private ocrService: OcrService
  ) {}

  ngOnInit() {
    this.initializeCanvas();
  }

  ngOnDestroy() {
    this.imageEditorService.dispose();
    this.ocrService.dispose();
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }

  private initializeCanvas() {
    this.imageEditorService.initializeCanvas(this.canvasRef.nativeElement, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff'
    });
  }

  async handleFileUpload(file: File) {
    const url = URL.createObjectURL(file);
    await this.imageEditorService.loadImage(url);
    URL.revokeObjectURL(url);
  }

  addText() {
    this.imageEditorService.addText('Double click to edit', {
      fontSize: 24,
      fill: '#000000'
    });
  }

  addRect() {
    this.imageEditorService.addShape('rect', {
      stroke: '#000000',
      strokeWidth: 2
    });
  }

  addCircle() {
    this.imageEditorService.addShape('circle', {
      stroke: '#000000',
      strokeWidth: 2
    });
  }

  toggleDrawing() {
    this.isDrawing = !this.isDrawing;
    if (this.isDrawing) {
      this.imageEditorService.enableDrawingMode({
        stroke: '#000000',
        strokeWidth: 2
      });
    } else {
      this.imageEditorService.disableDrawingMode();
    }
  }

  deleteSelected() {
    this.imageEditorService.deleteSelectedObject();
  }

  async extractText() {
    const dataUrl = this.imageEditorService.toDataURL();
    try {
      const text = await this.ocrService.extractText(dataUrl);
      this.imageEditorService.addText(text, {
        fontSize: 16,
        fill: '#000000'
      });
    } catch (error) {
      console.error('OCR failed:', error);
    }
  }

  downloadImage() {
    const dataUrl = this.imageEditorService.toDataURL();
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = dataUrl;
    link.click();
  }

  ngOnDestroy() {
    this.imageEditorService.dispose();
    if (this.progressSubscription) {
      this.progressSubscription.unsubscribe();
    }
  }
}