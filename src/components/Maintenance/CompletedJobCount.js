import React from "react";
import {Card} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import UserService from "../../service/UserService";

class CompletedJobCount extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.intitialState;
        this.state = {
            completedJobCount:''
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
            this.state.currentUser.roles.some((e) => {
                if (e == 'LEADER'){
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

    componentDidMount() {
        const LOCALHOST_URL =  "http://localHost:8080/api/completedJobCount";
        const URL_COMPLETED_JOBS = global.con + "/api/completedJobCount"

        if (this.state.permission == 'permitted'){
            axios.get(LOCALHOST_URL)
                .then( response => response.data)
                .then( (data) => {
                    this.setState( {completedJobCount: data});

                }).catch( (error) =>
            {
                console.log(error);
            })
        }

    }

    intitialState ={
        completedJobCount:''
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
                        <Card.Header className={'bg-success'}>Completed Jobs</Card.Header>
                        <Card.Body className={'text-black-50'}>
                            {this.state.completedJobCount}
                        </Card.Body>
                    </Card>
                </Link>

            </div>
        )
    }

}

export default CompletedJobCount;