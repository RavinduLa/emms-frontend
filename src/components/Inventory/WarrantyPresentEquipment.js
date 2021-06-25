import React from "react"
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";

class WarrantyPresentEquipment extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {

        equipment:[]

    }

    async componentDidMount(){
        const URL_EQUIPMENT = global.con+"/api/getUnderWarrantyEquipment/"

        await axios.get(URL_EQUIPMENT)
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

export default WarrantyPresentEquipment;