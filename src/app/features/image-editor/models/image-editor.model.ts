export interface ImageEdit {
  type: 'text' | 'shape' | 'draw';
  options?: {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    fontSize?: number;
    fontFamily?: string;
  };
}

export interface ImageEditorConfig {
  width: number;
  height: number;
  backgroundColor: string;
}