import { Component, Input, OnInit } from '@angular/core';
import { Book, BookPreview } from 'src/app/shared/models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  @Input() book: BookPreview;
  constructor() { }

  ngOnInit(): void {
  }

}
