import React from "react";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";
import {Col, Jumbotron, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

class LeaderPage extends React.Component{
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

    }

    render() {
        const padding={
            padding:'20px'
        }
        return (
            <div style={padding}>

                <Jumbotron>
                    <Row>
                        <Col>
                            <Link className={'btn btn-danger btn-block'} to={'/inventory/condemnRequest'}>Condemn Equipment</Link>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>

                </Jumbotron>

            </div>
        );
    }

}
export default WithAuth(LeaderPage);