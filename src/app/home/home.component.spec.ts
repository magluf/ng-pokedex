import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
import { PokeApiService } from '../service/pokeapi.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let location: Location;
  let router: Router;
  let service: PokeApiService;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
      ],
      declarations: [HomeComponent],
      providers: [PokeApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    service = TestBed.inject(PokeApiService);
    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /pokedex when calling goToPokedex()', fakeAsync(() => {
    component.goToPokedex();
    tick();
    expect(location.path()).toBe('/pokedex');
  }));

  it('should call PokeApiService.getAllPokemon() when calling getAllPokemon', () => {
    const spy = spyOn(service, 'getAllPokemon');
    component.getAllPokemon();
    expect(spy).toHaveBeenCalled();
  });
});
