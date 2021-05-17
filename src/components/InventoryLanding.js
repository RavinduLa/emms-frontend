import React from "react";
import {Link} from "react-router-dom";
import InventorySearch from "./InventorySearch";
import {Col, Row,Jumbotron} from "react-bootstrap";
import InventorySearchSN from "./InventorySearchSN";
import DepartmentFilter from "./DepartmentFilter"

class InventoryLanding extends React.Component{
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        const padding={
            padding:'20px'
        }
        const padding2={
            padding:'10px'
        }
        return (
            <div>
                <div style={padding2}>


                <div>

                        <Row>
                            <Col>
                                <Link to={'/addInventory'}>Add Inventory</Link>
                            </Col>
                            <Col>
                                <Link to={'/inventory'}>View Full Inventory</Link>
                            </Col>
                            <Col>
                                <Link to={'/inventoryFilter2'}>Filter Inventory</Link>
                            </Col>

                            <Col>
                                <Link to={'/departmentFilter'}>Filter By Department</Link>
                            </Col>

                            <Col>
                                <Link to={'/locationFilter'}>Filter By Location</Link>
                            </Col>

                            <Col>
                                <Link to={'/supplierFilter'}>Filter By Supplier</Link>
                            </Col>
                        </Row>


                </div>


                <Row>
                    <Col><InventorySearch/></Col>
                    <Col><InventorySearchSN/></Col>
                </Row>

                </div>
            </div>
        );
    }


}
export default InventoryLanding;