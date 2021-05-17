import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

class OnGoingJobCount extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.intitialState;
        this.state = {
            onGoingJobCount:''
        }
    }

    componentDidMount() {
        const LOCALHOST_URL =  "http://localHost:8080/api/ongoingJobCount";
        const URL_ONGOINGJOBS = global.con + "/api/ongoingJobCount";
        axios.get(URL_ONGOINGJOBS)
            .then( response => response.data)
            .then( (data) => {
                this.setState( {onGoingJobCount: data});

            }).catch( (error) =>
        {
            alert(error);
        })
    }

    intitialState ={
        onGoingJobCount:''
    }

    render() {
        return(
            <div>
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

export default OnGoingJobCount;