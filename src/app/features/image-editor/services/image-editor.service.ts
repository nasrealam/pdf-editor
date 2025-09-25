import { Injectable } from '@angular/core';
import { fabric } from 'fabric';
import { ImageEdit, ImageEditorConfig } from '../models/image-editor.model';

@Injectable({
  providedIn: 'root'
})
export class ImageEditorService {
  private canvas: fabric.Canvas | null = null;

  initializeCanvas(canvasElement: HTMLCanvasElement, config: ImageEditorConfig) {
    this.canvas = new fabric.Canvas(canvasElement, {
      width: config.width,
      height: config.height,
      backgroundColor: config.backgroundColor
    });
    return this.canvas;
  }

  loadImage(url: string): Promise<fabric.Image> {
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(url, (img) => {
        if (this.canvas) {
          img.scaleToWidth(this.canvas.width!);
          this.canvas.add(img);
          this.canvas.renderAll();
          resolve(img);
        }
      }, (error) => {
        reject(error);
      });
    });
  }

  addText(text: string, options: ImageEdit['options'] = {}) {
    if (!this.canvas) return;

    const textObj = new fabric.Text(text, {
      left: 50,
      top: 50,
      fontSize: options.fontSize || 20,
      fontFamily: options.fontFamily || 'Arial',
      fill: options.fill || '#000000'
    });

    this.canvas.add(textObj);
    this.canvas.setActiveObject(textObj);
    this.canvas.renderAll();
  }

  addShape(type: 'rect' | 'circle', options: ImageEdit['options'] = {}) {
    if (!this.canvas) return;

    let shape: fabric.Object;

    switch (type) {
      case 'rect':
        shape = new fabric.Rect({
          left: 50,
          top: 50,
          width: 100,
          height: 100,
          fill: options.fill || 'transparent',
          stroke: options.stroke || '#000000',
          strokeWidth: options.strokeWidth || 2
        });
        break;

      case 'circle':
        shape = new fabric.Circle({
          left: 50,
          top: 50,
          radius: 50,
          fill: options.fill || 'transparent',
          stroke: options.stroke || '#000000',
          strokeWidth: options.strokeWidth || 2
        });
        break;

      default:
        return;
    }

    this.canvas.add(shape);
    this.canvas.setActiveObject(shape);
    this.canvas.renderAll();
  }

  enableDrawingMode(options: ImageEdit['options'] = {}) {
    if (!this.canvas) return;

    this.canvas.isDrawingMode = true;
    if (this.canvas.freeDrawingBrush) {
      this.canvas.freeDrawingBrush.color = options.stroke || '#000000';
      this.canvas.freeDrawingBrush.width = options.strokeWidth || 2;
    }
  }

  disableDrawingMode() {
    if (!this.canvas) return;
    this.canvas.isDrawingMode = false;
  }

  deleteSelectedObject() {
    if (!this.canvas) return;
    
    const activeObject = this.canvas.getActiveObject();
    if (activeObject) {
      this.canvas.remove(activeObject);
      this.canvas.renderAll();
    }
  }

  toDataURL(): string {
    if (!this.canvas) return '';
    return this.canvas.toDataURL();
  }

  dispose() {
    if (this.canvas) {
      this.canvas.dispose();
      this.canvas = null;
    }
  }
}