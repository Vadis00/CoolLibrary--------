import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/core/services/book/book.service';
import { BookPreview } from 'src/app/shared/models/book';
import { BookEditComponent } from '../modal/book-edit/book-edit.component';
import { BookViewComponent } from '../modal/book-view/book-view.component';
import { DeleteBookComponent } from '../modal/delete-book/delete-book.component';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  cover: File;
  @Input() book: BookPreview;
  transform: number;
  @Output() remove = new EventEmitter<BookPreview>();

  constructor(
    public bookService: BookService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.transform = Math.random() * (2 - -2) + 2;
    if (Math.random() < 0.5)
      this.transform *= -1;

    this.cover = new File([this.book.cover], 'cover', { type: `image/png` });
  }

  bookView(): void {
    this.dialog.open(BookViewComponent, {
      data: { id: this.book.id }
    });
  }

  bookEdit(): void {
    this.dialog.open(BookEditComponent, {
      data: { id: this.book.id }
    }).afterClosed()
      .subscribe(response => {
        if (response) {
          this.book.title = response.data.title;
          this.book.cover = response.data.cover;
        }
      });;
  }

  bookDelete(): void {
    this.dialog.open(DeleteBookComponent, {
      data: { book: this.book }
    }).afterClosed()
      .subscribe(response => {
        if (response.isDelete) {
          this.remove.emit(this.book);
        }
      });
  }

  addOrUpdateBookRate(rate: number) {
    this.bookService.addRating(this.book.id, { score: rate })
  }

}
