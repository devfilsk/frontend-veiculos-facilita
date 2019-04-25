import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


const Header = () => {

    return (
        <Nav>
            <NavItem>
                <NavLink href={'/veiculos'} >Veículos</NavLink>
            </NavItem>

            <NavItem>
                <NavLink href="/novo-veiculo">Novo Veículo</NavLink>
            </NavItem>
        </Nav>
        // <Nav>
        //     <NavItem>
        //         <Link to={'/veiculos'} >Veículos</Link>
        //     </NavItem>
        // </Nav>
    );

}

export default Header;
