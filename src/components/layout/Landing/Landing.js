import React, { Fragment, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getPokemons, getPokemon } from "../../../actions/pokemons";

import Pokemon from "../../Pokemons/Pokemon";
import "./Landing.css"

const Landing = ({ getPokemons, pokemons, loading, getPokemon, pokemon }) => {


    useEffect(() => {
        getPokemons(4,0);
    }, [getPokemons]);

    return (
        
        <Fragment>
            <div className="jumbotron">
                <h1 className="display-4">PokeDex!</h1>
                <hr/>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi non itaque, voluptatem omnis explicabo odit?</p>
                <Link className="btn btn-primary btn-lg" to="/pokemons?page=1" role="button">Check All Pokemons</Link>
            </div>

            <div className="splitter"></div>
            <h1>Examples</h1>
            {loading ? "loading..." : 
                <div className="row">
                    {pokemons.result.results.map((poke, i) => (
                        <div key={i} className="col-md-3 col-sm-6 text-center">
                            <Pokemon img={pokemons.pokeInfo[i].sprites.front_default} name={poke.name} />
                        </div>
                    ))}
                </div>
            }
        </Fragment>
        
    )
}

const mapStateToProps = state => ({
    pokemons: state.pokemons.pokemons,
    loading: state.pokemons.loading,
    pokemon: state.pokemons.pokemon,
});

export default connect(mapStateToProps, { getPokemons, getPokemon })(Landing);
