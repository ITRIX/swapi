import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceName } from 'src/app/app.constants';
import { PlanetService } from './planet.service';
import { Subscription } from 'rxjs';
import { Planets } from 'src/app/models/planets';
import { defaultPagerQuery, PagerQuery } from 'src/app/models/pager';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit, OnDestroy {
  planetList: Planets[] = [];
  private allSubscriptions: Subscription[] = [];

  constructor(
    private planetService: PlanetService,
    private router: Router,
    private masterService: MasterService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchPlanets(defaultPagerQuery);
  }

  /**
   * fetchPlanets
   *
   * @description - fetch all the planets of selected page.
   */
  fetchPlanets(pageQuery: PagerQuery): void {
    const searchQuery = this.masterService.generateQuery(ResourceName.PLANETS, pageQuery);
    this.allSubscriptions.push(
      this.planetService.getPlanets(searchQuery).subscribe((data: any) => {
        this.planetList.push(...data);
      }));
  }

  ngOnDestroy() {
    this.allSubscriptions.forEach(s => s && s.unsubscribe && s.unsubscribe());
  }

}
