import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    AnnouncementsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AnnouncementsModule { }
