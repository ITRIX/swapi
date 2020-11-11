import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Planets } from 'src/app/models/planets';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {

  configUrl = environment.api_URL;
  constructor(
    private http: HttpClient
  ) { }

  /**
   * getPlanets
   *
   * @description - Fetch the planets list
   */
  getPlanets(searchQuery: string): Observable<Planets[]> {
    return this.http.get<Planets[]>(`${this.configUrl}${searchQuery}`)
    .pipe(
      map((res: any) => res.results)
    );
  }

  /**
   * getPlanetDetails
   *
   * @description - Fetch the planets by id
   */
  getPlanetDetails(id: number): Observable<Planets> {
    return this.http.get<Planets>(`${this.configUrl}planets/${id}/`);
  }

}

