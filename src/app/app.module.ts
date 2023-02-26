import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './core/services/book/book.service';
import { HttpClientModule } from '@angular/common/http';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { BookViewComponent } from './components/modal/book-view/book-view.component';
import { BookEditComponent } from './components/modal/book-edit/book-edit.component';
import { AlertModule } from 'ngx-alerts';
import { NgxUiLoaderConfig, NgxUiLoaderModule, PB_DIRECTION, POSITION, SPINNER } from "ngx-ui-loader";
import { DeleteBookComponent } from './components/modal/delete-book/delete-book.component';
import { RatingComponent } from './components/rating/rating.component';
import { AddReviewComponent } from './components/modal/add-review/add-review.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsPosition: POSITION.centerCenter,
  fgsSize: 40,
  // fgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.chasingDots, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  masterLoaderId: "loader-01", //by-default its master
};

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    AddBookComponent,
    HeaderComponent,
    SearchComponent,
    BookViewComponent,
    BookEditComponent,
    DeleteBookComponent,
    RatingComponent,
    AddReviewComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000, positionX: 'right', positionY: 'top' }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
