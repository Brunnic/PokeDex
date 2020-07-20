import axios from "axios";
import {
    GET_POKEMON,
    GET_POKEMONS,
    POKEMON_ERROR
} from "./types";

const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

export const getPokemons = (limit, offset) => async dispatch => {

    try {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, config);

        const pokemonInfo = [];
        var index = offset + 1;

        for(let i = 1; i <= limit; i++) {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`, config);
            pokemonInfo.push(res.data);
            index++;
        }

        dispatch({
            type: GET_POKEMONS,
            payload: {
                result: result.data,
                pokeInfo: pokemonInfo
            }
        });

    } catch (err) {

        dispatch({
            type: POKEMON_ERROR,
            payload: err
        });
        
    }
}

export const getPokemon = id => async dispatch => {

    try {
        const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`, config);

        dispatch({
            type: GET_POKEMON,
            payload: result.data
        });

    } catch (err) {
        
        dispatch({
            type: POKEMON_ERROR,
            paylaod: err
        });
        
    }
}