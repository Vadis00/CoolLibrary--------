import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BookService } from 'src/app/core/services/book/book.service';
import { Book, BookPreview } from 'src/app/shared/models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  @Output() allBookUploaded = new EventEmitter<BookPreview[]>();
  books: BookPreview[];
  constructor(public bookService: BookService) {

   }

 async ngOnInit() {
    this.books = await this.bookService.getAll("title");
    console.log(this.books);
    this.allBookUploaded.emit(this.books)
    console.log('this.books');
  }

}
