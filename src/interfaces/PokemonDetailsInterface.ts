export interface PokemonDetails {
    data: PokemonDetailsData;
}

export interface PokemonDetailsData {
    pokemon_v2_pokemon: PokemonDetailsV2Pokemon[];
}

export interface PokemonDetailsV2Pokemon {
    base_experience:         number;
    height:                  number;
    pokemon_v2_pokemonmoves: PokemonV2Pokemonmove[];
}

export interface PokemonV2Pokemonmove {
    level:           number;
    pokemon_v2_move: PokemonV2Move;
}

export interface PokemonV2Move {
    accuracy:        number | null;
    contest_type_id: number | null;
    name:            string;
    power:           number | null;
    pp:              number;
}
