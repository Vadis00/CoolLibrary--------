import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'ngx-alerts';
import { BookService } from 'src/app/core/services/book/book.service';
import { Book } from 'src/app/shared/models/book';
import { NewReview } from 'src/app/shared/models/review';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  public addReviewForm: FormGroup;
  book: Book;
  newReview: NewReview = {
    reviewer: '',
    message: ''
  }
  constructor(
    private dialogRef: MatDialogRef<AddReviewComponent>,
    private formBuilder: FormBuilder,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
  ) {
    this.book = data.book;
  }

  ngOnInit(): void {
    this.addReviewForm = this.formBuilder.group({
      reviewer: [this.newReview.reviewer, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      message: [this.newReview.message, [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
    });
  }

 async submit() {
  console.log(this.addReviewForm)
    this.addReviewForm.markAllAsTouched();
    if (this.addReviewForm.valid) {
      this.newReview.reviewer = this.addReviewForm.controls['reviewer'].value;
      this.newReview.message = this.addReviewForm.controls['message'].value;

      await this.bookService.addReview(this.book.id, this.newReview);

      this.alertService.success('The review has been sent!');
      this.dialogRef.close({ review: this.newReview });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
