import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

declare var jQuery: any;

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})


export class PokemonComponent implements OnInit {

  @ViewChild('modalContent') modalContent: ElementRef;

  object: any;
  arrPokemon: any[];
  pokemon: any;
  type: string;
  image: string;

  constructor(private pokemonService: PokemonService,
    public modal: NgbModal,
    private activatedRoute: ActivatedRoute) {
    this.arrPokemon = [];

  }

  async ngOnInit() {

    this.object = await this.pokemonService.getAllPokemon()
    this.arrPokemon = this.object.results;
    //console.log(this.arrPokemon);
  }

  async onClick(url) {
    this.pokemon = await this.pokemonService.getPokemonByUrl(url)
    console.log(this.pokemon);
    this.modal.open(this.modalContent)

    const types = this.pokemon.types
    console.log(types[0]);
    const tipo = types[0].type;
    this.type = tipo.name;
    console.log(this.type);

    const obj = this.pokemon.sprites;
    console.log(obj.front_shiny);
    this.image = obj.front_shiny;









    // this.activatedRoute.params.subscribe(async params => {
    //   console.log(params.id);

    //   this.pokemon = await this.pokemonService.getPokemonComplete(params.id);
    //   console.log('pokemon completo', this.pokemon);


    // })


  }


}
