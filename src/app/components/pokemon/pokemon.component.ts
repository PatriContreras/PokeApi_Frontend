import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';


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
  filteredArr: any[];
  input: string;
  objTypes: any;
  arrTypes: any;
  resultado: any;
  types: any[];
  pokemonByType: any[];
  arrFiltrado: any[];

  constructor(
    private pokemonService: PokemonService,
    public modal: NgbModal,
  ) {
    this.arrPokemon = [];
  }

  async ngOnInit() {

    this.object = await this.pokemonService.getAllPokemon()
    this.arrPokemon = this.object.results;

    this.objTypes = await this.pokemonService.getTypes()
    this.arrTypes = this.objTypes.results;


    this.types = this.arrTypes.map(type => {
      return type.name
    })

  }

  async onClick(url) {
    this.pokemon = await this.pokemonService.getPokemonByUrl(url)
    this.modal.open(this.modalContent)

  }

  search() {
    if (this.input == "") {
      this.ngOnInit();

    } else {
      this.arrPokemon = this.arrPokemon.filter(res => {
        return res.name.match(this.input);
      })
    }
  }

  async onSelect($event) {
    if ($event.target.value == "") {
      this.ngOnInit();
    }
    else {
      //
      this.arrPokemon = this.arrPokemon.filter(pok => {
        return pok.type == $event.target.value;
      });
    }
  }

}
