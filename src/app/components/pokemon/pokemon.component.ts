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
  // form: FormGroup;
  filteredArr: any[];
  nombre: string;

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
  }

  async onClick(url) {
    this.pokemon = await this.pokemonService.getPokemonByUrl(url)
    console.log(this.pokemon);
    this.modal.open(this.modalContent)

    const types = this.pokemon.types
    const object = types[0].type;
    this.type = object.name;

    const obj = this.pokemon.sprites;
    this.image = obj.front_shiny;

  }

  search() {

    if (this.nombre == "") {
      this.ngOnInit();

    } else {
      this.arrPokemon = this.arrPokemon.filter(res => {
        console.log('respuesta', res);
        console.log(res.name);
        return res.name.match(this.nombre);
      })
    }
  }


}
