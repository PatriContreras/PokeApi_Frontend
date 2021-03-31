import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  object: any;
  pokemon: any;

  constructor(
    public modal: NgbModal,
  ) { }

  async ngOnInit() {

    // this.object = await this.pokemonService.getAllPokemon()
    // this.arrPokemon = this.object.results;
    // console.log(this.arrPokemon);

    // const url = this.object.results[0].url
    // this.pokemon = await this.pokemonService.getPokemonByUrl(url)
    // console.log(this.pokemon);
  }

}

