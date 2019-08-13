import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { Request } from './request';

@Injectable({
  providedIn: 'root'
})
export class GardenService {

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'applicaton/json' })
  };

  private log(message: string) {
    console.log(message);
  }

  private loginUrl = 'http://localhost:3000/api/auth/login';

  login (user: User): Observable<User> {
    console.log(user.email, user.password);
    return this.http.post(this.loginUrl, {"email":user.email, "password":user.password}, this.httpOptions).pipe(
      tap((response: User) => this.log(`logged in as user: ${response}`)),
      catchError(this.handleError<User>('login'))
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
