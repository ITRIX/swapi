import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PlanetDetailComponent } from './planet-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PlanetService } from '../planet.service';

describe('PlanetDetailComponent', () => {
  let component: PlanetDetailComponent;
  let fixture: ComponentFixture<PlanetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ PlanetDetailComponent ],
      providers: [PlanetService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
