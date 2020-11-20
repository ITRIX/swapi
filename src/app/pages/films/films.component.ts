import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilmService } from './film.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceName } from 'src/app/app.constants';
import { Subscription } from 'rxjs';
import { Films } from 'src/app/models/films';
import { defaultPagerQuery, PagerQuery } from 'src/app/models/pager';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit, OnDestroy {
  filmsList: Films[] = [];
  private allSubscriptions: Subscription[] = [];

  constructor(
    private filmService: FilmService,
    private router: Router,
    private masterService: MasterService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchFilms(defaultPagerQuery);
  }

/**
 * fetchFilms
 *
 * @description - fetch all the films of selected page.
 */
  fetchFilms(pageQuery: PagerQuery): void {
    const searchQuery = this.masterService.generateQuery(ResourceName.FILMS, pageQuery);
    this.allSubscriptions.push(
      this.filmService.getFilms(searchQuery).subscribe((data: any) => {
        this.filmsList.push(...data);
      }));
  }

ngOnDestroy() {
  this.allSubscriptions.forEach(s => s && s.unsubscribe && s.unsubscribe());
}

}
