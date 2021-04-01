import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string;
  arrPokemon: any[];
  filteredPokemon: any[];
  arrTypes: any[];


  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://pokeapi.co/api/v2';
  }

  getAllPokemon() {
    return this.httpClient.get(`${this.baseUrl}/pokemon`).toPromise()
  }

  getPokemonByUrl(url) {
    return this.httpClient.get(url).toPromise()
  }

  getPokemonComplete(id) {
    return this.httpClient.get(`${this.baseUrl}/pokemon/:${id}`).toPromise()
  }



  // getPokemonsTypes(types) {
  //   this.arrTypes = this.arrPokemon.
  // }

  // return new Promise((resolve, reject) => {
  //   resolve(this.filteredPokemon = this.arrPokemon.filter(types => {
  //     return types.type === ptype
  //   }))
  // })

  // getPokemonByName() {
  //   return this.httpClient.get(`${this.baseUrl}/pokemon`)
  // }

}
