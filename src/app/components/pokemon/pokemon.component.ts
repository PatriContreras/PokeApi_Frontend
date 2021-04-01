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

  constructor(private pokemonService: PokemonService,
    public modal: NgbModal,
    private activatedRoute: ActivatedRoute) {
    this.arrPokemon = [];
    // this.form = new FormGroup({
    //   name: new FormControl(),
    //   types: new FormControl(),
    // })

  }

  async ngOnInit() {

    this.object = await this.pokemonService.getAllPokemon()
    this.arrPokemon = this.object.results;
    console.log(this.arrPokemon);

    this.objTypes = await this.pokemonService.getPokemonsTypes()
    this.arrTypes = this.objTypes.results;
    console.log('tipos oninit', this.arrTypes);
    console.log(this.arrTypes[1].name);

    this.types = this.arrTypes.map(type => {
      return type.name
    })
    console.log(this.types);


    // for (let i; i <= 20; i++) {
    //   let type = [];
    //   let result = this.arrTypes[i].name.push(type)
    //   return result
    // }

    // console.log(this.result);

  }

  async onClick(url) {
    this.pokemon = await this.pokemonService.getPokemonByUrl(url)
    console.log(this.pokemon);
    this.modal.open(this.modalContent)

    const types = this.pokemon.types

    const object = types[0].type;
    const object1 = types[1].type;
    console.log(object1.name);

    this.type = object.name;
    console.log(object.name);


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

  onSelect($event) {

    this.arrPokemon = this.arrPokemon.filter(res => {
      //console.log(res);
      return res.type.match($event.target.value);

    })

  }





}
