import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';


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
  filteredx: any[];

  form: FormGroup

  constructor(
    private pokemonService: PokemonService,
    public modal: NgbModal,
  ) {
    this.arrPokemon = [];

    this.form = new FormGroup({
      name: new FormControl(''),
      type: new FormControl('')
    })
  }


  async ngOnInit() {

    this.object = await this.pokemonService.getAllPokemon()
    this.arrPokemon = this.object.results;

    this.objTypes = await this.pokemonService.getTypes()
    this.arrTypes = this.objTypes.results;


    this.types = this.arrTypes.map(type => {
      return type.name
    })


    this.form.controls['name'].valueChanges.subscribe(change => {
      if (change == '') {
        this.ngOnInit()
      } else {
        this.arrPokemon = this.arrPokemon.filter(res => {
          return res.name.match(change);
        })
      }
      console.log(change);
    });
  }

  async onClick(url) {
    this.pokemon = await this.pokemonService.getPokemonByUrl(url)
    this.modal.open(this.modalContent)

    console.log(this.pokemon);
    this.types = this.pokemon.types;
    console.log(this.types);
    this.resultado = this.types[0].type;
    console.log(this.resultado.name);

    this.resultado = this.types[1].type;
    console.log(this.resultado.name);

  }


  onChange($event) {
    console.log($event.target.value);

  }


}

