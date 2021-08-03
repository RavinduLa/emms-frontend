import React from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";

import DepartmentFilter from "./DepartmentFilter";
import LocationFilter from "./LocationFilter";
import SupplierFilter from "./SupplierFilter";

import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";
import {Redirect} from "react-router-dom";

class InventoryFilter2 extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.resetInventoryFilter=this.resetInventoryFilter.bind(this);
        this.submitFilter=this.submitFilter.bind(this);

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }
        else{
            this.state.currentUser.roles.map((e) => {
                if (e == 'LEADER'){
                    this.state.permission = 'permitted';
                }
                else if(e== 'VIEWER'){
                    this.state.permission = 'permitted';
                }
                else {
                    this.state.permission = 'notPermitted';
                }
                console.log("Role : ",e);
            });
        }



        console.log("Permission : ", this.state.permission);
    }

    initialState = {

        filterOption: 'department',

        permission:'notPermitted',
        currentUser:''
    }

    componentDidMount(){

    }

    resetInventoryFilter=(event) => {
        event.preventDefault();
    }

    changeSelection=(event)=>{
        event.preventDefault();
        this.setState({filterOption: event.target.value})
    }

    submitFilter=(event) => {

    }

    render() {
        const padding={
            padding:'10px'
        }
        const paddingLeft={
            paddingLeft: '10px'
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
                        <Col>
                    <Form onReset={this.resetInventoryFilter.bind(this)} onSubmit={this.submitFilter.bind(this)}>
                            <Form.Group as={Row}>
                                <Form.Label column sm="1">Filter By</Form.Label>

                                <Col sm="7">

                                    <Form.Control
                                        as={"select"} required name={'selectFIlterOption'}
                                        value={this.state.filterOption}
                                        onChange={this.changeSelection.bind(this)}>

                                        <option value={'department'}>Department</option>
                                        <option value={'location'}>Location</option>
                                        <option value={'supplier'}>Supplier</option>

                                    </Form.Control>

                                </Col>


                            </Form.Group>


                    </Form>
                        </Col>


                    </Row>
                    <Row>
                        <Col>
                            {
                                this.state.filterOption === 'department'?
                                    <DepartmentFilter />:
                                    this.state.filterOption === 'location'?
                                        <LocationFilter />:
                                        <SupplierFilter />
                            }
                        </Col>
                    </Row>


                </div>
            </div>
        );
    }

}
export default WithAuth(InventoryFilter2);