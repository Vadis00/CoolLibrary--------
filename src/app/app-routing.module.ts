import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageErrorComponent }  from './components/page-error/page-error.component';
import { BookListComponent }  from './components/book-list/book-list.component';

const routes: Routes = [
  { path: 'books', component: BookListComponent },  // Wildcard route for a 404 page
  { path: 'error', component: PageErrorComponent },  // Wildcard route for a 404 page
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
