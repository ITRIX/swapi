import { Component, OnDestroy, OnInit } from '@angular/core';
import {extractId, generateQuery } from '../../utils/helpers'
import { ActivatedRoute, Router } from '@angular/router';
import { resourceUrl } from 'src/app/app.constants';
import { PlanetService } from './planet.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { Subscription } from 'rxjs';
import { Planets } from 'src/app/models/planets';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit, OnDestroy {
  planetList: Planets[] = [];
  pageNo: number;
  throttle = 300;
  scrollDistance = 1;
  searchQuery: string;
  private allSubscriptions: Subscription[] = [];

  constructor(
    private planetService: PlanetService,
    private router: Router,
    private masterService: MasterService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageNo = 1;
    this.fetchPlanets();
    this.allSubscriptions.push(
      this.masterService.userSearch.subscribe((res: string) => {
        this.planetList = [];
        this.searchQuery = res;
        this.fetchPlanets();
      })
    );
  }

/**
 * fetchPlanets
 *
 * @description - fetch all the planets of selected page.
 */
fetchPlanets(): void {
    const searchQuery = generateQuery('planets', this.pageNo, this.searchQuery);
    this.allSubscriptions.push(
      this.planetService.getPlanets(searchQuery).subscribe((data: any) => {
        this.planetList.push(...data);
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
  this.fetchPlanets();
}

/**
 * showDetails
 *
 * @description - get id and navigate to detail page
 */
showDetails(url: string) {
  const id = extractId(resourceUrl.PLANETS, url);
  this.router.navigate([id], { relativeTo: this.activatedRoute });
}

ngOnDestroy() {
  this.allSubscriptions.forEach(s => s && s.unsubscribe && s.unsubscribe());
}

}
