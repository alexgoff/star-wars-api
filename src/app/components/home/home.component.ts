import { Component, OnInit, AnimationKeyframe } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Router } from "@angular/router";
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
  characterStore: Character[] = [];
  loading: boolean = false;
  characterLoading: boolean = false;


  constructor(private _appService: AppService, private route: ActivatedRoute, private router: Router,) { 
  }

  ngOnInit() {
    // if there is a router param, get the character in it
    this.route.params.subscribe( params => this.getCharacter(params['person']));

    // on init, get all characters for the current API page to load into the menu
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

  async getCharacter(id: string) {
    let asyncResponse: any;

    asyncResponse = await this._appService
    .getCharacter(id)
    .then((data: Character) => {
      this.setActiveCharacter(data);
    })
  }

  async getAllFilms(filmUrls: any[]) {
    let asyncResponse: any;
    let films: Film[] = []

    for (let i = 0; i < filmUrls.length; i++) {
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

    for (let i = 0; i < speciesUrls.length; i++) {
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

  checkStore(character: Character): boolean {

    for (let i = 0; i < this.characterStore.length; i++) {
      if (character.name === this.characterStore[i].name) {
        this.activeCharacter = this.characterStore[i];
        return true;
      }
    }

    this.activeCharacter = character;
    return false;
  }

  // assign the active character, get their films, species, and homeworld
  setActiveCharacter(character: Character) {
    this.characterLoading = true;

    this.router.navigate(['/character/',character.url.slice(28).replace('/','')]);

    if (this.checkStore(character)) {
      this.characterLoading = false;
    } else {
      this.getHomeworld(character.homeworld).then(homeworld => {
        this.activeCharacter.homeworld = [];
        this.activeCharacter.homeworld.push(homeworld);
      })

      this.getAllSpecies(character.species).then(species => {
        this.activeCharacter.species = species;
      });

      this.getAllFilms(character.films).then(films => {
        this.activeCharacter.films = films;

        // get a little extra time to make sure all the other API calls are wrapped up
        setTimeout(()=> {
          this.characterLoading = false;
        }, 
          500);
      });

      this.characterStore.push(this.activeCharacter);
    }
  }

  // change page by calling all characters again with new page number
  changePage(pageUrl) {
    this.getAllCharacters(pageUrl.slice(34));
  }

}
