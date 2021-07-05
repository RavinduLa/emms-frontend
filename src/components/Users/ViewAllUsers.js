import React from "react";
import UserService from "../../service/UserService";
import {Button, Table} from "react-bootstrap";


class ViewAllUsers extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

    }

    initialState={
        users:[]

    }

    componentDidMount() {
        UserService.getAllUsers()
            .then(response => response.data)
            .then((data) => {
                this.setState({users:data});
            }).catch(error => {
                console.log("Error in connecting: " +error);
        })

    }

    render() {
        return (
            <div>

                <Table className={'table-sm'} striped bordered hover variant='light'>
                    <thead>
                    <tr>
                        <td>Username</td>
                        <td>Roles</td>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.users.length === 0?
                            <tr>No users added</tr>:
                            this.state.users.map((e) => (
                                <tr>
                                    <td>{e.username}</td>
                                    <td>
                                        {e.roles.map((index) => (index.name+", "))}
                                    </td>
                                    <td><Button className={'btn btn-warning'}>Edit</Button></td>
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