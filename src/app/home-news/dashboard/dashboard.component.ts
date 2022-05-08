import { Component, OnInit } from '@angular/core';
import { DateAndTimeService, RestService } from 'src/app/common/common.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: null | any[] = null;

  constructor(
    private restService: RestService,
    private dateService: DateAndTimeService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  getDate(dateBackend: string): string {
    return this.dateService.getFormattedDate(dateBackend);
  }

  private fetchData() {
    this.restService.fetchData().subscribe(
      response => {
        console.log('RESP, ', response);
        this.posts = response.content;
      }
    )
  }

}
