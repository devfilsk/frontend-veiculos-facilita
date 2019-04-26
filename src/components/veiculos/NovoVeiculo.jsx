import React from 'react';
import api from "../../services/api";
import Toastr from "../../helpers/toastr";
import FormVeiculo from "./FormVeiculo";


const NovoVeiculo = (props) => {


    const save = (dados) => {

        api.post('/api/app/veiculos', dados)
            .then(res => res)
            .then(res => {
                if(res.status === 200) {
                    Toastr('success', 'Veículo cadastrado com sucesso');
                    props.history.push("/");
                }
            })
    };

    return (
        <div>
           <FormVeiculo save={save}/>
        </div>
    )
};

export default NovoVeiculo;
