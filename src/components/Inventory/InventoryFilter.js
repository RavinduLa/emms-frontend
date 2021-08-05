import React from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";

import DepartmentFilter from "./DepartmentFilter"
import LocationFilter from "./LocationFilter"
import SupplierFilter from "./SupplierFilter"

import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";
import {Redirect} from "react-router-dom";

class InventoryFilter extends React.Component{
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

    componentDidMount(){

    }

    render() {
        return (
            <div>

                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }
                <Row>
                    <Col> <DepartmentFilter /> </Col>
                    <Col> <LocationFilter /></Col>
                    <Col> <SupplierFilter /></Col>
                </Row>
            </div>
        );
    }

}
export default WithAuth(InventoryFilter);