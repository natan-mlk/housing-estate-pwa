import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new BehaviorSubject<User | null>(null);
  // private urlApiAddress: string = 'https://mieszkancynowekolibki.pl:8008/api/';
  private urlApiAddress: string = 'https://mieszkancyrivus.pl:8008/api/';

  constructor(
    private httpClient: HttpClient
  ) { }

  sendLoginRequest(login: string, password: string): Observable<any> {
    return this.httpClient.post(
      this.urlApiAddress +  'public/login/',
      // { "username": "a.natan.mlk@gmail.com", "password": "test" },
      { "username": login, "password": password },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).pipe(
      tap( (response: any) => {
        const userAuthData: User = new User(response.username, response.permissions, response.authToken);
        this.userSubject.next(userAuthData);
        this.putAuthTokenToLocalStorage(userAuthData);
      })
    )

  }

  autoLogin(){
    const userAuthData: any = JSON.parse(localStorage.getItem('userData')!);
    
    if(!userAuthData){
      return ;
    } else {
      const localUserAuthData: User = new User(userAuthData.username, userAuthData.permissions, userAuthData._authToken);
      this.userSubject.next(localUserAuthData);      
    }
  }

  private putAuthTokenToLocalStorage(userAuthData: User){
    localStorage.setItem('userData', JSON.stringify(userAuthData));
  }

  logout(){
    this.userSubject.next(null);
    localStorage.removeItem('userData');
  }
}
