import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/service/pokeapi.service';

@Component({
  selector: 'app-pokemon-info',
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss'],
})
export class PokemonInfoComponent {
  @Input() pokemon: Pokemon;
}
