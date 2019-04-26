import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Veiculos from "../veiculos/Veiculos";
import Header from "../Header";
import NovoVeiculo from "../veiculos/NovoVeiculo";
import {Container} from "reactstrap";
import Vender from "../vendas/Vender";
import EditVeiculo from "../veiculos/EditVeiculo";

const Default = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Container >
                <Switch>
                    <Route path="/" exact={true} name="Veiculo" component={Veiculos}/>
                    <Route path="/novo-veiculo" name="Novo Veículo" component={NovoVeiculo}/>
                    <Route path="/veiculos/:id" name="Veiculo" component={EditVeiculo}/>
                    <Route path="/vender/:id" name="Vender" component={Vender}/>
                </Switch>
            </Container>
        </BrowserRouter>
    )
};

export default Default;
