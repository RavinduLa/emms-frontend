import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from "axios";

class ApprovalWaitingJobCount extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.intitialState;
        this.state = {
            approvalWaitingJobCount:''
        }
    }

    componentDidMount() {
        const LOCALHOST_URL =  "http://localHost:8080/api/approvalWaitingJobCount";
        axios.get(LOCALHOST_URL)
            .then( response => response.data)
            .then( (data) => {
                this.setState( {approvalWaitingJobCount: data});

            }).catch( (error) =>
        {
            alert(error);
        })
    }

    intitialState ={
        approvalWaitingJobCount:''
    }

    render() {
        return(
            <div>
                <Link to={'/maintenance'} className={'bg-info text-white'}>
                    <Card >
                        <Card.Header className={'bg-secondary'}>Approval Waiting Jobs</Card.Header>
                        <Card.Body className={'text-black-50'}>
                            {this.state.approvalWaitingJobCount}
                        </Card.Body>
                    </Card>
                </Link>

            </div>
        )
    }

}

export default ApprovalWaitingJobCount;