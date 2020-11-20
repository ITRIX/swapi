import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { resource, resourceUrl } from 'src/app/app.constants';
import { Character } from 'src/app/models/character';
import { MasterService } from 'src/app/shared/services/master.service';
import { CharacterService } from '../character.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  characterDetails: Character;
  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private masterService: MasterService,
    private filmService: CharacterService
  ) { }

  ngOnInit(): void {
    this.activatedRouter.paramMap.subscribe((params: any) => {
      this.filmService.getCharacterDetails(params.params.action).subscribe((data: Character) => {
        this.characterDetails = data;
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
