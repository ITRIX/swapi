import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGridComponent } from './list-grid.component';
import { MasterService } from 'src/app/shared/services/master.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListGridComponent', () => {
  let component: ListGridComponent;
  let fixture: ComponentFixture<ListGridComponent>;
  let masterService;
  let router: Router;
  let activatedRouter: ActivatedRoute;

  const masterServiceStub = {
    userSearch: new Subject(),
    generateQuery: (root, pageQuery) => 'films/?page=1',
    extractId: (root, url) => 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ListGridComponent],
      providers: [
        { provide: MasterService, useValue: masterServiceStub },
        { provide: Router, useValue: { navigate: () => { } } },
        {
          provide: ActivatedRoute, useValue: {
            params: of({ id: 123 })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGridComponent);
    component = fixture.componentInstance;
    masterService = TestBed.inject(MasterService);
    router = TestBed.inject(Router);
    activatedRouter = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    spyOn(component, 'ngOnInit');
    component.searchQuery = '';
    masterService.userSearch.next('planet1');
    component.ngOnInit();
    expect(component.searchQuery).toEqual('planet1');
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should navigate to detail page after calling showDetails method', () => {
    spyOn(router, 'navigate').and.callThrough();
    component.showDetails('http://swapi.dev/api/films/1/');
    fixture.detectChanges();
    expect(router.navigate).toHaveBeenCalledWith([1], { relativeTo: activatedRouter });
  });

  it('should increase pageNo after load call', () => {
    component.pageNo = 1;
    component.loadMore();
    fixture.detectChanges();
    expect(component.pageNo).toEqual(2);
  });
});
