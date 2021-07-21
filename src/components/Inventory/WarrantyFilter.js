import React from "react"
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";

import WarrantyPresentEquipment from "./WarrantyPresentEquipment";
import WarrantyAbsentEquipment from "./WarrantyAbsentEquipment";

import WithAuth from "../../service/WithAuth";

class WarrantyFilter extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.iniitialState;

    }

    iniitialState={

        equipmentUnderWarranty:[],
        equipmentNoWarranty: []
    }

    componentDidMount(){

    }

    render() {
        const padding={
            padding:'10px'
        }
        return (
            <div>

                <div style={padding}>
                <Row>
                    <Col> <WarrantyPresentEquipment /> </Col>
                    <Col> <WarrantyAbsentEquipment /> </Col>
                </Row>
                </div>

            </div>
        );
    }

}

export default WithAuth(WarrantyFilter);