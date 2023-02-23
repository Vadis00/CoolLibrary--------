import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/services/book/book.service';
import { Book, BookPreview } from 'src/app/shared/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: BookPreview[];
  constructor(public bookService: BookService) {
    this.books = [
      {
        id: 1,
        title: 'test',
        author: 'test',
        rating: 2,
        reviewsNumber:3,
      },
      {
        id: 2,
        title: 'test2',
        author: 'test2',
        rating: 2,
        reviewsNumber:5,
      },
      {
        id: 3,
        title: 'test3',
        author: 'test3',
        rating: 2,
        reviewsNumber:7,
      }
    ];
   }

 async ngOnInit() {
    this.books = await this.bookService.getAll("title");
    console.log(this.books);
  }

}
