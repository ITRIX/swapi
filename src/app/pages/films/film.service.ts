import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Films } from 'src/app/models/films';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  configUrl = environment.api_URL;
  constructor(
    private http: HttpClient
  ) { }

  /**
   * getFilms
   *
   * @description - Fetch the films list
   */
  getFilms(searchQuery: string): Observable<Films[]> {
    return this.http.get<Films[]>(`${this.configUrl}${searchQuery}`)
    .pipe(
      map((res: any) => res.results)
    );
  }

  /**
   * getFilmDetails
   *
   * @description - Fetch the film by id
   */
  getFilmDetails(id: number): Observable<Films> {
    return this.http.get<Films>(`${this.configUrl}films/${id}/`);
  }

}
