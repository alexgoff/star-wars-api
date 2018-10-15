import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AppService } from '../../app.service';
import { People } from '../../models/people';
import { Character } from '../../models/character';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  response: People;
  activeCharacter: Character;
  loading: boolean = false;
  characterLoading : boolean = false;
  films: any = [];

  constructor(private _appService: AppService) { }


  ngOnInit() {
    // on init, get all characters for the current API page
    this.getAllCharacters();
  }

  // get all characters, always start on page 1
  async getAllCharacters(page: string = '1') {
    this.loading = true;
    let asyncResponse: any;

    asyncResponse = await this._appService.getAllCharacters(page).toPromise().then(
      (data: People) => {
        this.response = data
      }
    );

    this.loading = false;
  }

  // pull all info for a single character
  async getCharacter(characterUrl) {
    this.characterLoading = true;
    let asyncResponse: any;

    asyncResponse = await this._appService.getCharacter(characterUrl).toPromise().then(
      (data: Character) => {
        this.activeCharacter = data;
      }
    );    

    this.characterLoading = false;

  }

  getPage(pageUrl) {
    let pageNumber = pageUrl.slice(34);
    
    this.getAllCharacters(pageNumber);
  }

  // when a character is clicked, this characters info needs to populate a single object
  setCharacter(character: Character) {
    this.getCharacter(character.url);
  }

}
