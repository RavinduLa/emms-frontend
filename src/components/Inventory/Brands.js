import React from "react";
import {Link, Redirect} from "react-router-dom";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";

class Brands extends React.Component{

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

                <Link to={'/addBrand'}>Add brand</Link> <br/>
                <Link to={'/brandList'}>Brand List</Link>

            </div>
        );
    }
}

export default WithAuth(Brands);