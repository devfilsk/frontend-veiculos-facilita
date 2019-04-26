import React, {useState, useEffect} from 'react';
import {Table, Button, Container} from 'reactstrap'
import api from "../../services/api";
import Toastr from "../../helpers/toastr";
import {Link} from 'react-router-dom';


const Veiculos = () => {

    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        api.get('/api/app/veiculos')
            .then(res => res)
            .then(res => {
                console.log("Resposta: ", res)
                if (res.status === 200) {
                    setVeiculos(res.data)
                }
            })
    }, []);

    const deleteVeiculo = (id) => {
        api.delete(`/api/app/veiculos/${id}`)
            .then(res => res)
            .then(res => {
                console.log(res)
                if (res.data) {
                    veiculos.map((valor, i) => {
                        if (valor.id === id) {
                            let array = veiculos.slice(0);
                            array.splice(i, 1);
                            setVeiculos(array);
                            Toastr('success', "Veículo removido com sucesso!")
                        }
                    })
                }
            });
    }

    return (
        <div>
            <h3 className='display-auto-auto'>Veículos Cadastrados</h3>
            <Table dark>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Veículo</th>
                    <th>Marca</th>
                    <th>Cor</th>
                    <th>Valor</th>
                    <th>Fabricação</th>
                    <th>Ano do modelo</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                {
                    veiculos.map((veiculo, i) => (
                        <tr key={i}>
                            <th scope="row">{veiculo.id}</th>
                            <td className={'text-capitalize'}>{veiculo.modelo}</td>
                            <td className={'text-capitalize'}>{veiculo.marca.marca}</td>
                            <td className={'text-capitalize'}>{veiculo.cor.cor}</td>
                            <td className={'text-capitalize'}>{veiculo.valor}</td>
                            <td>{veiculo.ano_fabricacao}</td>
                            <td>{veiculo.ano_modelo}</td>
                            <td>
                                <Link to={`/veiculos/${veiculo.id}`}>
                                    <Button outline color="primary">
                                        Editar
                                    </Button>{' '}
                                </Link>
                                <Button outline color="danger" onClick={() => deleteVeiculo(veiculo.id)}>
                                    Excluir
                                </Button>{' '}
                                <Link to={`/vender/${veiculo.id}`}>
                                    <Button outline color="success">
                                        Vender
                                    </Button>{' '}
                                </Link>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    )

};

export default Veiculos;
