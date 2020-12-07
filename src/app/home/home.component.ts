import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeApiService } from '../service/pokeapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private pokeApiService: PokeApiService) {}

  loading = true;

  async ngOnInit() {
    await this.getAllPokemon();
  }

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

  goToPokedex() {
    this.router.navigate(['pokedex']);
  }
}
