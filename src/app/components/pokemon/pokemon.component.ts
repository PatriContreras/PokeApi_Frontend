import { Component, Input, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  object: any;
  arrPokemon: any[];
  pokemon: any;

  constructor(private pokemonService: PokemonService) {
    this.arrPokemon = [];

  }

  async ngOnInit() {

    this.object = await this.pokemonService.getAllPokemon()

    this.arrPokemon = this.object.results;
    console.log(this.arrPokemon);
  }

  async onClick() {
    const url = this.object.results[0].url
    this.pokemon = await this.pokemonService.getPokemonByUrl(url)
    console.log(this.pokemon);

  }


}
