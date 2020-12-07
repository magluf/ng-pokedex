import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Pokemon {
  number: number;
  name: string;
  sprites: { front_default: string };
  types: any[];
  abilities: any[];
  height: number;
  weight: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private http: HttpClient) {}
  private _allPokemonList: any[];

  set allPokemonList(list) {
    this._allPokemonList = list;
  }

  get allPokemonList() {
    return this._allPokemonList;
  }

  async getPokemonInfo(value) {
    return await this.http
      .get(`${environment.apiUrl}/pokemon/${value}`)
      .toPromise();
  }

  async getDescription(value) {
    const speciesInfo = (await this.http
      .get(`${environment.apiUrl}/pokemon-species/${value}`)
      .toPromise()) as { flavor_text_entries: any[] };

    return speciesInfo.flavor_text_entries.find(
      (el) => el.language.name === 'en'
    ).flavor_text;
  }

  async findPokemon(pokemonList: any[]): Promise<Pokemon[]> {
    return await Promise.all(
      pokemonList.map(async (el) => {
        const number = +el.url.split('pokemon/')[1].slice(0, -1);
        const pokemon = (await this.getPokemonInfo(number)) as Pokemon;

        return {
          number: number,
          name: pokemon.name,
          sprites: pokemon.sprites,
          types: pokemon.types,
          abilities: pokemon.abilities,
          height: pokemon.height / 10,
          weight: pokemon.weight / 10,
          description: await this.getDescription(number),
        };
      })
    );
  }

  async getAllPokemon() {
    console.log('tried?');
    if (!this._allPokemonList) {
      return await this.http
        .get(`${environment.apiUrl}/pokemon?limit=898&offset=0`)
        .toPromise();
    }
  }
}
