import { Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { resourceUrl } from 'src/app/app.constants';
import { defaultPagerQuery, PagerQuery } from 'src/app/models/pager';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'app-list-grid',
  templateUrl: './list-grid.component.html',
  styleUrls: ['./list-grid.component.scss']
})
export class ListGridComponent implements OnInit, OnDestroy {
  pageNo: number;
  searchQuery: string;
  throttle = 100;
  scrollDistance = 1;
  private allSubscriptions: Subscription[] = [];

  @Input() listData: any;
  @Output() listDataChange = new EventEmitter<any>();
  @Output() loadData = new EventEmitter<PagerQuery>();
  @ContentChild('listview', { static: true }) titleTemplate: TemplateRef<any>;
  constructor(
    private router: Router,
    private masterService: MasterService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.pageNo = 1;
    this.searchQuery = '';
    this.allSubscriptions.push(
      this.masterService.userSearch.subscribe((res: string) => {
        this.listDataChange.emit([]);
        this.searchQuery = res;
        this.pageNo = 1;
        const newPageQuery: PagerQuery = { ...defaultPagerQuery, ...{ searchKey: this.searchQuery, pageNo: this.pageNo } };
        this.loadData.emit(newPageQuery);
      })
    );
  }

  /**
   * loadMore
   *
   * @description - Triggers when user scroll down the page.
   */
  loadMore() {
    this.pageNo++;
    const newPageQuery: PagerQuery = { ...defaultPagerQuery, ...{ searchKey: this.searchQuery, pageNo: this.pageNo } };
    this.loadData.emit(newPageQuery);
  }

  /**
   * showDetails
   *
   * @description - get id and navigate to detail page
   */
  showDetails(url: string) {
    const id = this.masterService.extractId(resourceUrl.FILMS, url);
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy() {
    this.allSubscriptions.forEach(s => s && s.unsubscribe && s.unsubscribe());
  }

}
