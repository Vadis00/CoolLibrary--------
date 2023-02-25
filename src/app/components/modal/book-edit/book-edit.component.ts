import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BookService } from 'src/app/core/services/book/book.service';
import { Book, NewBook } from 'src/app/shared/models/book';
import { BookViewComponent } from '../book-view/book-view.component';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  isload = false;
  book: Book;
  public editBookForm: FormGroup;
  genres: string[];
  editBook: NewBook = {
    title: '',
    author: '',
    cover: '',
    content: '',
    genre: ''
  };

  constructor(
    public bookService: BookService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BookViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    private ngxService: NgxUiLoaderService,
  ) { }

  async ngOnInit(): Promise<void> {

    await this.loadBook()

    this.editBookForm = this.formBuilder.group({
      title: [this.book.title, [Validators.required,Validators.minLength(1), Validators.maxLength(200)]],
      cover: [this.book.cover, [Validators.required,Validators.minLength(1), Validators.maxLength(200)]],
      genre: [this.book.genre, [Validators.required,Validators.minLength(1), Validators.maxLength(100)]],
      author: [this.book.author, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      content: [this.book.content, [Validators.required]],
    });
  }

  async loadBook() {
    this.ngxService.startLoader("loader-01");
    this.book = await this.bookService.getById(this.data.id);
    this.genres = await this.bookService.getGenres();
    this.ngxService.stopLoader("loader-01");
    this.isload = true;
  }

  async submit() {
    if (this.editBookForm.valid) {
      this.ngxService.startLoader("loader-01");
      this.editBook = {
        id: this.book.id,
        title: this.editBookForm.controls['title'].value,
        author: this.editBookForm.controls['author'].value,
        cover: this.editBookForm.controls['cover'].value,
        content: this.editBookForm.controls['content'].value,
        genre: this.editBookForm.controls['genre'].value,
      }
      this.bookService.createOrUpdate(this.editBook).then((value => {
        this.alertService.success("Book information has been updated!");
        this.ngxService.stopLoader("loader-01");
        this.dialogRef.close({ data: this.editBook });
      })).catch(err  =>{
        this.ngxService.stopLoader("loader-01");
        this.alertService.warning(JSON.stringify(err.error.errors));
      })
    };
  }

  resetForm() {
    this.editBookForm.reset();
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
