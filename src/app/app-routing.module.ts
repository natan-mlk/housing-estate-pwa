import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsComponent } from './announcements/components/announcements/announcements.component';
import { PostPageComponent } from './common/components/post-page/post-page.component';
import { DashboardComponent } from './home-news/dashboard/dashboard.component';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { UserProfileComponent } from './user-profile/components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'news', component: DashboardComponent },
  { path: 'news/:postId', component: PostPageComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'announcements', component: AnnouncementsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
