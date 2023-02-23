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
import {MatNativeDateModule} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { HeaderComponent } from './components/header/header.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookListComponent,
    AddBookComponent,
    HeaderComponent,
    SearchComponent,

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
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
