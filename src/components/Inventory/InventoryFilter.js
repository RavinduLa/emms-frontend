import React from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";

import DepartmentFilter from "./DepartmentFilter"
import LocationFilter from "./LocationFilter"
import SupplierFilter from "./SupplierFilter"

import WithAuth from "../../service/WithAuth";

class InventoryFilter extends React.Component{
    constructor(props) {
        super(props);

    }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                <Row>
                    <Col> <DepartmentFilter /> </Col>
                    <Col> <LocationFilter /></Col>
                    <Col> <SupplierFilter /></Col>
                </Row>
            </div>
        );
    }

}
export default WithAuth(InventoryFilter);