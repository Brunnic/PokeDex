import {
    GET_POKEMON,
    GET_POKEMONS,
    POKEMON_ERROR
} from  "../actions/types";

const initialState = {
    loading: true,
    error: null,
    pokemons: [],
    pokemon: {},
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_POKEMONS:
            return {
                ...state,
                loading: false,
                pokemons: payload
            }
        case GET_POKEMON:
            return {
                ...state,
                loading: false,
                pokemon: payload
            }
        case POKEMON_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
            }
        default:
            return state;
    }
}