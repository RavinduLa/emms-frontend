import React from "react";
import axios from "axios";
import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import WithAuth from "../service/WithAuth";

import AssetCountDepartment from "./Inventory/AssetCountDepartment";

class Dashboard extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            assetCount: ''
        }

    }

    initialState = {
        assetCount: '',
        underWarrantyAssetCount:'',
        noWarrantyAssetCount:''

    }


    componentDidMount() {
        const LOCALHOST_URL = "http://localhost:8080/api/assetCount";
        const URL_GET_ASSET_COUNT = global.con + "/api/assetCount";
        const URL_UNDERWARRANTYASSETS  = global.con+"/api/underWarrantyCount";
        const URL_NOWARRANTYASSETS  = global.con+"/api/noWarrantyCount";
        axios.get(URL_GET_ASSET_COUNT)
            .then(response => response.data)
            .then( (data)  => {
                this.setState( {assetCount: data} );
            } )
        axios.get(URL_UNDERWARRANTYASSETS)
            .then(response => response.data)
            .then( (data) => {
                this.setState( {underWarrantyAssetCount: data})
            })
        axios.get(URL_NOWARRANTYASSETS)
            .then(response => response.data)
            .then( (data) => {
                this.setState( {noWarrantyAssetCount: data})
            })

    }


    render() {
        const padding ={
            padding:'30px'
        }
        return (
            <div style={padding}>
                <Row>

                    <Col>
                        <Link to={'/inventory'} className={'bg-info text-white'}></Link>
                        <Card >
                            <Card.Header className={'bg-info'}>Asset Count</Card.Header>
                            <Card.Body className={'text-black-50'}>
                                {this.state.assetCount}
                            </Card.Body>
                        </Card>

                        <AssetCountDepartment />

                    </Col>


                    <Col>
                        <Link to={'/warrantyPresentEquipment'} className={'bg-success text-white'}>
                        <Card>
                            <Card.Header className={'bg-success'}>Under Warranty Assets</Card.Header>
                            <Card.Body className={'text-black-50'}>
                                {this.state.underWarrantyAssetCount}
                            </Card.Body>
                        </Card>
                        </Link>
                    </Col>

                    <Col>
                        <Link to={'/warrantyAbsentEquipment'} className={'bg-success text-white'}>
                        <Card>
                            <Card.Header className={'bg-danger text-white'}>Warranty Void Assets</Card.Header>
                            <Card.Body className={'text-black-50'}>
                                {this.state.noWarrantyAssetCount}
                            </Card.Body>
                        </Card>
                        </Link>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header className={'bg-light'}>Asset Count</Card.Header>
                            <Card.Body>
                                {this.state.assetCount}
                            </Card.Body>
                        </Card>
                    </Col>


                </Row>

            </div>
        );
    }

}

export default WithAuth (Dashboard);