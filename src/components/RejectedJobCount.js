import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

class RejectedJobCount extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.intitialState;
        this.state = {
            rejectedJobCount:''
        }
    }

    componentDidMount() {
        const LOCALHOST_URL =  "http://localHost:8080/api/rejectedJobCount";
        const URL_REJECTED_JOBS = global.con + "/api/rejectedJobCount";
        axios.get(URL_REJECTED_JOBS)
            .then( response => response.data)
            .then( (data) => {
                this.setState( {rejectedJobCount: data});

            }).catch( (error) =>
        {
            alert(error);
        })
    }

    intitialState ={
        rejectedJobCount:''
    }

    render() {
        return(
            <div>
                <Link to={'/maintenance'} className={'bg-info text-white'}>
                    <Card >
                        <Card.Header className={'bg-danger'}>Rejected Jobs</Card.Header>
                        <Card.Body className={'text-black-50'}>
                            {this.state.rejectedJobCount}
                        </Card.Body>
                    </Card>
                </Link>

            </div>
        )
    }

}

export default RejectedJobCount;