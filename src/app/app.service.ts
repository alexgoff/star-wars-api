import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { map, catchError, tap } from 'rxjs/operators';
import { People } from './models/people';
import { Character } from './models/character';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = environment.apiUrl;


@Injectable()
export class AppService {
  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  getAllCharacters(page: string): Observable<People> {
    return this.http.get<People>(API_URL + '/people/?page=' + page)
    .map(data => {
      return data;
   });
  }

  // this is where I want to get the character, their films, their species, and their homeworld and put it in one object
  getCharacter(url: string): Observable<Character> {
    return this.http.get<Character>(url)
    .map(data => {
      return data;
   });
  }
}
