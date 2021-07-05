import React from "react";
import {Link} from "react-router-dom";

class UserPage extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <h1>User Actions</h1>

                <Link to={'/user/register'} className={'btn btn-primary'}>Add User</Link>
                <Link to={'/user/allUsers'} className={'btn btn-secondary'}>View All Users</Link>

            </div>
        );
    }

}

export default UserPage;