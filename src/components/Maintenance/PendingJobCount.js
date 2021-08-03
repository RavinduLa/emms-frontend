import React from "react";
import {Card} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";

class PendingJobCount extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.intitialState;
        this.state = {
            pendingJobCount:''
        }
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

    componentDidMount() {
        const LOCALHOST_URL =  "http://localHost:8080/api/pendingJobCount";
        const URL_PENDING_JOBS = global.con + "/api/pendingJobCount";

        if (this.state.permission == 'permitted'){
            axios.get(URL_PENDING_JOBS)
                .then( response => response.data)
                .then( (data) => {
                    this.setState( {pendingJobCount: data});

                }).catch( (error) =>
            {
                console.log(error);
            });
        }

    }

    intitialState ={
        pendingJobCount:''
    }

    render() {
        return(
            <div>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }
                <Link to={'/maintenance'} className={'bg-info text-white'}>
                    <Card >
                        <Card.Header className={'bg-warning'}>Pending Jobs</Card.Header>
                        <Card.Body className={'text-black-50'}>
                            {this.state.pendingJobCount}
                        </Card.Body>
                    </Card>
                </Link>

            </div>
        )
    }

}

export default WithAuth(PendingJobCount);