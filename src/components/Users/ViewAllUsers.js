import React from "react";
import UserService from "../../service/UserService";
import {Button, Table} from "react-bootstrap";
import Toast1 from "../Toasts/Toast1";


class ViewAllUsers extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.showDisabled = false;
        this.state.showEnabled = false;

        this.navigateToEdit = this.navigateToEdit.bind(this);
        this.handleDisable = this.handleDisable.bind(this);
        this.handleEnable = this.handleEnable.bind(this);

        console.log("Constructor running");

    }

    initialState={
        users:[]

    }

    componentDidMount() {
        console.log("Component did mount")
        //console.log(UserService.getAllUsers());
        UserService.getAllUsers()
            .then(response => response.data)
            .then((data) => {
                this.setState({users:data});
            }).catch(error => {
                console.log("Error in connecting: " +error);
        });

    }

    navigateToEdit = (event,id) => {
        window.location = `/user/${id}`
    }

    handleEnable = async (id) => {

        await UserService.enableUser(id)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    this.setState({"showEnabled" : true});
                    setTimeout(() => this.setState({"showEnabled" : false}),3000);
                }
                else{
                    alert("Error in enabling user.");
                }
            }).catch(error => {
                console.log("Error in Connecting.",error);
        });

        await this.componentDidMount();

    }

    handleDisable = async (id) =>{

        await UserService.disableUser(id)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    this.setState({"showDisabled" : true});
                    setTimeout(() => this.setState({"showDisabled" : false}),3000);
                }
                else{
                    alert("Error in disabling user.");
                }
            }).catch(error => {
            console.log("Error in Connecting.",error);
        });

        await this.componentDidMount();

    }

    render() {
        return (
            <div>

                <div style={{"display":this.state.showDisabled ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.showDisabled,
                            message:"User disabled successfully",
                            type: 'danger'}}/>
                </div>

                <div style={{"display":this.state.showEnabled ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.showEnabled,
                            message:"User enabled successfully",
                            type: 'success'}}/>
                </div>

                <Table className={'table-sm'} striped bordered hover variant='light'>
                    <thead>
                    <tr>
                        <td>Id</td>
                        <td>Username</td>
                        <td>User Status</td>
                        <td>Roles</td>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.users.length === 0?
                            <tr>No users added</tr>:
                            this.state.users.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.username}</td>
                                    {
                                        e.enabled === true ?
                                            <td>Enabled</td>:
                                            <td>Disabled</td>
                                    }
                                    <td>
                                        {e.roles.map((index) => (index.name+"/"))}
                                    </td>
                                    <td>

                                        {
                                            e.username === 'admin' ?
                                                <Button disabled={true}>Cannot Edit Admin</Button>:
                                                <Button
                                                    className={'btn btn-warning'}
                                                    onClick={event => this.navigateToEdit(event,e.id)}
                                                >
                                                    Edit Roles
                                                </Button>
                                        }

                                    </td>

                                    <td>
                                        {
                                            e.username === 'admin' ?
                                                <Button disabled={true}>Cannot edit admin</Button>:
                                                <Button
                                                    className={'btn btn-success'}
                                                    onClick={this.handleEnable.bind(this,e.id)}

                                                >
                                                    Enable User
                                                </Button>
                                        }
                                    </td>

                                    <td>
                                        {
                                            e.username === 'admin' ?
                                                <Button disabled={true}>Cannot edit admin</Button>:
                                                <Button
                                                    className={'btn btn-secondary'}
                                                    onClick={this.handleDisable.bind(this,e.id)}
                                                >
                                                    Disable User
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

export default ViewAllUsers;