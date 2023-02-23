import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/core/services/book/book.service';
import { NewBook } from 'src/app/shared/models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  @Output() newBookEvent = new EventEmitter<NewBook>();

  public newBookForm: FormGroup;
  newBook: NewBook = {
    title: '',
    author: '',
    cover: '',
    content: '',
    genre: ''
  };

  constructor(private formBuilder: FormBuilder, private bookService: BookService) {

  }

  ngOnInit(): void {
    this.newBookForm = this.formBuilder.group({
      title: [this.newBook.title, [Validators.required]],
      cover: [this.newBook.cover, Validators.required],
      genre: [this.newBook.genre, Validators.required],
      author: [this.newBook.author, Validators.required],
      content: [this.newBook.content, Validators.required],
    });

  }

  async submit() {
    this.newBookForm.markAllAsTouched();
    if (this.newBookForm.valid) {
      this.newBook = {
        title: this.newBookForm.controls['title'].value,
        author: this.newBookForm.controls['author'].value,
        cover: this.newBookForm.controls['cover'].value,
        content: this.newBookForm.controls['content'].value,
        genre: this.newBookForm.controls['genre'].value,
      }
      const bookId = await this.bookService.createOrUpdate(this.newBook);

      if (bookId) {
        this.newBookEvent.emit(this.newBook);
        this.newBookForm.reset();

      }
    }

  }

  resetForm() {
    this.newBookForm.reset();

  }

}
