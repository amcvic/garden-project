import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    console.log(message);
  }

  private loginUrl = 'http://localhost:3000/api/auth/login';
  private productUrl = 'http://localhost:3000/api/product'

  login (email: string, password: string): Observable<any> {
    let user = new User();
    user.email = email;
    user.password = password;
    return this.http.post(this.loginUrl, user, this.httpOptions).pipe(
      tap((response: any) => this.log('login success')),
      catchError(this.handleError<User>('login'))
    );
  }

  deleteProduct (id: number): Observable<any> {
    console.log('gonna delete ' + this.productUrl + '/' + id);
    return this.http.delete(this.productUrl + '/' + id, this.httpOptions).pipe(
      tap((response: Object) => this.log(`deleted product. response: ${response}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  getProducts (): Observable<Product[]> {
    return this.http.get(this.productUrl, this.httpOptions).pipe(
      tap((products: Product[]) => this.log(`got response of ${products}`)),
      catchError(this.handleError<Product[]>('getProducts'))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
