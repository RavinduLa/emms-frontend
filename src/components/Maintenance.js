import React from "react";
import {Link} from "react-router-dom";
import PendingJobCount from "./PendingJobCount";
import CompletedJobCount from "./CompletedJobCount";
import RejectedJobCount from "./RejectedJobCount";
import ApprovalWaitingJobCount from "./ApprovalWaitingJobCount";
import {Col, Row} from "react-bootstrap";
import OnGoingJobCount from "./OnGoingJobCount";

class Maintenance extends React.Component{


    render() {

        const padding ={
            padding:'30px'
        }

        return(
            <div>
                <Link to={"/addNewJob"}>Add new Job</Link>

                <div style={padding}>

                    <Row>

                        <Col>
                            <PendingJobCount />
                        </Col>

                        <Col>
                            <OnGoingJobCount />
                        </Col>

                        <Col>
                            <ApprovalWaitingJobCount />
                        </Col>

                        <Col>
                            <RejectedJobCount />
                        </Col>

                        <Col>
                            <CompletedJobCount />
                        </Col>


                    </Row>

                </div>






            </div>
        )
    }
}

export default Maintenance;