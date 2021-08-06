import React from "react";
import {Link, Redirect} from "react-router-dom";
import UserService from "../../service/UserService";
import WithAuth from "../../service/WithAuth";
import {Col, Jumbotron, Row} from "react-bootstrap";

class UserPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
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
            <div style={padding}>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <h1>User Actions</h1>

                <Jumbotron>
                    <Row>
                        <Col><Link to={'/user/register'} className={'btn btn-primary btn-block'}>Add User</Link></Col>
                        <Col><Link to={'/user/allUsers'} className={'btn btn-secondary btn-block'}>View All Users</Link></Col>
                        <Col><Link to={'/user/deleteUsers'} className={'btn btn-danger btn-block'}>Delete Users</Link></Col>
                        <Col><Link to={'/user/resetPassword'} className={'btn btn-secondary btn-block'}>Reset Passwords</Link></Col>
                    </Row>
                </Jumbotron>






            </div>
        );
    }

}

export default WithAuth(UserPage);