import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PokeApiService } from './pokeapi.service';
declare var require: any;
const mockData = require('./pokemonMockData.json');
const pikachuMock = require('./pikachu.json');


describe('PokeapiService', () => {
  let service: PokeApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PokeApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getAllPokemon should return a list of pokemon from a promise', (done: DoneFn) => {
    spyOn(service, 'getAllPokemon').and.returnValue(Promise.resolve(mockData));
    service.getAllPokemon().then((data) => {
      expect(service.getAllPokemon).toHaveBeenCalled();
      expect(data).toEqual(mockData);
      done();
    });
  });

  it('#getPokemonInfo(25) should return the info for Pikachu', (done: DoneFn) => {
    spyOn(service, 'getPokemonInfo').and.returnValue(
      Promise.resolve(pikachuMock)
    );
    service.getPokemonInfo(25).then((data) => {
      expect(service.getPokemonInfo).toHaveBeenCalled();
      expect(data).toEqual(pikachuMock);
      done();
    });
  });
});
