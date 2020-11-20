import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilmsComponent } from './films.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FilmService } from './film.service';
import { of, Subject } from 'rxjs';
import { Films } from 'src/app/models/films';
import { MasterService } from 'src/app/shared/services/master.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;

  let filmServiceStub: Partial<FilmService>;
  let masterServiceStub: Partial<MasterService>;
  let filmService;
  let masterService;
  let router: Router;
  let activatedRouter: ActivatedRoute;
  const films: Films = {
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl: 'hhhh',
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    characters: [
      'http://swapi.dev/api/people/1/'
    ],
    planets: [
      'http://swapi.dev/api/planets/1/'
    ],
    starships: [
      'http://swapi.dev/api/starships/2/'
    ],
    vehicles: [
      'http://swapi.dev/api/vehicles/4/'
    ],
    species: [
      'http://swapi.dev/api/species/1/'
    ],
    created: new Date(),
    edited: new Date(),
    url: 'http://swapi.dev/api/films/1/'
  };
  const res: any = { results: [films] };

  filmServiceStub = {
    getFilms: (searchKey) => of(
      res.results
    )
  };

  masterServiceStub = {
    userSearch: new Subject(),
    generateQuery: (root, pageQuery) => 'films?page=1'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [FilmsComponent],
      providers: [
        { provide: FilmService, useValue: filmServiceStub },
        { provide: MasterService, useValue: masterServiceStub},
        {provide: Router, useValue: {navigate: () => {}}},
        {provide: ActivatedRoute, useValue: {
            params: of({id: 123})
          }}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    filmService = TestBed.inject(FilmService);
    masterService = TestBed.inject(MasterService);
    router = TestBed.inject(Router);
    activatedRouter = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load films detail', () => {
    spyOn(filmService, 'getFilms')
      .and
      .callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(filmService.getFilms).toHaveBeenCalledWith('films?page=1');
    expect(component.filmsList[0]).toEqual(res.results[0]);
  });
});
