import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
  booksSearch: BookPreview[];
  selectedBooksSorted: string = 'title';
  selectedRecomendedBooks: string;
  genres: string[];

  booksSorted: any[] = [
    { value: 'title', viewValue: 'Sorted by Title' },
    { value: 'author', viewValue: 'Sorted by Author' },
  ];

  constructor(public bookService: BookService, private ngxService: NgxUiLoaderService,) {
  }

  async ngOnInit() {
    this.ngxService.startLoader("loader-01");
    this.books = await this.bookService.getAll("title");
    this.genres = await this.bookService.getGenres();
    this.booksSearch = this.books;
    this.allBookUploaded.emit(this.books);
    this.ngxService.stopLoader("loader-01");
  }

  async getAllBooks(sorted: string) {
    this.selectedRecomendedBooks = ''
    this.books = await this.bookService.getAll(sorted);
    this.booksSearch = this.books;
    this.allBookUploaded.emit(this.books);
  }

  async getTopRate(sorted: string) {
    this.selectedBooksSorted = '';
    this.books = await this.bookService.getTopRate(sorted);
    this.booksSearch = this.books;
    this.allBookUploaded.emit(this.books);
  }

  updateBooks(books: BookPreview[]) {
    this.books = books;
  }

  removeBook(book: BookPreview) {
    const index = this.books.indexOf(book);
    const indexBooksSearch = this.booksSearch.indexOf(book);

  /*   this.booksSearch.splice(indexBooksSearch, 1); */
    this.books.splice(index, 1);
  }
}
