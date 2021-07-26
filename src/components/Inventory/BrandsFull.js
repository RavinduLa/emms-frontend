import React from "react";
import AddBrand from "./AddBrand";
import BrandList from "./BrandList";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";
import {Redirect} from "react-router-dom";

class BrandsFull extends React.Component{

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

                <AddBrand></AddBrand>
                <BrandList></BrandList>

            </div>
        );
    }

}

export default WithAuth(BrandsFull);