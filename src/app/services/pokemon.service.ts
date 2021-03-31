import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  baseUrl: string;
  arrPokemon: Pokemon[];

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://pokeapi.co/api/v2';
  }

  getAllPokemon() {
    return this.httpClient.get(`${this.baseUrl}/pokemon`).toPromise()
  }

  getPokemonByUrl(url) {
    return this.httpClient.get(url).toPromise()
  }

}
