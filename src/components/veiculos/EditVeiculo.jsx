import React, {useEffect, useState} from 'react';
import api from "../../services/api";
import Toastr from "../../helpers/toastr";
import FormVeiculo from "./FormVeiculo";

const EditVeiculo = (props) => {
    let initState = {
        ano_fabricacao: "",
        ano_modelo: "",
        chassi: "",
        codigo_fipe: "",
        cor: [],
        created_at: null,
        id: 1,
        id_cor: "",
        id_marca: "",
        marca: [],
        modelo: "",
        status: "",
        valor: ""
    };
    const [veiculo, setVeiculo] = useState(initState);

    useEffect(() => {
        getVeiculo();
    }, []);

    const getVeiculo = () => {
        api.get(`/api/app/veiculos/${props.match.params.id}`)
            .then(res => res)
            .then(res => {
                setVeiculo(res.data)
            });
    };

    const save = (dados) => {

        api.put(`/api/app/veiculos/${props.match.params.id}`, dados)
            .then(res => res)
            .then(res => {
                if(res.status === 200) {
                    Toastr('success', 'Veículo alterado com sucesso');
                    props.history.push("/");
                }
            })
    };

    return (
        <div>
            {
                veiculo.modelo !== '' ?
                    (
                        <FormVeiculo save={save} veiculo={veiculo}/>
                    ) :
                    ''
            }
        </div>
    )
};

export default EditVeiculo;
