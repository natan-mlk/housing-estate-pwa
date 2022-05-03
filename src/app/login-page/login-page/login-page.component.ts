import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public isPasswordHidden: boolean = true;
  public username: string = 'a.natan.mlk@gmail.com';
  public password: string = 'test';

  API_URL = 'https://mieszkancynowekolibki.pl:8008/api';

  formGroup = new FormGroup({
    login: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  // TODO dodaj jakąś walidację, może niech się disabluje button na dole jeśli nic się nie wpisze
  onLogin(): void {
    console.log(this.formGroup.value);
    const formValue = this.formGroup.value;
    this.authenticationService.sendLoginRequest(formValue.login, formValue.password)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/news']);
        },
        error: (e: HttpErrorResponse) => {
          console.error(e);
          // TODO dodaj komunikat na błąd w logowaniu (że złe hasło, albo coś)
        }
      })

    /* na adres https://mieszkancynowekolibki.pl:8008/api/public/login/  
    muszę wysłać body: {"username":"a.natan.mlk@gmail.com","password":"test"} a w Headers mieć
    Content-Type: application/json

    wtedy w odpowiedzi przychodzi mi 
    {
      "username": "a.natan.mlk@gmail.com",
      "authToken": "JWT eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhLm5hdGFuLm1sa0BnbWFpbC5jb20iLCJleHAiOjE2NTI3Mjc2NDEsImlhdCI6MTY1MDk5OTY0MX0.qaM4SnaAX_CTRD8vQb4LQ45ac-gETfe4nkwOTTPyAXxYY4Yl3h86K_aqDD6UiOPB9zJQdSiQdv25gpnLRcBIGA",
      "permissions":
        [
        "ROLE_STAFF",
        "PERM_WRITING",
        "PERM_READING"
        ]
    }
    */

  }


  // --------------- logging in =========

  /*
  handleSubmit(event: any) {
    event.preventDefault();
    this.handleLogin(this.username, this.password , ()=>{ if (this.isLoggedIn() && this.hasReadPermission()) {
        // navigate(`/news`)
        console.log("Logged: "+ this.isLoggedIn());
    }
    console.log("Logged: "+ this.isLoggedIn());
});  
}

private handleLogin(username: string, password: string, foo: any) {
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username, password })
  };
  console.log(this.API_URL);
  return fetch(`${this.API_URL}/public/login/`, requestOptions)
      .then(handleResponse)
      .then(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
      
          this.isBrowser() && localStorage.setItem('userData', JSON.stringify(user));
          currentUserSubject.next(user);
          foo();
          return user;
      });
  
}

private isLoggedIn() {
  let user: any = this.getUser();
  return !!user.username
}

private hasReadPermission(){
  return Object.values(this.getUser().permissions).includes('PERM_READING');
}

private getUser(): any {
   return this.isBrowser() && window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") || '{}') // makes sure that we don't parse null, because JSON.parse needs a string
    : {}
}

private isBrowser() {
  return typeof window !== "undefined"
}

private handleResponse(response: any) {
    
  return response.text().then((text: any) => {
      const data = text && JSON.parse(text);//+ response.headers.get("Authorization"));
      //const authToken = JSON.parse();
      if (!response.ok) {
          if ([401, 403].indexOf(response.status) !== -1) {
              // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
              console.log(" auto logout if 401 Unauthorized or 403 Forbidden response returned from api" + response.data);

              // logout();

              //todo location.reload(true);
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }
      return data;
  });
}
*/

}
