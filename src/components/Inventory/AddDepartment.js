import React from "react";
import {Badge, Button, Form} from "react-bootstrap";
import Toast1 from "../Toasts/Toast1";
import Toast2 from "../Toasts/Toast2";
import DepartmentService from "../../service/DepartmentService";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";
import {Redirect} from "react-router-dom";

class AddDepartment extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.state.idWarningShow = false;
        this.submitDepartment = this.submitDepartment.bind();
        this.departmentChange = this.departmentChange.bind();

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }

        console.log("Permission : ", this.state.permission);
    }

    initialState = {

        did:'',
        departmentName:'',
        idStatus:'',
        permission:'notPermitted',
        currentUser:''

    }

    submitDepartment = async (event) =>{

        event.preventDefault();

        const department = {
            did: this.state.did,
            departmentName:  this.state.departmentName
        }

        console.log("Department id : " + department.did);
        console.log("Department name : " + department.departmentName);
        console.log("Department id status: " + this.state.idStatus);


        await this.isDidAvailable();
        if(this.state.idStatus == 'available'){
            const LOCALHOST_URL = "http://localhost:8080/api/addDepartment"
            const URL_ADD_DEPARTMENT = global.con + "/api/addDepartment"
            //axios.post(URL_ADD_DEPARTMENT,department)
                DepartmentService.addDepartment(department)
                .then( response => {
                    if(response.data != null){
                        this.setState({"show" : true})
                        setTimeout(() => this.setState({"show" : false}),3000)
                    }
                    else {
                        alert("Cannot add!")
                        this.setState({"show" : false})
                    }
                }).catch( (error) => {
                alert("Error: Could not add department\n "+error + "\nBackend server might be down.")
            })

            //this.setState( () => this.initialState);
        }
        else{
            console.log("Department id already taken")
        }



    }


    isDidAvailable = async () =>{
        const LOCALHOST_URL = "http://localhost:8080/api/getIdAvailability/"
        const GET_ID_AVAILABILITY = global.con + "/api/getIdAvailability/"
        //axios.get(GET_ID_AVAILABILITY+this.state.did)
            await DepartmentService.getIdAvailability(this.state.did)
            .then( response => {
                if(response.data == true){
                    this.setState({idStatus:'available'});
                    return true;
                }
                else {
                    this.setState({"idWarningShow" :true})
                    setTimeout(() => this.setState({"idWarningShow" : false}),3000)
                    this.setState({idStatus:'unavailable'});
                    return false;
                }
            }).catch(error => {
                alert("Error: Could not check id availability\n" + error+ "\nBackend server might be down")
        })

    }
    departmentChange = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        });

    }

    resetDepartment = () => {
        this.setState( () => this.initialState)
    }



    render() {

        const {did,departmentName} = this.state;
        return (
            <div>

                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{
                            show:this.state.show,
                            message:"Department added successfully",
                            type: 'success',
                        }} />
                </div>

                <div style={{"display":this.state.idWarningShow ? "block" :"none" }}>
                    <Toast2
                        children={{

                            show:this.state.idWarningShow,
                            message:"Id is already used",
                            type: 'warning',
                        }} />
                </div>

                <Form onSubmit={this.submitDepartment} onChange={this.departmentChange} onReset={this.resetDepartment}>
                    <Form.Group>
                        <Form.Label> Department Id</Form.Label>
                            <Form.Control required
                                          type= "number"
                                          name={'did'}
                                          placeholder='Enter department id'
                                          defaultValue={this.state.did}
                                          onChange={this.departmentChange}
                                >

                            </Form.Control>

                    </Form.Group>

                    <Form.Group>
                        <Form.Label> Department Name</Form.Label>
                            <Form.Control required
                                          type= "text"
                                          name={'departmentName'}
                                          placeholder='Enter department name'
                                          value={this.state.departmentName}
                                          onChange={this.departmentChange}
                            >

                            </Form.Control>

                    </Form.Group>

                    <Form.Group>
                        <Button type={'submit'}  className={'btn btn-success'}>Add Department</Button>
                        <Button type={'reset'}  className={'btn btn-secondary'}>Reset</Button>
                    </Form.Group>


                </Form>
            </div>
        );
    }

}

export default WithAuth(AddDepartment);