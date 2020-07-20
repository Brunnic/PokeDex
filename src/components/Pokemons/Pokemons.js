import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import qs from "query-string";
import { Pagination } from "react-bootstrap";

import Pokemon from "./Pokemon";

import { getPokemons } from "../../actions/pokemons";

const Pokemons = ({ getPokemons, pokemons, loading, location }) => {

    const max = 20;
    var offset = 0;
    const page = qs.parse(location.search, { parseFragmentIdentifier: false }).page;
    var pages = [];

    useEffect(() => {
        if(!page) {
            window.location = `${window.location}?${qs.stringify({ page: "1"})}`
        }
    }, [page]);

    const onClickPage = (i) => {
        window.location.search = `${qs.stringify({ page: i })}`
    }

    const pagination = (count, pokemons) => {
        for(let i = 1; i <= (count / max); i++) {
            pages.push (
                <Pagination.Item onClick={() => onClickPage(i)} key={i} active={ i === parseInt(qs.parse(location.search, { parseFragmentIdentifier: false }).page)} >
                    {i}
                </Pagination.Item>
            )
        }

        // Page is 5
        // The pagination should show only 2 more and less pages
        // 48 elements
        // we need to get 2 pages more than the initial page and less

        console.log(page);
        if(pokemons.result.next && pokemons.result.previous) {
            const filtered1 = pages.slice(parseInt(page) - 2, parseInt(page) + 1);
            filtered1.unshift(
                <Pagination.Ellipsis key={parseInt(page) - 4} />
            );
            filtered1.push(
                <Pagination.Ellipsis key={parseInt(page) + 3} />
            );
            filtered1.unshift(
                <Pagination.First key={parseInt(page) - 5} />
            );
            filtered1.push(
                <Pagination.Last key={parseInt(page) + 4} />
            );

            pages = filtered1;
        }
        else if(pokemons.result.next && !pokemons.result.previous) {
            const filtered2 = pages.slice(parseInt(page) - 1, parseInt(page) + 1);
            filtered2.unshift(
                <Pagination.First key={parseInt(page) - 5} />
            );
            filtered2.push(
                <Pagination.Ellipsis key={parseInt(page) + 3} />
            );
            filtered2.push(
                <Pagination.Last key={parseInt(page) + 4} />
            );

            pages = filtered2;
        }

    }

    useEffect(() => {
        var page = qs.parse(location.search, { parseFragmentIdentifier: false }).page;
        if(page <= 1) {
            offset = 0;
        }
        else if(page > 1) {
            offset = (page - 1) * max;
        }
        console.log("offset", offset);
        getPokemons(max, offset);
    }, [getPokemons]);

    return (
        <Fragment>
            <h1>Pokemons:</h1>
            <div className="row">
                {loading ? "loading..." :
                    <Fragment>
                        <Fragment>
                        {pokemons.result.results.map((poke, i) => (
                        <div key={i} className="col-md-3 col-sm-6 text-center">
                            <Pokemon img={pokemons.pokeInfo[i].sprites.front_default} name={poke.name} />
                        </div>
                    ))}
                    </Fragment>
                    {pagination(pokemons.result.count, pokemons)}
                    {<Pagination> {pages} </Pagination>}
                    </Fragment>
                }
            </div>
            
        </Fragment>
    )
}

const mapStateToProps = state => ({
    pokemons: state.pokemons.pokemons,
    loading: state.pokemons.loading
});

export default connect(mapStateToProps, { getPokemons })(withRouter(Pokemons));
