import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './home-news/dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
