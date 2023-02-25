import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book, BookPreview } from 'src/app/shared/models/book';
import { BookViewComponent } from '../modal/book-view/book-view.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: BookPreview;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  bookView() {
    this.dialog.open(BookViewComponent, {
      data: { id: this.book.id }

    });
  }
}
