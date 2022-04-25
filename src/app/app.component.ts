import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'housing-estate-pwa';
  readonly VAPID_PUBLIC_KEY = "BJIV5wHbf7TxxaZZsUl5oifCpTJs_HimJAp7GN9u8YhkWor_9fPF3J68840Qo3SW7f9Ti5Jg1h7jmdINsvZTP_Y"
  // {"publicKey":"BJIV5wHbf7TxxaZZsUl5oifCpTJs_HimJAp7GN9u8YhkWor_9fPF3J68840Qo3SW7f9Ti5Jg1h7jmdINsvZTP_Y","privateKey":"rQ2CAfiu1Zg38jCZK9G4coaPKMVFxFkzuaawj4G4Gfk"}

  constructor(
    private swPush: SwPush,
    private http: HttpClient,
    private swUpdate: SwUpdate
  ) {
  }

  // instrukcja - nie dokończyłem https://blog.angular-university.io/angular-push-notifications/
  
  ngOnInit() {

    if (this.swUpdate.isEnabled) {
        this.swUpdate.versionUpdates.subscribe(() => {
            if (confirm("New version available. Load New Version?")) {
                window.location.reload();
            }
        });
    }
}

  subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => this.addPushSubscriber(sub).subscribe())
    .catch(err => console.error("Could not subscribe to notifications", err));
  }

  // ------------

  addPushSubscriber(sub:any) {
    return this.http.post('/api/notifications', sub);
}

send() {
    return this.http.post('/api/newsletter', null);
}

}
