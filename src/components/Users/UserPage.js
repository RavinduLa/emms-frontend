import React from "react";
import {Link, Redirect} from "react-router-dom";
import UserService from "../../service/UserService";
import WithAuth from "../../service/WithAuth";

class UserPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }

        console.log("Permission : ", this.state.permission);

    }

    initialState={
        permission:'notPermitted',
        currentUser:''
    }

    render() {
        return (
            <div>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <h1>User Actions</h1>

                <Link to={'/user/register'} className={'btn btn-primary'}>Add User</Link>
                <Link to={'/user/allUsers'} className={'btn btn-secondary'}>View All Users</Link>
                <Link to={'/user/deleteUsers'} className={'btn btn-danger'}>Delete Users</Link>
                <Link to={'/user/resetPassword'} className={'btn btn-secondary'}>Reset Passwords</Link>

            </div>
        );
    }

}

export default WithAuth(UserPage);