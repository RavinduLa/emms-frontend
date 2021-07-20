import React from "react";
import UserService from "../../service/UserService";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";

class AdminResetPassword extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.navigateToResetPage = this.navigateToResetPage.bind(this);

    }

    initialState={
        users:[]
    }

    componentDidMount() {

        //get all users
        UserService.getAllUsers()
            .then(response => response.data)
            .then((data) => {
                this.setState({users:data});
            }).catch(error => {
            console.log("Error in connecting: " +error);
        });
    }

    navigateToResetPage = (event, id) => {
        window.location = `/user/resetPassword/${id}`

    }

    render() {
        return (
            <div>

                <h2>Reset User Passwords</h2>
                <Table className={'table-sm'} striped bordered hover variant='light'>
                    <thead>
                    <tr>
                        <td>Username</td>
                        <td>User Status</td>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.users.length === 0?
                            <tr>No users</tr>:
                            this.state.users.map((e) => (
                                <tr key={e.id}>
                                    <td>{e.username}</td>
                                    {
                                        e.enabled === true ?
                                            <td>Enabled</td>:
                                            <td>Disabled</td>
                                    }
                                    <td>
                                        {
                                            e.username === 'admin'?
                                                <Button disabled={true}>Cannot Edit Admin</Button>:
                                                <Button
                                                    className={'btn btn-info'}
                                                    onClick={event => this.navigateToResetPage(event,e.id)}

                                                >
                                                    Reset Password
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

export default AdminResetPassword;