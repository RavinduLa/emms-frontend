import React from "react";
import UserService from "../../service/UserService";
import {Button, Table} from "react-bootstrap";


class ViewAllUsers extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.navigateToEdit = this.navigateToEdit.bind(this);

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

    render() {
        return (
            <div>

                <Table className={'table-sm'} striped bordered hover variant='light'>
                    <thead>
                    <tr>
                        <td>Id</td>
                        <td>Username</td>
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
                                    <td>
                                        {e.roles.map((index) => (index.name+"/"))}
                                    </td>
                                    <td>
                                        <Button
                                            className={'btn btn-warning'}
                                            onClick={event => this.navigateToEdit(event,e.id)}
                                        >
                                        Edit
                                        </Button>
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