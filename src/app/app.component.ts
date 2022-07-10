import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { AuthService } from './login-page/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'housing-estate-pwa';
  readonly VAPID_PUBLIC_KEY = "BJIV5wHbf7TxxaZZsUl5oifCpTJs_HimJAp7GN9u8YhkWor_9fPF3J68840Qo3SW7f9Ti5Jg1h7jmdINsvZTP_Y"
  // {"publicKey":"BJIV5wHbf7TxxaZZsUl5oifCpTJs_HimJAp7GN9u8YhkWor_9fPF3J68840Qo3SW7f9Ti5Jg1h7jmdINsvZTP_Y","privateKey":"rQ2CAfiu1Zg38jCZK9G4coaPKMVFxFkzuaawj4G4Gfk"}

  isUserAuth: boolean = false;
  private swUpdateSubscription: Subscription = Subscription.EMPTY;
  private authSubscription: Subscription = Subscription.EMPTY;


  constructor(
    private swPush: SwPush,
    private http: HttpClient,
    private swUpdate: SwUpdate,
    private authenticationService: AuthService
  ) {
  }

  // instrukcja - nie dokończyłem https://blog.angular-university.io/angular-push-notifications/

  ngOnInit() {

    this.authenticationService.autoLogin();

    this.authSubscription = this.authenticationService.userSubject.subscribe(
      userData => {
        this.isUserAuth = !!userData;
      }
    )

    if (this.swUpdate.isEnabled) {
      this.swUpdateSubscription = this.swUpdate.versionUpdates.subscribe(() => {
        if (confirm("New version available. Load New Version?")) {
          window.location.reload();
        }
      });
    }
  }

  logout(): void {
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.swUpdateSubscription.unsubscribe();
  }

  // --------------
  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.addPushSubscriber(sub).subscribe())
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

  // ------------

  addPushSubscriber(sub: any) {
    return this.http.post('/api/notifications', sub);
  }

  send() {
    return this.http.post('/api/newsletter', null);
  }

}
