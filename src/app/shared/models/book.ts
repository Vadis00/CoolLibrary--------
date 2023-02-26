import { Review } from 'src/app/shared/models/review';
export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  content: string;
  genre: string;
  rating: number;
  reviews?: Review[];
}

export interface BookPreview {
  id: number;
  title: string;
  author: string;
  rating: number;
  reviewsNumber: number;
  cover: string;
}

export interface NewBook {
  id?: number;
  title: string;
  author: string;
  cover: string;
  content: string;
  genre: string;
}

