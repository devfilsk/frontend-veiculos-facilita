import React, {useEffect, useState} from 'react';
import api from "../../services/api";
import NovoVeiculo from "./NovoVeiculo";

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
                console.log(res);
                setVeiculo(res.data)
            });
    };

    return (
        <div>
            <NovoVeiculo veiculo={veiculo}/>
        </div>
    )
};

export default EditVeiculo;
