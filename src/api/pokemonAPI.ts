import axios from "axios";

const pokemonAPI = axios.create({
    baseURL: 'https://beta.pokeapi.co/graphql/v1beta',
    headers:{
        "Content-Type": "application/json",
        "X-Method-Used": "graphiql"
    }
})

export default pokemonAPI