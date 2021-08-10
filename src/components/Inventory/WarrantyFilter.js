import React from "react"
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";

import WarrantyPresentEquipment from "./WarrantyPresentEquipment";
import WarrantyAbsentEquipment from "./WarrantyAbsentEquipment";

import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";
import {Redirect} from "react-router-dom";

class WarrantyFilter extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.initialState;

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }
        else {
            this.state.currentUser.roles.some((e) => {
                if (e == 'LEADER'){
                    this.state.permission = 'permitted';
                    return true;
                }
                else if(e== 'VIEWER'){
                    this.state.permission = 'permitted';
                    return true;
                }
                else {
                    this.state.permission = 'notPermitted';
                }
                console.log("Role : ",e);
            });
        }

        console.log("Permission : ", this.state.permission);

    }

    initialState={

        equipmentUnderWarranty:[],
        equipmentNoWarranty: [],

        permission:'notPermitted',
        currentUser:''
    }

    componentDidMount(){

    }

    render() {
        const padding={
            padding:'10px'
        }
        return (
            <div>

                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <div style={padding}>
                <Row>
                    <Col> <WarrantyPresentEquipment /> </Col>
                    <Col> <WarrantyAbsentEquipment /> </Col>
                </Row>
                </div>

            </div>
        );
    }

}

export default WithAuth(WarrantyFilter);