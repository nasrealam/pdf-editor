export interface PdfEdit {
  type: 'text' | 'image' | 'shape';
  content: string;
  position: {
    x: number;
    y: number;
    pageIndex: number;
  };
  style?: {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    width?: number;
    height?: number;
  };
}

export interface PdfPage {
  pageNumber: number;
  width: number;
  height: number;
}