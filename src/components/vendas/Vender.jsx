import React, {useState, useEffect} from 'react';
import {FormGroup, Input, Label, Row, Col, Container, Button, Badge} from 'reactstrap';
import NumberFormat from 'react-number-format'
import api from "../../services/api";
import './vender.scss';
import Toastr from "../../helpers/toastr";

const Vender = (props) => {

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
    const [roda, setRoda] = useState(false);
    const [valor, setValor] = useState(null);

    useEffect(() => {
        getVeiculo();
    }, []);

    const getVeiculo = () => {
        api.get(`/api/app/veiculos/${props.match.params.id}`)
            .then(res => res)
            .then(res => {
                console.log(res);
                setVeiculo(res.data);
            });
    };

    const getValueToSels = (marca) => {

        switch (marca) {
            case 'fiat':
                if (roda) {

                    return <span>
                        <NumberFormat
                            displayType={'text'}
                            id="valor" name="valor"
                            value={veiculo.valor + 1300}
                            thousandSeparator={true} prefix={'R$'} isNumericString={true}
                        /> + adicional de R$ 1300,00 Roda liga leve
                    </span>;
                } else {
                    return <span>
                        <NumberFormat
                            displayType={'text'}
                            id="valor" name="valor"
                            value={veiculo.valor}
                            thousandSeparator={true} prefix={'R$'} isNumericString={true}
                        />
                    </span>;
                }

            case 'hyundai':
                if(veiculo.cor.cor !== 'preto'){
                    let value = veiculo.valor - (veiculo.valor * 0.07);
                    return (
                        <span>
                            <NumberFormat
                                displayType={'text'}
                                id="valor" name="valor"
                                value={value}
                                thousandSeparator={true}
                                prefix={'R$'} isNumericString={true}
                            /> {'  '}
                            <Badge href="#" color="success">7% de desconto</Badge>
                        </span>
                    )
                }
                break;
            default:
                return (
                    <span>
                            <NumberFormat
                                displayType={'text'}
                                id="valor" name="valor"
                                value={veiculo.valor}
                                thousandSeparator={true}
                                prefix={'R$'} isNumericString={true}
                            /> {'  '}
                        </span>
                )
        }


    };

    const save = () => {
        let valor = document.getElementsByName('valor').value;
        let dados = {
            id_veiculo: props.match.params.id,
            roda_ligaleve: roda,
            valor_venda: veiculo.valor
        };
            console.log("dados", dados)
        api.post('/api/app/vendas', dados)
            .then(res => res)
            .then(res => {
                Toastr('success', 'Veículo vendido com sucesso');
                props.history.push('/');
                console.log("Vendido: ", res)
            })

    }

    return (
        <Container>
            <h3 className='display-auto-auto'>Venda de veículo</h3>
            <Row>
                <Col>
                    <ul className="list-group">
                        <li className="list-group-item">
                            Modelo: {veiculo.modelo}
                        </li>
                        <li className="list-group-item">
                            {
                                veiculo.cor ? (
                                    <p className='text-capitalize'>Cor: {veiculo.cor.cor}</p>
                                ) : ''
                            }
                        </li>

                        {
                            veiculo.cor.cor === 'preto' ? (
                                <li className="list-group-item">
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" id="checkbox2" name={'roda_ligaleve'}
                                                   onChange={e => setRoda(e.target.checked)}/>{' '}
                                            Roda Liga Leve
                                        </Label>
                                    </FormGroup>
                                </li>
                            ) : ''
                        }
                        <li className="list-group-item">
                            Valor do veículo: {' '}
                            {
                                getValueToSels(veiculo.marca.marca)
                            }
                        </li>
                        <li className="list-group-item">
                            <Button color="primary" size="lg" block onClick={save}>Finalizar Venda</Button>
                        </li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
};

export default Vender;
