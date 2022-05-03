import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/common/services/rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private restService: RestService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.restService.fetchData().subscribe(
      response => {
        console.log('RESP, ', response);
        
      }
    )
  }

}
