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

  getPage(pageUrl) {
    let pageNumber = pageUrl.slice(34);
    
    this.getAllCharacters(pageNumber);
  }

  setCharacter(character: Character) {
    this.characterLoading = true;
    this.activeCharacter = character;

    // this.setCharacterFilms(this.activeCharacter.films);
    // this.setCharacterSpecies(this.activeCharacter.species);
    // this.setCharacterHomeworld(this.activeCharacter.homeworld);

    this.characterLoading = false;
  }

}
