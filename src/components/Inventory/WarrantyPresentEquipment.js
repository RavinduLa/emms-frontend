import React from "react"
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import EquipmentService from "../../service/EquipmentService";

import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";
import {Redirect} from "react-router-dom";

class WarrantyPresentEquipment extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }

        this.state.currentUser.roles.map((e) => {
            if (e == 'LEADER'){
                this.state.permission = 'permitted';
            }
            else if(e== 'VIEWER'){
                this.state.permission = 'permitted';
            }
            console.log("Role : ",e);
        });

        console.log("Permission : ", this.state.permission);
    }

    initialState = {

        equipment:[],

        permission:'notPermitted',
        currentUser:''

    }

    async componentDidMount(){
        const URL_EQUIPMENT = global.con+"/api/getUnderWarrantyEquipment/"

        //await axios.get(URL_EQUIPMENT)
            await EquipmentService.getUnderWarrantyEquipment()
            .then(response => response.data)
            .then((data) => {
                this.setState({equipment: data})
            }).catch(error => {
                alert("Backend server might be down: \n"+error)
            })
    }

    alertItem = (e) => {
        alert("Asset Id : "+e.assetId+""+ "\n"+"Serial Number: " + e.serialNumber + "\n"+
            "Location : "+ e.location + "\n"+ "Department ID: " + e.department+ "\nDepartment Name: " +e.departmentName+ "\n"+"Category: "+ e.type+ "\n"+
            "Brand: "+e.brand+ "\n" + "Model: "+ e.model + "\nPurchase Date: " + e.purchaseDate + "\n"+
            "Warranty Months: "+e.warrantyMonths +"\nSupplier: "+e.supplier+"\nSupplier Name: " + e.supplierName+ "\n"+ "IP Address; "+e.ipAddress + "\n" +
            "Purchase order Number: "+ e.purchaseOrderNumber + "\n"+ "Workstation Id: "+e.workStationId)
    }

    render() {
        return (
            <div>

                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <h6>Equipment Under Warranty</h6>
                <Table className={'table-sm'} striped bordered hover variant='success'>
                    <thead>
                    <tr>
                        <td>Asset Id</td>
                        <td>Serial Number</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.equipment.length === 0?
                            <tr>
                                No records with warranty
                            </tr>:
                            this.state.equipment.map( (e) => (
                                <tr>
                                    <td>{e.assetId}</td>
                                    <td>{e.serialNumber}</td>

                                    <td>
                                        <Button className={'btn btn-success btn-sm'} onClick={this.alertItem.bind(this,e)}>
                                            View More Info
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

export default WithAuth(WarrantyPresentEquipment);