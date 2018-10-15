import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { People } from './models/people';
import { Film } from './models/film';
import { Character } from './models/character';
import { Species } from './models/species';
import { Homeworld } from './models/homeworld';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const API_URL = environment.apiUrl;


@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  public async getAllCharacters(page: string) {
    return await this.GET<People>(API_URL + '/people/?page=' + page);
  }

  public async getCharacter(id: string) {
    return await this.GET<Character>(API_URL + '/people/' + id);
  }

  public async getAllFilms(url: string) {
    return await this.GET<Film>(url);
  }

  public async getAllSpecies(url: string) {
    return await this.GET<Species>(url);
  }

  public async getHomeworld(url: string) {
    return await this.GET<Homeworld>(url);
  }

  private async GET<T>(url: string) {
    const REQUEST_URL = url;
    const REQUEST: HttpRequest<any> = new HttpRequest('GET', REQUEST_URL);
    console.log('GET Request: ' + REQUEST_URL);
    return await this.http
      .get(REQUEST.url)
      .toPromise()
      .then((resp: T) => {
        // console.log('GET Response: ' + JSON.stringify(resp));
        return resp;
      })
      .catch(() => {
        console.log('Error trying to GET data.');
        return null;
      });
  }

}
