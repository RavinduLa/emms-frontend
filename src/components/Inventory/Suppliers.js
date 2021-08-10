import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, Col, Row,Jumbotron} from "react-bootstrap";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";

class Suppliers extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.permission = 'notPermitted';
        this.state.currentUser = '';

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;

        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }

        else {
            this.state.permission = 'notPermitted';
        }

    }

    initialState={}
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div>
                    <Jumbotron>
                        <Row>
                            <Col>
                                <Link className={'btn btn-primary btn-block'} to={'/addSupplier'}>Add new Suppliers</Link>  <br/>
                            </Col>
                            <Col>
                                <Link className={'btn btn-primary btn-block'} to={'/supplierList'}>View Suppliers</Link>  <br/>
                            </Col>
                        </Row>


                    </Jumbotron>
                </div>
            </div>
        );
    }

}

export default WithAuth(Suppliers);