import React from "react";
import {Card} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";

class OnGoingJobCount extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.intitialState;
        this.state = {
            onGoingJobCount:''
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
        const LOCALHOST_URL =  "http://localHost:8080/api/ongoingJobCount";
        const URL_ONGOINGJOBS = global.con + "/api/ongoingJobCount";

        if (this.state.permission == 'permitted'){
            axios.get(URL_ONGOINGJOBS)
                .then( response => response.data)
                .then( (data) => {
                    this.setState( {onGoingJobCount: data});

                }).catch( (error) =>
            {
                console.log(error);
            })
        }

    }

    intitialState ={
        onGoingJobCount:''
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
                        <Card.Header className={'bg-info'}>Ongoing Jobs</Card.Header>
                        <Card.Body className={'text-black-50'}>
                            {this.state.onGoingJobCount}
                        </Card.Body>
                    </Card>
                </Link>

            </div>
        )
    }

}

export default WithAuth(OnGoingJobCount);