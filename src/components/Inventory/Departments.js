import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";

import {Button, Table} from "react-bootstrap";
import Toast1 from "../Toasts/Toast1";
import {resolveToLocation} from "react-router-dom/modules/utils/locationUtils";
import DepartmentService from "../../service/DepartmentService";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";


class Departments extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show=  false
        this.state={
            did:'',
            departments: [],
        }

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
        departments : [],
        permission:'notPermitted',
        currentUser:''
    }

    componentDidMount() {
        const LOCALHOST_URL = "http://localhost:8080/api/allDepartments"
        const URL_VIEW_ALL_DEPARTMENTS = global.con + "/api/allDepartments"
        //axios.get(LOCALHOST_URL)
            DepartmentService.getAllDepartments()
            .then( response => response.data)
            .then( (data)  => {
                this.setState({departments: data})
            })
    }

    deleteDepartment = (did) =>{
        const URL_LOCALHOST_DELETE = "http://localhost:8080/api/deleteDepartment/";
        const URL_DELETE = global.con + "/api/deleteDepartment/"

        //axios.delete(URL_LOCALHOST_DELETE+did)
            DepartmentService.deleteDepartment(did)
            .then( response => {
                if(response.data != null){
                    this.setState({"show" : true})
                    setTimeout(() => this.setState({"show" : false}),3000)
                    this.setState({
                        departments: this.state.departments.filter(departments => departments.did !== did)
                    })
                }
                else{
                    alert("Could not delete");
                }
            }).catch(error => {alert(error)})
    }

    render() {
        return(
            <div>

                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.show,
                            message:"Department deleted successfully",
                            type: 'danger'}}/>
                </div>

                <Link to={"/addDepartment"}>Add Department</Link>


                <Table striped bordered hover variant='light'>

                    <thead>
                    <tr>
                        <th>Department Id</th>
                        <th>Department Name</th>
                    </tr>

                    </thead>

                    <tbody>
                    {
                        this.state.departments.length === 0?
                            <tr align='center'>
                                <td colSpan={6}> {this.state.departments.length} records available </td>
                            </tr> :
                            this.state.departments.map( (e) => (
                                <tr key={e.did}>
                                    <td>{e.did}</td>
                                    <td>{e.departmentName}</td>
                                    <td>
                                            <Button
                                                onClick={this.deleteDepartment.bind(this,e.did)}
                                                className={'btn btn-danger'}>

                                                    Delete Department
                                            </Button>
                                    </td>

                                </tr>
                                )
                            )

                    }
                    </tbody>

                </Table>

            </div>
        )
    }

}

export default WithAuth(Departments);