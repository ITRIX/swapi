import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { resource, resourceUrl } from 'src/app/app.constants';
import { Films } from 'src/app/models/films';
import { MasterService } from 'src/app/shared/services/master.service';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent implements OnInit {
  filmDetails: Films;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private masterService: MasterService,
    private filmService: FilmService
  ) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params: any) => {
      this.filmService.getFilmDetails(params.params.action).subscribe((data: Films) => {
        this.filmDetails = data;
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
    const id = this.masterService.extractId(resourceUrl[root], url);
    this.router.navigate([resource[root] + id]);
  }

}
