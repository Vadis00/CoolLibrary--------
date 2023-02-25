import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BookPreview } from 'src/app/shared/models/book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() searchBook: BookPreview[];
  @Output() resultBook = new EventEmitter<BookPreview[]>();
  inputText = '';
  constructor() { }


  onSearchChange(event: any) {

    const result = this.searchBook.filter((book) =>
      book.title.toLowerCase().indexOf(event.toLowerCase()) > -1);

    this.resultBook.emit(result);

    console.log(result);
  }
  ngOnInit(): void {
  }

}
