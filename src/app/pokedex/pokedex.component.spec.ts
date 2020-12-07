import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokeApiService } from '../service/pokeapi.service';

import { PokedexComponent } from './pokedex.component';

describe('PokedexComponent', () => {
  let component: PokedexComponent;
  let service: PokeApiService;
  let fixture: ComponentFixture<PokedexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PokedexComponent],
      providers: [PokeApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(PokeApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call PokeApiService.getAllPokemon() when calling getAllPokemon', () => {
    const spy = spyOn(service, 'getAllPokemon');

    component.getAllPokemon();

    expect(spy).toHaveBeenCalled();
  });
});
