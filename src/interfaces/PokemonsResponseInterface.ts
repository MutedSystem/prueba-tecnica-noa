import { PokemonV2Type } from "./TypeResponseInteface";

export interface PokemonsResponse {
    data: PokemonData;
}

export interface PokemonData {
    pokemon_v2_pokemon: PokemonV2Pokemon[];
}

export interface PokemonV2Pokemon {
    id:                      number;
    height:                  number;
    name:                    string;
    pokemon_v2_pokemontypes: PokemonV2Pokemontype[];
    weight:                  number;
}

export interface PokemonV2Pokemontype {
    pokemon_v2_type: PokemonV2Type;
}
