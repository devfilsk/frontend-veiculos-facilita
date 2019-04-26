import React, {useState, useEffect} from 'react';
import {Button, FormGroup, Label, Input, FormFeedback, FormText, Row, Col} from "reactstrap";
import NumberFormat from 'react-number-format'
import api from "../../services/api";
import Toastr from "../../helpers/toastr";


const NovoVeiculo = (props) => {

    const [cores, setCores] = useState([]);
    const [marcas, setMarcas] = useState([]);

    //inputs
    const [modelo, setModelo] = useState('');
    const [chassi, setChassi] = useState('');
    const [anoFabricacao, setAnoFabricacao] = useState('');
    const [anoModelo, setAnoModelo] = useState('');
    const [codigoFipe, setCodigoFipe] = useState('');
    const [valor, setValor] = useState('');
    const [marca, setMarca] = useState('0');
    const [cor, setCor] = useState('0');

    // carregar o contexto do componente
    useEffect(() => {
        getMarcas();

        getCores();

        loadEdit()
    }, []);


    const loadEdit = () => {
        if(props){
            setModelo(props.veiculo.modelo);
            setValor(props.veiculo.valor);
            setChassi(props.veiculo.chassi);
            setCodigoFipe(props.veiculo.codigo_fipe)
            setAnoModelo(props.veiculo.ano_modelo)
            setAnoFabricacao(props.veiculo.ano_fabricacao)
            setMarca(props.veiculo.marca.marca)
            setCor(props.veiculo.cor.cor)

        }else{

        }
    }

    //Marcas do banco de dados para popular o select
    const getMarcas = () => {
        api.get('/api/app/marcas')
            .then(res => res)
            .then(res => {
                if (res.status === 200) {
                    setMarcas(res.data)
                }
            })
    };

    //Cores do banco de dados para popular o select
    const getCores = () => {
        api.get('/api/app/cores')
            .then(res => res)
            .then(res => {
                if (res.status === 200) {
                    setCores(res.data);
                }
            })
    };

    const getCorOption = (value) => {
        if (marca !== '') {
            switch (marca) {
                case '1':
                    //se for fiat somente serão exibidas as cores preto e branco
                    if (value.cor === 'preto' || value.cor === 'branco') {
                        return <option key={value.cor} className='text-capitalize' value={value.id}>{value.cor}</option>
                    } else {
                        return '';
                    }
                case '2':
                    if (value.cor === 'prata') {
                        return <option key={value.cor} className='text-capitalize' value={value.id}>{value.cor}</option>
                    } else {
                        return ''
                    }
                case '3':
                    return <option key={value.cor} className='text-capitalize' value={value.id}>{value.cor}</option>
                default :
                    return ''
            }
        }
    };

    const validaCampos = () => {
        let valid = true;
        let dados = [
            {name: 'modelo', value: modelo, modelo: modelo},
            {name: 'chassi', value: chassi, chassi: chassi},
            {name: 'ano_fabricacao', value: anoFabricacao, ano_fabricacao: anoFabricacao},
            {name: 'ano_modelo', value: anoModelo, ano_modelo: anoModelo},
            {name: 'codigo_fipe', value: codigoFipe, codigo_fipe: codigoFipe},
            {name: 'valor', value: valor, valor: valor},
            {name: 'marca', value: marca, marca: marca},
            {name: 'cor', value: cor, cor: cor}
        ];
        dados.map((valor) => {
            switch (valor.name) {
                case 'modelo':
                    valor.value.length < 3 ? valid = false : valid = true;
                    break;
                case 'chassi':
                    valor.value.length < 17 || valor.value.length > 17 ? valid = false : valid = true;
                    break;
                case 'ano_fabricacao':
                    valor.value.length < 4 || valor.value.length > 4 ? valid = false : valid = true;
                    break;
                case 'ano_modelo':
                    valor.value.length < 4 || valor.value.length > 4 ? valid = false : valid = true;
                    break;
                case 'codigo_fipe':
                    valor.value.length < 7 || valor.value.length > 7 ? valid = false : valid = true;
                    break;
                case 'valor':
                    valor.value.length < 4 ? valid = false : valid = true;
                    break;
                case 'marca':
                    valor.value === '0' ? valid = false : valid = true;
                    break;
                case 'cor':
                    valor.value === '0' ? valid = false : valid = true;
                    break;
                default:
                    break;
            }
        });

        //se for válido, chama o método que envia os dados para a API para serem cadastrados no banco de dados
        if (valid) {
            save();
        } else {
            Toastr('warning', 'OPS. Preencha todos os campos!', 'Todos os campos devem estar na cor verde para prosseguir com o cadastro')
        }

    };

    const save = () => {
        let dados = {
            modelo: modelo,
            chassi: chassi,
            ano_fabricacao: anoFabricacao,
            ano_modelo: anoModelo,
            codigo_fipe: codigoFipe,
            valor: valor,
            id_marca: marca,
            id_cor: cor
        };
        api.post('/api/app/veiculos', dados)
            .then(res => res)
            .then(res => {
                console.log("Resposta da API: ", res)
                if(res.status === 200) {
                    Toastr('success', 'Veículo cadastrado com sucesso');
                    props.history.push("/");
                }
            })
    };

    return (
        <div>
            <Row>
                <Col sm={6} md={4}>
                    <FormGroup>
                        <Label for="exampleEmail">Modelo do veículo</Label>
                        <Input name='modelo'
                               onChange={e => setModelo(e.target.value)}
                               value={modelo}
                               invalid={modelo !== '' && modelo.length <= 3}
                               valid={modelo.length > 3}
                        />

                        <FormFeedback>Minimo de 4 caractéres</FormFeedback>
                    </FormGroup>
                </Col>
                <Col sm={6} md={4}>
                    <FormGroup>
                        <Label for="exampleEmail">Chassi</Label>
                        <Input name='chassi'
                               value={chassi}
                               onChange={e => setChassi(e.target.value)}
                               invalid={chassi !== '' && chassi.length !== 17}
                               valid={chassi.length === 17}
                        />

                        <FormFeedback>Campo deve conter 17 caracteres com letras e numeros</FormFeedback>
                        {/*<FormText>Este campo deve conter 17 caracteres.</FormText>*/}
                    </FormGroup>
                </Col>
                <Col sm={6} md={4}>
                    <FormGroup>
                        <Label for="exampleEmail">Ano de Fabricação</Label>
                        <Input name='ano_fabricacao'
                               value={anoFabricacao}
                               onChange={e => setAnoFabricacao(e.target.value.replace(/[^0-9]/gi, ''))}
                               invalid={anoFabricacao !== '' && anoFabricacao.length !== 4}
                               valid={anoFabricacao.length === 4}
                        />
                        <FormFeedback>O ano de fabricação deve conter 4 caracteres</FormFeedback>
                        <FormText>Ex: 2019.</FormText>
                    </FormGroup>
                </Col>
                <Col sm={6} md={4}>
                    <FormGroup>
                        <Label for="exampleEmail">Ano Modelo</Label>
                        <Input name='ano_modelo'
                               value={anoModelo}
                               onChange={e => setAnoModelo(e.target.value.replace(/[^0-9]/gi, ''))}
                               invalid={anoModelo !== '' && anoModelo.length !== 4}
                               valid={anoModelo.length === 4}
                        />
                        <FormFeedback>O ano do modelo deve conter 4 caracteres</FormFeedback>
                        <FormText>Ex: 2019.</FormText>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col sm={6} md={4}>
                    <FormGroup>
                        <Label for="exampleEmail">Código Fipe</Label>
                        <Input name='codigo_fipe'
                               value={codigoFipe}
                               onChange={e => setCodigoFipe(e.target.value.replace(/[^0-9]/gi, ''))}
                               invalid={codigoFipe !== '' && codigoFipe.length !== 7}
                               valid={codigoFipe.length === 7}
                        />
                        <FormFeedback>7 caracteres numericos obrigatório!</FormFeedback>
                        <FormText>Este campo deve conter 7 caractéres.</FormText>
                    </FormGroup>
                </Col>

                <Col sm={6} md={4}>
                    <FormGroup>
                        <Label for="exampleEmail">Valor do veículo</Label>
                        <NumberFormat
                            className={`form-control
                                ${valor !== '' && valor.length < 4 ? 'is-invalid' : ''}
                                ${valor.length > 4 ? 'is-valid' : ''}`}
                            id="valor" name="valor"
                            value={valor}
                            thousandSeparator={true} prefix={'R$'} isNumericString={true}
                            onChange={e => setValor(e.target.value.replace(/\D+/g, ''))}
                            placeholder={'R$ 00,00'}
                        />
                        <FormFeedback>Valor mínimo com 4 caracteres</FormFeedback>
                    </FormGroup>
                </Col>

                <Col sm={6} md={4}>
                    <FormGroup>
                        <Label for="input-marca">Marca</Label>
                        <Input type="select"
                               className={`${marca !== '0' ? 'is-valid' : ''}`}
                               name="select" id="input-marca"
                               onChange={e => setMarca(e.target.value)}
                               defaultValue={marca}>
                            <option value={'0'}>Selecione uma marca</option>
                            {
                                marcas.map((value, index) => (
                                    <option key={`${value.marca}`} className='text-capitalize'
                                            value={value.id}>{value.marca}</option>
                                ))
                            }
                        </Input>
                    </FormGroup>
                </Col>

                <Col sm={6} md={4}>
                    <FormGroup>
                        <Label for="input-cor">Cores</Label>
                        <Input type="select"
                               className={`${cor !== '0' ? 'is-valid' : ''}`}
                               name="select"
                               id="input-cor"
                               onChange={e => setCor(e.target.value)}
                               defaultValue={cor}>
                            <option value={'0'}>Selecione uma cor</option>
                            {
                                marca !== ''
                                    ? cores.map((value, index) => (
                                        getCorOption(value)
                                    ))
                                    : ''
                            }
                        </Input>
                        <FormText>Você precisa antes selecionar uma marca!</FormText>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <FormGroup>
                        <Button onClick={validaCampos}>CADASTRAR</Button>
                    </FormGroup>
                </Col>
            </Row>
        </div>
    )
};

export default NovoVeiculo;
