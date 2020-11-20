import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceName, resourceUrl } from 'src/app/app.constants';
import { CharacterService } from './character.service';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models/character';
import { defaultPagerQuery, PagerQuery } from 'src/app/models/pager';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy {
  characterList: Character[] = [];
  private allSubscriptions: Subscription[] = [];

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private masterService: MasterService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fetchCharacters(defaultPagerQuery);
  }

  /**
   * fetchCharacters
   *
   * @description - fetch all the characters of selected page.
   */
  fetchCharacters(pageQuery: PagerQuery): void {
    const searchQuery = this.masterService.generateQuery(ResourceName.CHARACTER, pageQuery);
    this.allSubscriptions.push(
      this.characterService.getCharacters(searchQuery).subscribe((data: any) => {
        this.characterList.push(...data);
      }));
  }

  ngOnDestroy() {
    this.allSubscriptions.forEach(s => s && s.unsubscribe && s.unsubscribe());
  }

}
