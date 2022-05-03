import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new Subject<User>();

  constructor(
    private httpClient: HttpClient
  ) { }

  sendLoginRequest(login: string, password: string): Observable<any> {
    return this.httpClient.post(
      'https://mieszkancynowekolibki.pl:8008/api/public/login/',
      { "username": "a.natan.mlk@gmail.com", "password": "test" },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(
      tap( (response: any) => {
        const userAuthData: User = new User(response.username, response.permissions, response.authToken);
        this.userSubject.next(userAuthData)
      })
    )

  }
}
