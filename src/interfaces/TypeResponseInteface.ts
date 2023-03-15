export interface TypesResponse {
    data: Data;
}

export interface Data {
    pokemon_v2_type: PokemonV2Type[];
}

export interface PokemonV2Type {
    id:   number;
    name: string;
}
