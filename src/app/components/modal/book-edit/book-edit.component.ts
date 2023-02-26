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
  base64textString: string;
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
      title: [this.book.title, [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      cover: [this.book.cover, [Validators.required, Validators.minLength(1)]],
      genre: [this.book.genre, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      author: [this.book.author, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      content: [this.book.content, [Validators.required]],
    });
  }

  async loadBook() {
    this.ngxService.startLoader("loader-book-edit");
    this.book = await this.bookService.getById(this.data.id);
    this.genres = await this.bookService.getGenres();
    this.ngxService.stopLoader("loader-book-edit");
    this.isload = true;
  }

  async submit() {
    if (this.editBookForm.valid) {
      this.ngxService.startLoader("loader-book-edit");
      this.editBook = {
        id: this.book.id,
        title: this.editBookForm.controls['title'].value,
        author: this.editBookForm.controls['author'].value,
        cover: this.base64textString ? this.base64textString : this.book.cover,
        content: this.editBookForm.controls['content'].value,
        genre: this.editBookForm.controls['genre'].value,
      }
      this.bookService.createOrUpdate(this.editBook).then((value => {
        this.alertService.success("Book information has been updated!");
        this.ngxService.stopLoader("loader-book-edit");
        this.dialogRef.close({ data: this.editBook });
      })).catch(err => {
        this.ngxService.stopLoader("loader-book-edit");
        this.alertService.warning(JSON.stringify(err.error.errors));
      })
    };
  }

  onUploadChange(evt: any) {
    const file = evt.target.files[0];
    if (file) {
      (this.editBookForm.controls['cover']).patchValue(evt.target.files[0].name)
      this.ngxService.startLoader("add-book-loader");
      const reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  private handleReaderLoaded(e: any) {
    this.base64textString = ('data:image/png;base64,' + btoa(e.target.result));
    this.ngxService.stopLoader("add-book-loader");
  }

  resetForm() {
    this.editBookForm.reset();
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
