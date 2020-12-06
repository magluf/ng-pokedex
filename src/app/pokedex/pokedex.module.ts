import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokedexComponent } from './pokedex.component';
import { PokemonSearchComponent } from './pokemon-search/pokemon-search.component';
import { PokemonInfoComponent } from './pokemon-info/pokemon-info.component';
import { PokeApiService } from '../service/pokeapi.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PokedexComponent,
    PokemonSearchComponent,
    PokemonInfoComponent,
  ],
  imports: [CommonModule, FormsModule],
  providers: [PokeApiService],
})
export class PokedexModule {}
