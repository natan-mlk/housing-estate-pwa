import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateAndTimeService {

  constructor() { }

  getFormattedDate(dateBackend: string): string {
    const timestamp = Date.parse(dateBackend);
    const date = new Date(timestamp)
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  }

}
