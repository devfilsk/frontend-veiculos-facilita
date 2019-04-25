import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Veiculos from "../veiculos/Veiculos";
import Header from "../Header";
import NovoVeiculo from "../veiculos/NovoVeiculo";
import {Container} from "reactstrap";

const Default = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Container fluid={true}>
                <Switch>
                    <Route path="/veiculos" name="Home" component={Veiculos}/>
                    <Route path="/novo-veiculo" name="Home" component={NovoVeiculo}/>
                </Switch>
            </Container>
        </BrowserRouter>
    )
};

export default Default;
