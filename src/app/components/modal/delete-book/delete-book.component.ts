import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BookService } from 'src/app/core/services/book/book.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {
  public deleteBookForm: FormGroup;
  bookId: string;
  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,) {

    this.bookId = data.id;
  }

  ngOnInit(): void {
    this.deleteBookForm = this.formBuilder.group({
      secret: ['', [Validators.required]],
    });
  }

  deleteBook(): void {
    if (this.deleteBookForm.valid) {
      this.bookService.deleteById(this.bookId, this.deleteBookForm.controls['secret'].value)
      .then(_ => {
        this.alertService.success('The book was removed from the library');
        this.dialogRef.close({ isDelete: true });
      }).catch((err) => {
        this.alertService.danger(err.error);
        this.dialogRef.close({ isDelete: false });
      })
    }
  }
}
