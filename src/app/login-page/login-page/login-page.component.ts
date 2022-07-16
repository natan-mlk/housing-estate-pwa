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

  }

}
