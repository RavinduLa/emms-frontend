import React from "react";
import {Button, Col, Form} from "react-bootstrap";
import axios from "axios";

class IpSettings extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.submitIp = this.submitIp.bind(this)
        this.resetIp = this.resetIp.bind(this)

    }

    initialState = {
        ipAddress: ''
    }

    componentDidMount() {

    }

    submitIp = (event) => {

        event.preventDefault();
        const fs = require('fs')
        const connectionFileName = __dirname + '/connectionConfig.txt'

        const writeStream =fs.createWriteStream(connectionFileName)
        this.state.ipAddress.pipe(writeStream)

    }

    resetIp(){

        this.state = this.initialState

    }

    ipAddressChange = (event) => {
        event.preventDefault();

    }

    render() {
        const {ipAddress}  = this.state;
        return (
            <div>
                {global.ipa = "dasddaf"}
                <p>{global.con}</p>

                <Form onSubmit={this.submitIp.bind(this)} onReset={this.resetIp.bind(this)}
                id={'addNewIpForm'}>

                    <Form.Row>
                        <Form.Group controlId={'formIpAddress'} as={Col}>
                            <Form.Label>Ip Address</Form.Label>
                            <Form.Control
                            required
                            type={'text'}
                            name={'ipAddress'}
                            placeHolder={'Enter new Ip address'}
                            value={ipAddress}
                            onChange={this.ipAddressChange.bind(this)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Button className={'btn btn-primary'}>Set Ip</Button>
                    </Form.Row>

                </Form>
            </div>
        );
    }

}

export default IpSettings;