import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from 'src/app/core/services/book/book.service';
import { Book, NewBook } from 'src/app/shared/models/book';
import { BookViewComponent } from '../book-view/book-view.component';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {
  book: Book;
  public editBookForm: FormGroup;
  genres: string[];
  editBook: NewBook = {
    title: '',
    author: '',
    cover: '',
    content: '',
    genre: 'Newspaper'
  };

  selectedValue: string;
  selectedCar: string;

  foods: any[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  cars: any[] = [
    { value: 'volvo', viewValue: 'Volvo' },
    { value: 'saab', viewValue: 'Saab' },
    { value: 'mercedes', viewValue: 'Mercedes' },
  ];
  constructor(
    public bookService: BookService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BookViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadBook()

    this.editBookForm = this.formBuilder.group({
      title: [this.book.title, [Validators.required]],
      cover: [this.book.cover, Validators.required],
      genre: [this.book.genre, Validators.required],
      author: [this.book.author, Validators.required],
      content: [this.book.content, Validators.required],
    });
  }
  isload = false;
  async loadBook() {
    this.book = await this.bookService.getById(this.data.id);
    this.genres = await this.bookService.getGenres();
    this.isload = true;
  }


  async submit() {
    if (this.editBookForm.valid) {
      this.editBook = {
        id: this.book.id,
        title: this.editBookForm.controls['title'].value,
        author: this.editBookForm.controls['author'].value,
        cover: this.editBookForm.controls['cover'].value,
        content: this.editBookForm.controls['content'].value,
        genre: this.editBookForm.controls['genre'].value,
      }
      this.bookService.createOrUpdate(this.editBook).then((value => {
        console.log(value);
        this.dialogRef.close({ data: this.editBook });
      })).catch(err  =>{
        console.log(err.error.errors); // It goes here!

      })
    };
  }


  resetForm() {
    this.editBookForm.reset();
  }
  closeDialog() {
    this.dialogRef.close();
  }

}
