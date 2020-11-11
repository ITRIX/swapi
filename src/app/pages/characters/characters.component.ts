import { Component, OnDestroy, OnInit } from '@angular/core';
import {extractId, generateQuery } from '../../utils/helpers'
import { ActivatedRoute, Router } from '@angular/router';
import { resourceUrl } from 'src/app/app.constants';
import { CharacterService } from './character.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { Subscription } from 'rxjs';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy {
  characterList: Character[] = [];
  pageNo: number;
  throttle = 300;
  scrollDistance = 1;
  searchQuery: string;
  private allSubscriptions: Subscription[] = [];

  constructor(
    private characterService: CharacterService,
    private router: Router,
    private masterService: MasterService,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageNo = 1;
    this.fetchCharacters();
    this.allSubscriptions.push(
      this.masterService.userSearch.subscribe((res: string) => {
        this.characterList = [];
        this.searchQuery = res;
        this.fetchCharacters();
      })
    );
  }

/**
 * fetchCharacters
 *
 * @description - fetch all the characters of selected page.
 */
fetchCharacters(): void {
    const searchQuery = generateQuery('people', this.pageNo, this.searchQuery);
    this.allSubscriptions.push(
      this.characterService.getCharacters(searchQuery).subscribe((data: any) => {
        this.characterList.push(...data);
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
  this.fetchCharacters();
}

/**
 * showDetails
 *
 * @description - get id and navigate to detail page
 */
showDetails(url: string) {
  const id = extractId(resourceUrl.CHARACTER, url);
  this.router.navigate([id], { relativeTo: this.activatedRoute });
}

ngOnDestroy() {
  this.allSubscriptions.forEach(s => s && s.unsubscribe && s.unsubscribe());
}

}
