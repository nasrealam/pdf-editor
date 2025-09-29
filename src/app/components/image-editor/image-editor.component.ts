import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';


@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss']
})
export class ImageEditorComponent implements OnInit {
  canvas!: fabric.Canvas;
  imageLoaded = false;

  ngOnInit(): void {
    // Initialize fabric canvas
    this.canvas = new fabric.Canvas('canvas', {
      width: 500,
      height: 400,
      backgroundColor: '#fff'
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const url = e.target?.result as string;
        // Load image on fabric canvas
        fabric.Image.fromURL(
          url,
          (img: fabric.Image) => {
            this.canvas.clear();
            img.scaleToWidth(500);
            this.canvas.add(img);
            this.canvas.sendToBack(img);
            this.imageLoaded = true;
          },
          { crossOrigin: 'anonymous' } // optional LoadImageOptions
        );
      };
      reader.readAsDataURL(file);
    }
  }

  addText(): void {
    if (!this.imageLoaded) return;

    const text = new fabric.Textbox('Edit Me!', {
      left: 50,
      top: 50,
      fontSize: 20,
      fill: 'red',
      editable: true
    });

    this.canvas.add(text);
  }

  downloadImage(): void {
    if (!this.imageLoaded) return;

    const dataURL = this.canvas.toDataURL({
      format: 'png',
      quality: 1
    });

    const a = document.createElement('a');
    a.href = dataURL;
    a.download = 'edited-image.png';
    a.click();
  }

  clearCanvas(): void {
    this.canvas.clear();
    this.imageLoaded = false;
  }
}
