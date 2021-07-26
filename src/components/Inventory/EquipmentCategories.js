import React from "react";
import {Col, Form} from "react-bootstrap";
import AddEquipmentCategory from "./AddEquipmentCategory";
import EquipmentCategoryList from "./EquipmentCategoryList";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";
import {Redirect} from "react-router-dom";

class EquipmentCategories extends React.Component{

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

    initialState = {
        permission:'notPermitted',
        currentUser:''
    }


    submitCategory(){

    }

    render() {
        return (
            <div>

                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <AddEquipmentCategory></AddEquipmentCategory>
                <EquipmentCategoryList></EquipmentCategoryList>
            </div>
        );
    }
}

export default WithAuth(EquipmentCategories);