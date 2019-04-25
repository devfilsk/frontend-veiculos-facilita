import React, {useState} from 'react';
import {
    Nav,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {Link} from 'react-router-dom';

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    };

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Facilita Veículos</NavbarBrand>
            <NavbarToggler onClick={toggle}/>
            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {/*<NavLink href={'/veiculos'} >Veículos</NavLink>*/}
                        <Link className='nav-link' to={'/veiculos'}>Veículos</Link>
                    </NavItem>
                    <NavItem>
                        <Link className='nav-link' to="/novo-veiculo">Novo Veículo</Link>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                            Options
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                Option 1
                            </DropdownItem>
                            <DropdownItem>
                                Option 2
                            </DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem>
                                Reset
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Collapse>
        </Navbar>
    );

}

export default Header;
