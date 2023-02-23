export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  content: string;
  rating: number;
}

export interface BookPreview {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviewsNumber: number;
}

export interface NewBook {
  id: number;
  title: string;
  author: string;
  cover: string;
  content: string;
  genre: string;
}

