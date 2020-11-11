import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilmService } from './film.service';
import {extractId, generateQuery } from '../../utils/helpers'
import { ActivatedRoute, Router } from '@angular/router';
import { resourceUrl } from 'src/app/app.constants';
import { MasterService } from 'src/app/shared/services/master.service';
import { Subscription } from 'rxjs';
import { Films } from 'src/app/models/films';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit, OnDestroy {
  filmsList: Films[] = [];
  pageNo: number;
  throttle = 300;
  searchQuery: string;
  scrollDistance = 1;
  private allSubscriptions: Subscription[] = [];

  constructor(
    private filmService: FilmService,
    private router: Router,
    private masterService: MasterService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageNo = 1;
    this.fetchFilms();
    this.searchQuery = '';
    this.allSubscriptions.push(
      this.masterService.userSearch.subscribe((res: string) => {
        this.filmsList = [];
        this.searchQuery = res;
        this.fetchFilms();
      })
    );
  }

/**
 * fetchFilms
 *
 * @description - fetch all the films of selected page.
 */
  fetchFilms(): void {
    const searchQuery = generateQuery('films', this.pageNo, this.searchQuery);
    this.allSubscriptions.push(
      this.filmService.getFilms(searchQuery).subscribe((data: any) => {
        this.filmsList.push(...data);
      }, (error: any) => {
      })
    );
  }

/**
 * loadMore
 *
 * @description - Triggers when user scroll down the page.
 */
loadMore(): void {
  this.pageNo += 1;
  this.fetchFilms();
}

/**
 * showDetails
 *
 * @description - get id and navigate to detail page
 */
showDetails(url: string) {
  const id = extractId(resourceUrl.FILMS, url);
  this.router.navigate([id], { relativeTo: this.activatedRoute });
}

ngOnDestroy() {
  this.allSubscriptions.forEach(s => s && s.unsubscribe && s.unsubscribe());
}

}
