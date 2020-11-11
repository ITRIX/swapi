import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  Character } from 'src/app/models/character'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  configUrl = environment.api_URL;
  constructor(
    private http: HttpClient
  ) { }

  /**
   * getCharacters
   *
   * @description - Fetch the character list
   */
  getCharacters(searchQuery: string): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.configUrl}${searchQuery}`)
    .pipe(
      map((res: any) => res.results)
    );
  }

  /**
   * getFilmDetails
   *
   * @description - Fetch the character by id
   */
  getCharacterDetails(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.configUrl}people/${id}/`);
  }
}
