import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import Veiculos from "../veiculos/Veiculos";
import Header from "../Header";
import NovoVeiculo from "../veiculos/NovoVeiculo";

const Default = () => {
    return (
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/veiculos" name="Home" component={Veiculos}/>
                <Route path="/novo-veiculo" name="Home" component={NovoVeiculo}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Default;
