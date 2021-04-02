import { PokemonImage } from "./pokemon-image";
import { PokemonType } from "./pokemon-type";


export interface PokemonDetail {
    name: string,
    base_experience: number,
    height: number,
    types: PokemonType[],
    sprites: PokemonImage
}
