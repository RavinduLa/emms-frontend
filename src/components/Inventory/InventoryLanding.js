import React from "react";
import {Link, Redirect} from "react-router-dom";
import InventorySearch from "./InventorySearch";
import {Col, Row,Jumbotron} from "react-bootstrap";
import InventorySearchSN from "./InventorySearchSN";
import DepartmentFilter from "./DepartmentFilter"
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";

class InventoryLanding extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }

        this.state.currentUser.roles.map((e) => {
            if (e == 'LEADER'){
                this.state.permission = 'permitted';
            }
            else if(e== 'VIEWER'){
                this.state.permission = 'permitted';
            }
            console.log("Role : ",e);
        });

        console.log("Permission : ", this.state.permission);

    }

    initialState={
        permission:'notPermitted',
        currentUser:''
    }

    componentDidMount() {
    }

    render() {
        const padding={
            padding:'20px'
        }
        const padding2={
            padding:'10px'
        }
        return (
            <div>

                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <div style={padding2}>


                <div>

                        <Row>
                            <Col>
                                <Link to={'/addInventory'}>Add Inventory</Link>
                            </Col>
                            <Col>
                                <Link to={'/inventory'}>View Full Inventory</Link>
                            </Col>
                            <Col>
                                <Link to={'/inventoryFilter2'}>Filter Inventory</Link>
                            </Col>

                            <Col>
                                <Link to={'/departmentFilter'}>Filter By Department</Link>
                            </Col>

                            <Col>
                                <Link to={'/locationFilter'}>Filter By Location</Link>
                            </Col>

                            <Col>
                                <Link to={'/supplierFilter'}>Filter By Supplier</Link>
                            </Col>
                        </Row>


                </div>


                <Row>
                    <Col><InventorySearch/></Col>
                    <Col><InventorySearchSN/></Col>
                </Row>

                </div>
            </div>
        );
    }


}
export default WithAuth(InventoryLanding);