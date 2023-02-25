import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book, BookPreview } from 'src/app/shared/models/book';
import { BookEditComponent } from '../modal/book-edit/book-edit.component';
import { BookViewComponent } from '../modal/book-view/book-view.component';
import { DeleteBookComponent } from '../modal/delete-book/delete-book.component';

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

  bookView(): void {
    this.dialog.open(BookViewComponent, {
      data: { id: this.book.id }
    });
  }

  bookEdit() : void {
    this.dialog.open(BookEditComponent, {
      data: { id: this.book.id }
    }).afterClosed()
    .subscribe(response => {
      if(response){
        this.book.title = response.data.title
      }
    });;
  }

  bookDelete(): void {
    this.dialog.open(DeleteBookComponent, {
      data: { id: this.book.id }
    }).afterClosed()
    .subscribe(response => {
      if(response){
        this.book.title = response.data.title
      }
    });;
  }
}
