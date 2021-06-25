import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, Col, Row,Jumbotron} from "react-bootstrap";

class Suppliers extends React.Component{
    constructor(props) {
        super(props);

    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div>
                    <Jumbotron>
                        <Row>
                            <Col>
                                <Link className={'btn btn-primary btn-block'} to={'/addSupplier'}>Add new Suppliers</Link>  <br/>
                            </Col>
                            <Col>
                                <Link className={'btn btn-primary btn-block'} to={'/supplierList'}>View Suppliers</Link>  <br/>
                            </Col>
                        </Row>


                    </Jumbotron>
                </div>
            </div>
        );
    }

}

export default Suppliers