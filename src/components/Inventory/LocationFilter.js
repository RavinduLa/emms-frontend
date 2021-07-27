import React from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import EquipmentService from "../../service/EquipmentService";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";
import {Redirect} from "react-router-dom";

class LocationFilter extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.initialState;

        this.submitLocation = this.submitLocation.bind(this);
        this.resetLocation = this.resetLocation.bind(this);
        this.changeSearch= this.changeSearch.bind(this);
        this.alertItem = this.alertItem.bind(this);

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

    initialState={
        location:'',
        selectedLocation:'',
        equipment:[],
        initialSearch:true,
        itemFoundStatus:'',

        permission:'notPermitted',
        currentUser:''
    }

    componentDidMount(){

    }

    submitLocation = async (event)=>{
        event.preventDefault();
        const URL_LOCATION = global.con + "/api/getEquipmentForLocation/";

        this.setState({location: event.target.value});
        this.setState({initialSearch: false})

        //await axios.get(URL_LOCATION+this.state.location)
            await EquipmentService.getEquipmentForLocation(this.state.location)
            .then(response => response.data)
            .then((data) => {
                this.setState({equipment: data})
            }).catch(error =>{
                alert("Error in getting equipment: \n"+error)
            });
    }

    resetLocation = () => {
        this.setState( () => this.initialState);
    }

    changeSearch = (event) => {

        this.setState({
            [event.target.name]:event.target.value
        });

    }

    alertItem = (e) => {
        alert("Asset Id : "+e.assetId+""+ "\n"+"Serial Number: " + e.serialNumber + "\n"+
            "Location : "+ e.location + "\n"+ "Department ID: " + e.department+ "\nDepartment Name: " +e.departmentName+ "\n"+"Category: "+ e.type+ "\n"+
            "Brand: "+e.brand+ "\n" + "Model: "+ e.model + "\nPurchase Date: " + e.purchaseDate + "\n"+
            "Warranty Months: "+e.warrantyMonths +"\nSupplier: "+e.supplier+"\nSupplier Name: " + e.supplierName+ "\n"+ "IP Address; "+e.ipAddress + "\n" +
            "Purchase order Number: "+ e.purchaseOrderNumber + "\n"+ "Workstation Id: "+e.workStationId)
    }
    render() {
        const {location}  = this.state;
        const padding={
            padding:'10px'
        }
        return (
            <div>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <div style={padding}>
                    <Card>
                        <Card.Body>
                    <Form onReset={this.resetLocation.bind(this)} onSubmit={this.submitLocation.bind(this)} id={'filterLocationForm'}>
                            <Form.Group controlId={"formDepartmentFilter"} as={Row}>
                                <Form.Label column sm={'2'}>Filter by Location</Form.Label>
                                <Col sm={'7'}>
                                <Form.Control required
                                    type="text"
                                    name={"location"}
                                    placeholder={'Location'}
                                    value={location}

                                onChange={this.changeSearch}
                                />
                                </Col>

                                <Col sm={'1'}>
                                    <Button type={'submit'} onSubmit={this.submitLocation.bind(this)} className={'btn btn-primary btn-sm'}>
                                        Filter
                                    </Button>
                                </Col>
                                <Col sm={'2'}>
                                    <Button type={'reset'} onReset={this.resetLocation.bind(this)} className={'btn btn-secondary btn-sm'}>
                                        Reset
                                    </Button>
                                </Col>


                            </Form.Group>



                    </Form>

                        </Card.Body>
                    </Card>

                    {
                        this.state.initialSearch === true?
                            <div>Enter location to filter</div>:
                            <Table className={'table-sm'} striped bordered hover variant='light'>
                                <thead>
                                <tr>
                                    <td>Asset Id</td>
                                    <td>Serial Number</td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.equipment.length === 0?
                                        <tr>No items found for this location</tr>:

                                    this.state.equipment.map((e) => (
                                        <tr key={e.assetId}>
                                            <td>{e.assetId}</td>
                                            <td>{e.serialNumber}</td>
                                            <td>
                                                <Button className={'btn btn-warning btn-sm'} onClick={this.alertItem.bind(this,e)}>
                                                    View More Info
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>


                    }

                </div>

            </div>
        );
    }

}

export default WithAuth(LocationFilter);