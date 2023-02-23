import { Component } from '@angular/core';
import { NewBook } from './shared/models/book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CoolLibrary';
  books: NewBook[];

  pushNewBook(book: NewBook) {
    this.books.push(book);
  }

  allBookUploaded(books: any) {
    this.books = books;
  }
}
