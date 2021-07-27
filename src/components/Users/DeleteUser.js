import React from "react";
import UserService from "../../service/UserService";
import {Button, Table} from "react-bootstrap";

import Toast1 from "../Toasts/Toast1";
import { confirmAlert } from 'react-confirm-alert';
import {Redirect} from "react-router-dom";

import WithAuth from "../../service/WithAuth";

class DeleteUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show =  false;

        this.handleDelete = this.handleDelete.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.displayCancelled = this.displayCancelled.bind(this);

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }

        console.log("Permission : ", this.state.permission);

    }

    initialState={
        users:[],
        permission:'notPermitted',
        currentUser:''

    }

    componentDidMount() {
        UserService.getAllUsers()
            .then(response => response.data)
            .then((data) => {
                this.setState({users:data});
            }).catch(error => {
            console.log("Error in connecting: " +error);
        });
    }

    handleDelete = (id) => {

        confirmAlert({
            title: 'Delete this user?',
            message: 'This cannot be undone ',
            buttons: [
                {
                    label: 'Yes, Delete',
                    onClick: this.deleteUser.bind(this,id)
                },
                {
                    label: 'No',
                    //onClick: onclose
                    onClick: this.displayCancelled
                }
            ]
        })

    }

    deleteUser =  (id) => {

        UserService.deleteUserById(id)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true})
                    setTimeout(() => this.setState({"show" : false}),3000)
                    this.setState({
                        users:this.state.users.filter(users => users.id !== id)
                    })
                }
            })

    }

    displayCancelled = () => {
        alert("Deletion Cancelled");
    }

    render() {
        return (
            <div>

                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.show,
                            message:"User deleted successfully",
                            type: 'danger'}}/>
                </div>

                <h1>Delete Users</h1>

                <Table className={'table-sm'} striped bordered hover variant='light'>
                    <thead>
                    <tr>
                        <td>Id</td>
                        <td>Username</td>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.users.length === 0?
                            <tr>No Users</tr>:
                            this.state.users.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.username}</td>
                                    <td>
                                        {
                                            e.username === 'admin' ?
                                                <Button disabled={true}>Cannot delete admin</Button>:

                                                <Button
                                                    className={'btn btn-danger'}
                                                    onClick={this.handleDelete.bind(this,e.id)}
                                                >
                                                    Delete User
                                                </Button>
                                        }

                                    </td>
                                </tr>
                            ))
                    }
                    </tbody>
                </Table>

            </div>
        );
    }

}

export default WithAuth(DeleteUser);