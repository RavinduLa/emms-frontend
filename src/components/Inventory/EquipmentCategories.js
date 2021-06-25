import React from "react";
import {Col, Form} from "react-bootstrap";
import AddEquipmentCategory from "./AddEquipmentCategory";
import EquipmentCategoryList from "./EquipmentCategoryList";

class EquipmentCategories extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

    }

    initialState = {

    }


    submitCategory(){

    }

    render() {
        return (
            <div>
                <AddEquipmentCategory></AddEquipmentCategory>
                <EquipmentCategoryList></EquipmentCategoryList>
            </div>
        );
    }
}

export default EquipmentCategories;