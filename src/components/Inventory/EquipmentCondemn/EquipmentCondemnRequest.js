import React from "react";
import WithAuth from "../../../service/WithAuth";
import UserService from "../../../service/UserService";
import EquipmentService from "../../../service/EquipmentService";
import {Button, Table} from "react-bootstrap";
import {Redirect} from "react-router-dom";

class EquipmentCondemnRequest extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.permission = 'notPermitted';
        this.state.currentUser = '';

        this.navigateToCondemn = this.navigateToCondemn.bind(this);

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;

        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }
        else {
            this.state.currentUser.roles.map((e) => {
                if (e == 'LEADER'){
                    this.state.permission = 'permitted';
                }
                else {
                    this.state.permission = 'notPermitted';
                }
                console.log("Role : ",e);
            });
        }

        console.log("Permission : ", this.state.permission);

    }
    initialState={
        equipment:[]
    }

    componentDidMount() {

        if (this.state.permission == 'permitted'){
            EquipmentService.getAllEquipment()
                .then(response => response.data)
                .then( (data) => {
                    console.log("Fetched all equipment. Setting to state");
                    this.setState({equipment: data});
                    console.log("Equipment set to state.");

                }).catch(error => {
                console.log("Equipment fetching failed with error :  " + error);
            });
        }
    }

    navigateToCondemn = (event,id) => {
        window.location = `/inventory/condemnRequestSW/${id}`;
    }

    render() {
        return (
            <div>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }
                <Table className={'table-sm'}striped bordered hover  variant='light' >
                    <thead>
                    <tr>
                        <th>Asset Id</th>
                        <th>Serial Number</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Purchase Date</th>
                        <th>Warranty Months</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.equipment.length === 0?
                            <tr align={'center'}>
                                <td colSpan={6}> {this.state.equipment.length} records available </td>
                            </tr>:
                            this.state.equipment.map((e) => (
                                <tr key={e.assetId}>
                                    <td>{e.assetId}</td>
                                    <td>{e.serialNumber}</td>
                                    <td>{e.brand}</td>
                                    <td>{e.model}</td>
                                    <td>{e.purchaseDate}</td>
                                    <td>{e.warrantyMonths}</td>

                                    <td>
                                        <Button
                                            className={'btn btn-danger btn-sm'}
                                            onClick={event => this.navigateToCondemn(event, e.assetId)}
                                        >
                                            Request Condemn
                                        </Button>
                                    </td>

                                </tr>
                            ))
                    }
                    </tbody>
                </Table>

            </div>
        );
    }


}
export default WithAuth(EquipmentCondemnRequest);