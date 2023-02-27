import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BookService } from 'src/app/core/services/book/book.service';
import { Book } from 'src/app/shared/models/book';
import { Review } from 'src/app/shared/models/review';
import { ReviewAction } from 'src/constants/constants';
import { AddReviewComponent } from '../add-review/add-review.component';
@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  book: Book;
  review: Review;
  reviewNext: Review;
  reviewPrevious: Review;
  reviewIndex = 1;
  isload = false;
  readMode = false;

  constructor(public bookService: BookService,
    public dialogRef: MatDialogRef<BookViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ngxService: NgxUiLoaderService,
    public dialog: MatDialog,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadBook()
  }

  async loadBook() {
    this.ngxService.startLoader("book-view-loader");
    this.book = await this.bookService.getById(this.data.id);
    if (this.book.reviews) {
      this.review = this.book.reviews[0];
      this.reviewNext = this.book.reviews[1];
    }
    this.ngxService.stopLoader("book-view-loader");
    this.isload = true;
  }

  getNextReview(type: string): void {
    if (!this.book.reviews)
      return;

    switch (type) {
      case ReviewAction.Next:
        if (this.reviewNext) {
          this.reviewIndex++;
          this.reviewPrevious = this.review;
          this.review = this.reviewNext;
          this.reviewNext = this.book.reviews[this.reviewIndex]
        }
        break;
      case ReviewAction.Previous:
        if (this.reviewPrevious) {
          this.reviewIndex--;
          this.reviewNext = this.review;
          this.review = this.reviewPrevious;
          this.reviewPrevious = this.book.reviews[this.reviewIndex - 2];
        }
        break;
    }
  }

  addReview(): void {
    this.dialog.open(AddReviewComponent, {
      data: { book: this.book }
    }).afterClosed()
    .subscribe(response => {
      if (response) {
        this.book.reviews?.push(response.review);
      }
    });;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
