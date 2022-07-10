import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementsComponent } from './announcements/components/announcements/announcements.component';
import { PostPageComponent } from './common/components/post-page/post-page.component';
import { DashboardComponent } from './home-news/dashboard/dashboard.component';
import { AuthGuardService } from './login-page/auth.guard';
import { LoginPageComponent } from './login-page/login-page/login-page.component';
import { UserProfileComponent } from './user-profile/components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'news', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'news/:postId', component: PostPageComponent, canActivate: [AuthGuardService] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
  { path: 'announcements', component: AnnouncementsComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
