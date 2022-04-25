import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  databaseAddrCharacters: string = 'https://zwykla-historia-default-rtdb.europe-west1.firebasedatabase.app/app/characters/';
  erminData: any;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.getCharacterData('ermin').subscribe(
      val => {
        this.erminData = val.money;
        console.log(val);
        
      }
    )
  }

  getCharacterData(selectedCharacter: string): Observable<any>{
    return this.http.get(this.databaseAddrCharacters + 'ermin' + '.json')
  }

}
