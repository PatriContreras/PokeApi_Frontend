import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonDetail } from 'src/app/models/pokemon-detail';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})


export class PokemonComponent implements OnInit {

  @ViewChild('modalContent') modalContent: ElementRef;

  object: any;
  allPokemon: Pokemon[];
  filteredPokemon: Pokemon[];
  pokemon: PokemonDetail;
  type: string;
  image: string;
  objTypes: any;
  arrTypes: any;
  types: any[];

  form: FormGroup

  constructor(
    private pokemonService: PokemonService,
    public modal: NgbModal,
  ) {
    this.allPokemon = [];

    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.pattern(/^[a-zA-Z0-9]{0,100}$/)
      ]),
      type: new FormControl('')
    })
  }


  async ngOnInit() {

    this.object = await this.pokemonService.getAllPokemon()
    this.allPokemon = this.object.results;
    this.filteredPokemon = this.object.results;

    this.objTypes = await this.pokemonService.getTypes()
    this.arrTypes = this.objTypes.results;

    this.types = this.arrTypes.map(type => {
      return type.name
    });


    this.form.controls['name'].valueChanges.subscribe(change => {
      if (change == '') {
        this.ngOnInit()
      } else {
        this.filteredPokemon = this.allPokemon.filter(res => {
          return res.name.toLowerCase().match(change.toLowerCase());
        })
      }
    });
  }

  async onClick(url) {
    this.pokemon = await this.pokemonService.getPokemonByUrl(url)
    this.modal.open(this.modalContent)
    this.types = this.pokemon.types;
  }


  onChange($event) {
    // Método de filtrado por tipo de pokemon sin realizar por problemas con la API.
  }

  checkValidator(controlName, validatorName) {
    return this.form.get(controlName).hasError(validatorName);
  }

}
