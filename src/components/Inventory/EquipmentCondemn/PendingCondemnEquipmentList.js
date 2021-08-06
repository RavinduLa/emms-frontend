import React from "react";
import WithAuth from "../../../service/WithAuth";
import UserService from "../../../service/UserService";
import {Redirect} from "react-router-dom";
import EquipmentService from "../../../service/EquipmentService";
import {Button, Table} from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert';
import Toast1 from "../../Toasts/Toast1";

class PendingCondemnEquipmentList extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.permission = 'notPermitted';
        this.state.currentUser = '';
        this.state.showCondemned = false;
        this.state.showCancelled = false;

        this.alertItem = this.alertItem.bind(this);
        this.handleCondemn = this.handleCondemn.bind(this);
        this.condemnItem = this.condemnItem.bind(this);
        this.displayCancelled = this.displayCancelled.bind(this);

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
        pendingEquipment:[]
    }

    componentDidMount() {
        if (this.state.permission = 'permitted'){
            EquipmentService.getPendingCondemnEquipment()
                .then(response => response.data)
                .then((data) => {
                    this.setState({pendingEquipment: data});
                }).catch(error => {
                    console.log("Error in getting pending condemn equipment. Error : ",error );
            })
        }
    }

    alertItem = (e) => {
        alert("Asset Id : " + e.assetId + "\n" + "Serial Number : " + e.serialNumber + "\n" +
            "Reason for condemning : " + e.condemnReason + "\n" + "Type : " + e.type + "\n" +
            "Brand : " + e.brand + "\n" + "Model : " + e.model + "\n" + "Purchase Date : " + e.purchaseDate + "\n"+
            "Warranty Months : "+ e.warrantyMonths + "\n" + "Purchase Order Number : "+ e.purchaseOrderNumber
        );
    }

    handleCondemn  = (assetId) => {
        confirmAlert({
            title : 'Do you want do confirm condemnation of this item?',
            message : 'This cannot be undone.',
            buttons : [
                {
                    label : 'Yes confirm condemnation',
                    onClick : this.condemnItem.bind(this,assetId)
                },
                {
                    label : 'No',
                    onClick: this.displayCancelled.bind(this)
                }
            ]
        })
    }

    condemnItem =(assetId) => {
        EquipmentService.performCondemn(assetId)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    this.setState({"showCondemned" : true} );
                    setTimeout(() => this.setState({"showCondemned" : false}),3000);
                    this.setState({
                        pendingEquipment:
                            this.state.pendingEquipment.filter(pendingEquipment => pendingEquipment.assetId !== assetId)
                    });
                }
            }).catch(error => {
                console.log("Error in condemning equipment. Error : ", error);
        })
    }

    displayCancelled =() =>{
        alert("Condemnation Cancelled");
    }

    cancelCondemnRequest =(assetId) => {
        EquipmentService.cancelCondemnRequest(assetId)
            .then(response => response.data)
            .then((data) => {
                if (data != null){
                    this.setState({"showCancelled" : true} );
                    setTimeout(() => this.setState({"showCancelled" : false}),3000);
                    this.setState({
                        pendingEquipment:
                            this.state.pendingEquipment.filter(pendingEquipment => pendingEquipment.assetId !== assetId)
                    });
                }

            }).catch(error => {
            console.log("Error in cancelling condemn request. Error : ", error);
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <div style={{"display":this.state.showCondemned ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.showCondemned,
                            message:"Equipment Condemned successfully",
                            type: 'danger'}}/>
                </div>

                <div style={{"display":this.state.showCancelled ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.showCancelled,
                            message:"Condemn Request Cancelled",
                            type: 'success'}}/>
                </div>

                <Table className={'table-sm'}striped bordered hover  variant='light' >
                    <thead>
                    <tr>
                        <th>Asset Id</th>
                        <th>Serial Number</th>
                        <th>Reason for condemning</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.pendingEquipment.length === 0?
                            <tr align={'center'}>
                                <td colSpan={6}>{this.state.pendingEquipment.length} records available</td>
                            </tr>:
                            this.state.pendingEquipment.map((e) => (
                                <tr key={e.assetId}>
                                    <td>{e.assetId}</td>
                                    <td>{e.serialNumber}</td>
                                    <td>{e.condemnReason}</td>
                                    <td>{e.type}</td>
                                    <td>
                                        <Button className={'btn btn-primary btn-sm'} onClick={this.alertItem.bind(this,e)}>
                                            View More Details
                                        </Button>
                                    </td>
                                    <td>
                                        <Button className={'btn btn-danger btn-sm'}
                                                onClick={this.handleCondemn.bind(this,e.assetId)}
                                        >
                                            Confirm Condemn
                                        </Button>
                                    </td>
                                    <td>
                                        <Button className={'btn btn-success btn-sm'}
                                                onClick={this.cancelCondemnRequest.bind(this,e.assetId)}
                                        >
                                            Cancel Condemn Request
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
export default WithAuth(PendingCondemnEquipmentList);