import React from "react";
import {Button, Col, Form} from "react-bootstrap";
import Toast1 from "../Toasts/Toast1";
import axios from "axios";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";
import {Redirect} from "react-router-dom";

class AddJob extends React.Component{

    constructor(props) {
        super(props);
        this.state= this.initialState;
        this.state.show = false;
        this.state.permission = 'notPermitted';
        this.state.currentUser = '';
        this.submitJob = this.submitJob.bind(this);
        this.jobChange = this.jobChange.bind(this);

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

    initialState = {
        assetId: '',
        serialNumber:'',
        issue:'',
        client:'',

    }

    submitJob = event => {
        event.preventDefault();

        const URLLocalHost = "http://localhost:8080/api/addJob";
        const URL_ADD_JOB = global.con + "/api/addJob";
        const job = {
            assetId: this.state.assetId,
            serialNumber: this.state.serialNumber,
            issue: this.state.issue,
            client: this.state.client,

        }

        axios.post(URL_ADD_JOB,job)
            .then(response => {
                if(response.data != null){
                    this.setState({"show" : true})
                    setTimeout(() => this.setState({"show" : false}),3000)
                    //alert("Equipment added to the inventory succesfully")
                }
                else {
                    this.setState({"show" : false})
                }
            }).catch( (error) =>{
                alert(error);
        })

    }

    jobChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    resetJob = () =>{
        this.setState( () => this.initialState);
    }


    render() {
        const padding={
            padding:'20px'
        }
        return(
            <div style={padding}>

                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{
                            show:this.state.show,
                            message:"Job added successfully",
                            type: 'success',
                        }} />
                </div>

                <Form onSubmit={this.submitJob} onReset={this.resetJob} id={'addNewJobForm'}>
                    <Form.Row>
                        <Form.Group controlId={"formAssetId"} as={Col}>
                            <Form.Label>AssetId</Form.Label>
                            <Form.Control required
                                          type="number"
                                          name={'assetId'}
                                          placeholder="Enter AssetID"
                                //value={this.state.assetId}
                                //this was here earlier
                                // later removed .state
                                          //value={this.state.assetId}
                                          value={this.state.assetId}
                                          onChange={this.jobChange}
                            />
                        </Form.Group>

                        <Form.Group controlId={"formSerialNumber"} as={Col}>
                            <Form.Label>Serial Number</Form.Label>
                            <Form.Control
                                type="text"
                                name={'serialNumber'}
                                placeholder="Enter Serial Number "
                                //value={this.state.assetId}
                                //this was here earlier
                                // later removed .state
                                value={this.state.serialNumber}
                                onChange={this.jobChange}
                            />
                        </Form.Group>

                        <Form.Group controlId={"formClient"} as={Col}>
                            <Form.Label>Client</Form.Label>
                            <Form.Control
                                type="text"
                                name={'client'}
                                placeholder="Enter client id"
                                //value={this.state.assetId}
                                //this was here earlier
                                // later removed .state
                                value={this.state.client}
                                onChange={this.jobChange}
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group controlId={"formIssue"} as={Col}>
                            <Form.Label>Issue</Form.Label>
                            <Form.Control
                                type="text"
                                name={'issue'}
                                placeholder="Enter the issue"
                                //value={this.state.assetId}
                                //this was here earlier
                                // later removed .state
                                value={this.state.issue}
                                onChange={this.jobChange}
                            />
                        </Form.Group>

                    </Form.Row>

                    <Button className={'btn btn-success'} type={'submit'}>Add Job</Button>
                    <Button className={'btn btn-secondary'} type={'reset'}>Reset</Button>

                </Form>

            </div>
        )
    }
}

export default WithAuth(AddJob);