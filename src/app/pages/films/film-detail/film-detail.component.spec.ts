import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FilmDetailComponent } from './film-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FilmService } from '../film.service';

describe('FilmDetailComponent', () => {
  let component: FilmDetailComponent;
  let fixture: ComponentFixture<FilmDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ FilmDetailComponent ],
      providers: [FilmService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
