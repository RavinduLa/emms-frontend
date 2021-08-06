import React from "react";
import WithAuth from "../../../service/WithAuth";
import UserService from "../../../service/UserService";
import {Link, Redirect} from "react-router-dom";
import {Col, Jumbotron, Row} from "react-bootstrap";

class EquipmentCondemnLanding extends React.Component{

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
            this.state.currentUser.roles.map((e) => {
                if (e == 'LEADER'){
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

    initialState={

        permission:'notPermitted',
        currentUser:''

    }

    render() {
        const padding={
            padding:'20px'
        }
        return (
            <div>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }
                <div style={padding}>
                    <Jumbotron>
                        <center>
                            <Row>
                                <Col>
                                    <Link className={'btn btn-secondary btn-block'} to={'/inventory/condemnRequest'}>
                                        Request Equipment Condemn
                                    </Link>
                                    <Link className={'btn btn-danger btn-block'} to={'/inventory/condemnPendingEquipment'}>
                                        Condemn Pending List
                                    </Link>

                                </Col>
                                <Col>
                                    <Link className={'btn btn-warning btn-block'} to={'/inventory/condemnedEquipment'}>
                                        Condemned Equipment
                                    </Link>
                                </Col>
                            </Row>
                        </center>
                    </Jumbotron>

                </div>

            </div>
        );
    }


}
export default WithAuth(EquipmentCondemnLanding);