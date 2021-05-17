import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

class PendingJobCount extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.intitialState;
        this.state = {
            pendingJobCount:''
        }
    }

    componentDidMount() {
        const LOCALHOST_URL =  "http://localHost:8080/api/pendingJobCount";
        const URL_PENDING_JOBS = global.con + "/api/pendingJobCount";
        axios.get(URL_PENDING_JOBS)
            .then( response => response.data)
            .then( (data) => {
                this.setState( {pendingJobCount: data});

            }).catch( (error) =>
        {
            alert(error);
        })
    }

    intitialState ={
        pendingJobCount:''
    }

    render() {
        return(
            <div>
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

export default PendingJobCount;