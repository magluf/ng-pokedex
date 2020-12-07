import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokeApiService, Pokemon } from 'src/app/service/pokeapi.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss'],
})

// export class PokemonSearchComponent {
export class PokemonSearchComponent {
  @Output() pokemonSelected: EventEmitter<Pokemon> = new EventEmitter();
  @Output() findPokemon: EventEmitter<string> = new EventEmitter();
  @Output() clearPokemon: EventEmitter<any> = new EventEmitter();

  @Input() searchResults: Pokemon[];
  @Input() loading: boolean;

  beganSearch = false;
  imagesLoaded = 0;
  imagesLoadingProgress = 0;
  searchValue: string;
  errorMessageCleared;

  incrementImagesLoaded() {
    this.imagesLoaded++;
    console.log('this.imagesLoaded', this.imagesLoaded);
    console.log('this.searchResults.length', this.searchResults.length);
  }

  triggerFindPokemon() {
    if (this.searchValue) {
      this.imagesLoaded = 0;
      this.beganSearch = true;
      this.errorMessageCleared = false;
      this.findPokemon.emit(this.searchValue);
    }
  }

  triggerClearPokemon() {
    this.imagesLoaded = 0;
    this.searchValue = '';
    this.errorMessageCleared = true;
    this.clearPokemon.emit();
  }

  areAllImagesLoaded() {
    if (this.searchResults) {
      this.imagesLoadingProgress = Math.round(
        (this.imagesLoaded / this.searchResults.length) * 100
      );
      if (this.imagesLoaded === this.searchResults.length) {
        return true;
      }
    }
    return false;
  }
}
