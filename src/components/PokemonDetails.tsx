import { pokemonAPI } from "@/api";
import { PokemonData } from "@/interfaces";
import { useEffect, useState } from "react"
import Image from "next/image";

const PokemonDetails = ({ showPokemonsInfo, pokemonDetails, children }) => {

    const [pokemonData, setPokemonData] = useState()

    useEffect(() => {

        // Cada vez que se cambie el pokemon a mostrar se obtine los detalles
        // desde la versión beta GraphQL de la pokemon API 

        const getPokemonData = async () => {
            const pokemonResponse = await pokemonAPI.post<PokemonData>("", {
                query: `
                query getPokemonDetailsQuery {
                    pokemon_v2_pokemon(where: {id: {_eq: ${pokemonDetails.id}}}) {
                        base_experience
                        height
                        pokemon_v2_pokemonmoves(where: {pokemon_id: {_eq: ${pokemonDetails.id}}}) {
                          level
                          pokemon_v2_move {
                            accuracy
                            name
                            power
                            pp
                          }
                        }
                      }
                    }                  
                `
            })

            setPokemonData(pokemonResponse.data)
        }

        getPokemonData()

    }, [pokemonDetails])

    return (
        <>
            <div className={`h-screen w-screen z-30 -mt-[100vh] flex items-center justify-center ${showPokemonsInfo}`}>
                <div className='backdrop-blur-2xl bg-white/30 w-[90vw] h-[90vh] z-40 rounded-[1vw] shadow 
                    sm:w-[90vw] sm:h-[90vh] 
                    md:w-[80vw] md:h-[80vh]
                    lg:w-[75vw] lg:h-[75vh]
                    xl:w-[50vw] xl:h-[50vh]
                    
                '>
                    <div className="w-[100%] p-[20px] grid">
                        <h1 className="justify-self-center font-bold text-xl grid-flow-row-dense h-0 font-size-xl">{pokemonDetails.name}</h1>
                        {children}
                    </div>
                    <div className="p-10 flex flex-col lg:flex-row items-center h-[85%]" style={{ justifyContent: 'space-around' }}>
                        <Image
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonDetails.id}.png`}
                            alt={"Pokemon image"}
                            className="w-[200px] h-[200px] ms:w-[150px] ms:h-[150px] bg-white rounded-[100px] p-1 md:my-[20px] bg-opacity-50"
                            width={100}
                            height={100}
                        />
                        <div className="w-[90%] h-[90%] md:w-[60%] lg:w-[50%]">
                            <div className="grid grid-rows-2 grid-flow-col">
                                <p className="font-bold">Experiencia base</p>
                                <p>{pokemonData?.data.pokemon_v2_pokemon[0].base_experience}</p>
                                <p className="font-bold">Altura</p>
                                <p>{pokemonData?.data.pokemon_v2_pokemon[0].height}</p>
                                <p className="font-bold">Peso</p>
                                <p>{pokemonDetails.weight}</p>
                                <p className="font-bold">Tipos</p>
                                <div>
                                    {
                                        pokemonDetails.pokemon_v2_pokemontypes.map((type, index) => {
                                            return (
                                                <>
                                                    <p key={"type-text-" + index}>{type.pokemon_v2_type.name}</p>
                                                </>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <h4 className="font-bold text-lg">Ataques</h4>
                            <div className="overflow-y-scroll h-[70%] bg-slate-500 rounded-[10px] mt-3 p-3">
                                {
                                    pokemonData?.data.pokemon_v2_pokemon[0].pokemon_v2_pokemonmoves.map((move, index) => {
                                        return (
                                            <>
                                                <div
                                                    key={"move-container-" + index}
                                                    className="my-3 shadow-md flex flex-col bg-gray-600 rounded-[10px] items-center p-2 justify-center"
                                                    style={{
                                                        justifyContent: 'space-around'
                                                    }}
                                                >
                                                    <p key={"move-title-" + index} className="font-bold mb-2">{move.pokemon_v2_move.name}</p>
                                                    <div
                                                        key={"move-description-" + index}
                                                        className="grid grid-rows-2 grid-flow-col space-x-5"
                                                    >
                                                        <p key={"level-title-" + index}>Nivel</p>
                                                        <p key={"level-" + index}> {move.level}</p>
                                                        <p key={"accuracy-title-" + index}>Precisión </p>
                                                        <p key={"accuracy-" + index}>{move.pokemon_v2_move.accuracy || "Nada"}</p>
                                                        <p key={"power-title-" + index}>Ataque</p>
                                                        <p key={"power-" + index}>{move.pokemon_v2_move.power || "Nada"}</p>
                                                        <p key={"pp-title-" + index}>PP</p>
                                                        <p key={"pp-" + index}>{move.pokemon_v2_move.pp}</p>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PokemonDetails