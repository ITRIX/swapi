import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PagerQuery } from 'src/app/models/pager';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  userSearch: Subject<string>;
  constructor() {
    this.userSearch = new Subject();
  }

  /**
   * generateQuery
   *
   * @description - create query params for the api.
   */
  generateQuery(root: string, pageQuery: PagerQuery): string {
    const queryArray = [];
    queryArray.push(`${root}?page=${pageQuery.pageNo}`);
    if (pageQuery.searchKey !== '') { queryArray.push(`&search=${pageQuery.searchKey}`); }
    return queryArray.join('');
  }

  /**
   * extractId
   *
   * @description - return extracted id from the URL
   */
  extractId(rootUrl: string, detailUrl: string) {
    const extractedId = detailUrl
      .replace(rootUrl, '')
      .replace('/', '');
    return parseInt(extractedId);
  }

}

