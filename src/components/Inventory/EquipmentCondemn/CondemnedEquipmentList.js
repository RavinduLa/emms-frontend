import React from "react";
import WithAuth from "../../../service/WithAuth";
import UserService from "../../../service/UserService";
import EquipmentService from "../../../service/EquipmentService";
import {Redirect} from "react-router-dom";
import {Button, Table} from "react-bootstrap";

class CondemnedEquipmentList extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.permission = 'notPermitted';
        this.state.currentUser = '';

        this.alertItem = this.alertItem.bind(this);

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;

        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }

        console.log("Permission : ", this.state.permission);

    }

    initialState={
        condemnedEquipment:[]
    }

    componentDidMount() {
        if (this.state.permission = 'permitted'){
            EquipmentService.getAllCondemnedEquipment()
                .then(response => response.data)
                .then((data) => {
                    this.setState({condemnedEquipment:data});
                }).catch(error => {
                    console.log("Error in getting condemned equipment. Error : ",error);
            })
        }
    }

    alertItem =(e) =>{
        alert("Asset Id : " + e.assetId + "\n" + "Serial Number : " + e.serialNumber + "\n" +
            "\n" + "Type : " + e.type + "\n" + "Location : " + e.location + "\n" + "Department : " + e.department + "\n" +
            "Department Name : " + e.departmentName + "\n" +
            "Brand : " + e.brand + "\n" + "Model : " + e.model + "\n" + "Purchase Date : " + e.purchaseDate + "\n"+
            "Warranty Months : "+ e.warrantyMonths + "\n" + "Purchase Order Number : "+ e.purchaseOrderNumber + "\n" +
            "Supplier : " + e.supplier + "\n" + "Supplier Name : " + e.supplierName + "\n" +
            "IP address : " + e.ipAddress + "\n" + "WorkStation Id : " + e.workStationId
        );
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
                        <td>Asset Id</td>
                        <td>Serial Number</td>
                        <td>Type</td>
                        <td>Brand</td>
                        <td>Model</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.condemnedEquipment.length === 0?
                            <tr align={'center'}>
                                <td colSpan={6}>{this.state.condemnedEquipment.length} records available</td>
                            </tr>:
                            this.state.condemnedEquipment.map((e) => (
                                <tr key={e.assetId}>
                                    <td>{e.assetId}</td>
                                    <td>{e.serialNumber}</td>
                                    <td>{e.type}</td>
                                    <td>{e.brand}</td>
                                    <td>{e.model}</td>

                                    <td>
                                        <Button className={'btn btn-primary btn-sm'} onClick={this.alertItem.bind(this,e)}>
                                            View Mode Details
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
export default WithAuth(CondemnedEquipmentList);