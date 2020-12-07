import { Component, OnInit } from '@angular/core';
import { PokeApiService, Pokemon } from '../service/pokeapi.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit {
  selectedPokemon: Pokemon;
  searchResults: Pokemon[];
  searchValue: string = 'pika';
  loading: boolean = false;

  constructor(private pokeApiService: PokeApiService) {}

  handlePokemonSelected(pokemon: Pokemon) {
    this.selectedPokemon = pokemon;
  }

  async ngOnInit() {
    await this.getAllPokemon();
  }

  // Needed since the PokeAPI does not return a list when
  // partial values (for name or number) are passed as parameter.
  async getAllPokemon() {
    this.loading = true;
    await this.pokeApiService
      .getAllPokemon()
      .then((data) => {
        let res = data as { results: { name: string; url: string }[] };
        this.pokeApiService.allPokemonList = res.results;
        console.log(data);
      })
      .catch((error) => console.log(error));
    this.loading = false;
  }

  async handleFindPokemon(value) {
    if (!value) {
      return;
    }

    this.loading = true;

    const filter = Number(value) ? Number(value) : value;

    let pokeList;

    if (isNaN(+filter)) {
      pokeList = this.pokeApiService.allPokemonList.filter((el) =>
        el.name.includes(value)
      );
    } else {
      pokeList = this.pokeApiService.allPokemonList.filter((el) =>
        el.url.split('pokemon/')[1].slice(0, -1).includes(value)
      );
    }

    this.searchResults = (
      await this.pokeApiService.findPokemon(pokeList)
    ).filter((el) => el.sprites.front_default);
    this.loading = false;
  }

  handleClearPokemon() {
    this.searchResults = [];
    this.selectedPokemon = null;
  }
}
