import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { resource, resourceUrl } from 'src/app/app.constants';
import { Planets } from 'src/app/models/planets';
import { extractId } from 'src/app/utils/helpers';
import { PlanetService } from '../planet.service';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent implements OnInit {
  planetDetails: Planets;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private planetService: PlanetService,
  ) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params: any) => {
      this.planetService.getPlanetDetails(params.params.action).subscribe((data: Planets) => {
        this.planetDetails = data;
      }, (error => {
      }));
    });
  }

/**
 * showDetails
 *
 * @description - get id and navigate to detail page
 */
  showDetails(root: string, url: string): void {
    const id = extractId(resourceUrl[root], url);
    this.router.navigate([resource[root] + id]);
  }

}
