import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Pokemons from "./Pokemons/Pokemons";
import Landing from './layout/Landing/Landing';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/pokemons" exact component={Pokemons} />
            </Switch>
        </Router>
    )
}

export default Routes;
