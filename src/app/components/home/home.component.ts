import { Component, OnInit, AnimationKeyframe } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppService } from '../../app.service';
import { People } from '../../models/people';
import { Film } from '../../models/film';
import { Character } from '../../models/character';
import { Species } from '../../models/species';
import { Homeworld } from '../../models/homeworld';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  response: People;
  Characters$ = new BehaviorSubject([])
  activeCharacter: Character;
  loading: boolean = false;
  characterLoading: boolean = false;


  constructor(private _appService: AppService) { }

  ngOnInit() {
    // on init, get all characters for the current API page
    this.getAllCharacters();
  }

  // get all characters, always start on page 1
  async getAllCharacters(page: string = '1') {
    this.loading = true;
    let asyncResponse: any;

    asyncResponse = await this._appService
    .getAllCharacters(page)
    .then((data: People) => {
      this.response = data;
    })

    this.Characters$.next(this.response.results);

    this.loading = false;
  }

  async getAllFilms(filmUrls: any[]) {
    let asyncResponse: any;
    let films: Film[] = []

    for(let i = 0; i < filmUrls.length; i++) {
      asyncResponse = await this._appService
      .getAllFilms(filmUrls[i])
      .then((data: Film) => {
        films.push(data);
      })
    }

    return films;
  }

  async getAllSpecies(speciesUrls: any[]) {
    let asyncResponse: any;
    let species: any[] = []

    for(let i = 0; i < speciesUrls.length; i++) {
      asyncResponse = await this._appService
      .getAllSpecies(speciesUrls[i])
      .then((data: Species) => {
        species.push(data);
      })
    }

    return species;    
  }

  async getHomeworld(homeworldUrl: any) {
    let asyncResponse: any;
    let homeworld: Homeworld;

    asyncResponse = await this._appService
    .getHomeworld(homeworldUrl)
    .then((data: Homeworld) => {
      homeworld = data;
    })

    return homeworld;
  }

  // assign the active character, get their films, species, and homeworld
  setActiveCharacter(character: Character) {
    this.characterLoading = true;
    
    this.activeCharacter = character;

    // this.getHomeworld(character.homeworld).then(homeworld => {
    //   this.activeCharacter.homeworld = [];
    //   this.activeCharacter.homeworld.push(homeworld);
    // })

    // this.getAllSpecies(character.species).then(species => {
    //   this.activeCharacter.species = species;
    // });

    this.getAllFilms(character.films).then(films => {
      this.activeCharacter.films = films;
      this.characterLoading = false;
    });


  }

  // change page by calling all characters again with new page number
  changePage(pageUrl) {
    this.getAllCharacters(pageUrl.slice(34));
  }
  
}
