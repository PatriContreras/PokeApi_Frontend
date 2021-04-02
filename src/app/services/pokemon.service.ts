import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';
import { PokemonDetail } from '../models/pokemon-detail';

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

    return this.httpClient.get(`${this.baseUrl}/pokemon?offset=0&limit=2000`).toPromise()
  }
  getPokemonByUrl(url): Promise<PokemonDetail> {
    return this.httpClient.get<PokemonDetail>(url).toPromise()
  }

  getPokemonComplete(id) {
    return this.httpClient.get(`${this.baseUrl}/pokemon/:${id}`).toPromise()
  }

  getTypes() {
    return this.httpClient.get(`${this.baseUrl}/type/`).toPromise()
  }




}
