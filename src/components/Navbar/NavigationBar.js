import React from 'react';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

import {Link} from 'react-router-dom';
import UserService from "../../service/UserService";

class NavigationBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.currentUser =''

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;

        //console.log("Current user role : ", this.state.currentUser.roles)

    }

    initialState= {

    }


    render() {
        return(
            <Navbar bg='warning' variant='light'>

                <Link to={"/"} className={'navbar-brand'}>
                    EMMS
                </Link>

                <Nav className="mr-auto">
                    <Link to={"/dashboard-admin"} className='nav-link'>Dashboard</Link>
                    {/*<Link to={"/inventory"} className='nav-link'>Inventory</Link>*/}

                        <NavDropdown title="Inventory" id="basic-nav-dropdown">
                            <Link to={"/inventoryLanding"} className={'dropdown-item'}>Inventory</Link>
                            <Link to={"/addInventory"} className={'dropdown-item'}>Add Inventory</Link>
                            <Link to={"/inventory"} className={'dropdown-item'}>All Inventory</Link>
                            <Link to={"/inventoryFilter2"} className={'dropdown-item'}>Inventory Filters</Link>
                            <Link to={"/warrantyFilter"} className={'dropdown-item'}>Warranty Info</Link>

                        </NavDropdown>

                    <Link to={"/maintenance"} className='nav-link'>Maintenance</Link>

                    {
                        this.state.currentUser != null?
                        this.state.currentUser.roles == 'LEADER'?
                            <Link to={"/leaderPage"} className='nav-link'>Leader</Link>:
                            this.state.currentUser.roles == 'ADMIN'?
                                <Link to={"/admin"} className='nav-link'>Admin</Link> :
                                <div></div>:
                            <div></div>

                    }

                    {/*<Link to={"/departments"} className='nav-link'>Departments</Link>
                    <Link to={"/testForm"} className='nav-link'>Test</Link>*/}
                    {/*<Link to={"/admin"} className='nav-link'>Admin</Link>*/}
                </Nav>

            </Navbar>
        );
    }
}

export default NavigationBar;