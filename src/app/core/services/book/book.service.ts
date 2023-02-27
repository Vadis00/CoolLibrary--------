import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Book, BookPreview, NewBook } from 'src/app/shared/models/book';
import { environment } from 'src/environments/environment.local';
import { lastValueFrom, Observable, } from 'rxjs';
import { Injectable } from '@angular/core';
import { NewReview } from 'src/app/shared/models/review';
import { Rating } from 'src/app/shared/models/rating';
import { Router, } from '@angular/router';
import { AlertService } from 'ngx-alerts';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class BookService {
  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService,
    private ngxService: NgxUiLoaderService,
    private router: Router) {
  }
  public async getAll(order: string): Promise<BookPreview[] | any> {
    try {
      const queryParams = `?order=${encodeURIComponent(order)}`
      const url = `${environment.baseApiUrl}/api/books/${queryParams}`;
      const response = this.httpClient.get<BookPreview[]>(url);
      return await lastValueFrom(response);
    } catch (e: any) {
      this.alertService.danger(e.message);
      this.ngxService.stopAll();
      this.router.navigate(['error'], { });

    }
  }

  public async getTopRate(ganre: string): Promise<BookPreview[]> {
    const queryParams = `?genre=${(ganre)}`
    const url = `${environment.baseApiUrl}/api/recommended/${queryParams}`;
    const response = this.httpClient.get<BookPreview[]>(url);

    return await lastValueFrom(response);
  }

  public async getById(id: string): Promise<Book> {
    const url = `${environment.baseApiUrl}/api/books/${id}`;
    const response = this.httpClient.get<Book>(url);

    return await lastValueFrom(response);
  }

  public async getGenres(): Promise<string[]> {
    const url = `${environment.baseApiUrl}/api/books/genre`;
    const response = this.httpClient.get<string[]>(url);

    return await lastValueFrom(response);
  }

  public async deleteById(id: number, secret: string): Promise<any> {
    const queryParams = `?secret=${(secret)}`
    const url = `${environment.baseApiUrl}/api/books/${id}/${queryParams}`;
    const response = this.httpClient.delete<void>(url);

    return await lastValueFrom(response);
  }

  public async createOrUpdate(book: NewBook): Promise<number> {
    const url = `${environment.baseApiUrl}/api/books/save`;
    const response = this.httpClient.post<number>(url, book);

    return await lastValueFrom(response);
  }

  public async addReview(id: number, review: NewReview): Promise<any> {
    const url = `${environment.baseApiUrl}/api/books/${id}/review`;
    const response = this.httpClient.put<BookPreview>(url, review);

    return await lastValueFrom(response);
  }

  public async addRating(id: number, rating: Rating): Promise<any> {
    const url = `${environment.baseApiUrl}/api/books/${id}/rate`;
    const response = this.httpClient.put<BookPreview>(url, rating);

    return await lastValueFrom(response);
  }
}
