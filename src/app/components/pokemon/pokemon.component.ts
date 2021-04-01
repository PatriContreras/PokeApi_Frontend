import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

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
  filteredArr: any[];
  input: string;
  objTypes: any;
  arrTypes: any;
  resultado: any;
  types: any[];
  pokemonByType: any[];
  arrFiltrado: any[];

  constructor(private pokemonService: PokemonService,
    public modal: NgbModal,
    private activatedRoute: ActivatedRoute) {
    this.arrPokemon = [];


  }

  async ngOnInit() {

    this.object = await this.pokemonService.getAllPokemon()
    this.arrPokemon = this.object.results;
    //console.log(this.arrPokemon);

    this.objTypes = await this.pokemonService.getTypes()
    this.arrTypes = this.objTypes.results;
    //console.log('tipos oninit', this.arrTypes);
    //console.log(this.arrTypes[1].name);

    this.types = this.arrTypes.map(type => {
      return type.name
    })
    console.log(this.types);
  }

  async onClick(url) {
    this.pokemon = await this.pokemonService.getPokemonByUrl(url)
    console.log(this.pokemon);
    this.modal.open(this.modalContent)

    const types = this.pokemon.types

    const object = types[0].type;
    //const object1 = types[1].type;
    console.log(object.name);

    this.type = object.name;
    console.log(object.name);
    this.pokemon.type = this.type;
    console.log(this.pokemon.type);



    const obj = this.pokemon.sprites;
    this.image = obj.front_shiny;

  }

  search() {

    if (this.input == "") {
      this.ngOnInit();

    } else {
      this.arrPokemon = this.arrPokemon.filter(res => {
        // console.log('respuesta', res);
        // console.log(res.name);
        return res.name.match(this.input);
      })
    }
  }

  async onSelect($event) {

    // this.objTypes = await this.pokemonService.getPokemonsTypes()
    // this.arrTypes = this.objTypes.results;
    // this.types = this.arrTypes.map(type => {
    //   return type.name
    // })
    // console.log('finaltypes', this.types); // Array con los tipos de pokemon

  }





}
