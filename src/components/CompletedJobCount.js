import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

class CompletedJobCount extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.intitialState;
        this.state = {
            completedJobCount:''
        }
    }

    componentDidMount() {
        const LOCALHOST_URL =  "http://localHost:8080/api/completedJobCount";
        const URL_COMPLETED_JOBS = global.con + "/api/completedJobCount"
        axios.get(LOCALHOST_URL)
            .then( response => response.data)
            .then( (data) => {
                this.setState( {completedJobCount: data});

            }).catch( (error) =>
        {
            alert(error);
        })
    }

    intitialState ={
        completedJobCount:''
    }

    render() {
        return(
            <div>
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