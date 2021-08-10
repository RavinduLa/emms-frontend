import React from "react";
import {Link, Redirect} from "react-router-dom";
import PendingJobCount from "./PendingJobCount";
import CompletedJobCount from "./CompletedJobCount";
import RejectedJobCount from "./RejectedJobCount";
import ApprovalWaitingJobCount from "./ApprovalWaitingJobCount";
import {Col, Row} from "react-bootstrap";
import OnGoingJobCount from "./OnGoingJobCount";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";

class Maintenance extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
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

    initialState={

    }


    render() {

        const padding ={
            padding:'30px'
        }

        return(
            <div>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }
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

export default WithAuth(Maintenance);