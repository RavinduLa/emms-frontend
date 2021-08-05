import React, {useState} from "react";
import {Button, Container, Table} from "react-bootstrap";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import Toast1 from "../Toasts/Toast1";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import WithAuth from "../../service/WithAuth";
//import { AlertWrapper } from 'react-alerts-plus';
import Modal from "react-modal";
import MyModal from "../Modals/MyModal";
import EquipmentService from "../../service/EquipmentService";
import UserService from "../../service/UserService";

const Modal1 = (e) => {
    const [modelIsOpen, setModalIsOpen] = useState(false)
    return(
        <div>
            <Modal isOpen={true}>
                <h2>Modal Header</h2>
                <p>Modal Body</p>
            </Modal>
        </div>
    )
}

const CustomToast = ({closeToast}) => {
    return(
        <div>
            asfasffa
            <button onClick={closeToast}>Close</button>
        </div>
    )
}

class InventoryList extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show=  false;
        this.state.modalShow = false;
        this.state={
            singleEquipment: '',
            equipment: [],
        }
        //this.handleClose = this.handleClose.bind(this);
        //this.handleOpen = this.handleOpen.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.displayCancelled = this.displayCancelled.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        //this.viewSingleItem = this.viewSingleItem.bind(this)

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
                else if(e== 'VIEWER'){
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
    initialState ={
        singleEquipment:'',
        equipment: [],
        permission:'notPermitted',
        currentUser:''
    }

    componentDidMount =  () =>  {

        /*axios.get("http://localhost:8080/api/equipment")
            .then(response => response.data)
            .then((data) => {
                this.setState({equipment: data})
            });*/

        const URL_LOCALHOST = "http://localhost:8080/api/equipment";
        const URLIP = "http://172.31.8.58:8080/api/equipment";
        const DELETE_LOCALHOST_URL = "http://localhost:8080/api/deleteEquipment/";
        const URL_GET_EQUIPMENT = global.con + "/api/equipment";
        const URL_DELETE_EQUIPMENT = global.con + "/api/deleteEquipment/";
        //const URL_GET_SUPPLIERS = global.con + "";

        //axios.get(URL_GET_EQUIPMENT)
        EquipmentService.getAllEquipment()
            .then(response => response.data)
            .then( (data) => {
                console.log("Fetched all equipment. Setting to state");
                this.setState({equipment: data});
                console.log("Equipment set to state.");

            }).catch(error => {
                console.log("Equipment fetching failed with error :  " + error);
        });

        console.log("Equipment : " + this.state.equipment);

        /*fetch('http://localhost:8080/api/equipment')
            .then(response => response.json())
            .then(data => console.log(data));*/

        /*fetch("http://localhost:8080/api/equipment",{mode:'cors'})
            .then(response => response.json())
            .then((data) => {
                this.setState({equipment: data})
            });*/


    }



    deleteItem = (assetId) =>{

        const URL_LOCALHOST = "http://localhost:8080/api/equipment";
        const URL_IP = "http://172.31.8.58:8080/api/equipment";
        const DELETE_LOCALHOST_URL = "http://localhost:8080/api/deleteEquipment/";
        const URL_DELETE = global.con + "/api/deleteEquipment/"

        //axios.delete(URL_DELETE+assetId)
            EquipmentService.deleteEquipment(assetId)
            .then(response => {
               if(response.data != null){
                   //alert("Item deleted");
                   this.setState({"show" : true})
                   setTimeout(() => this.setState({"show" : false}),3000)
                   this.setState({
                       equipment: this.state.equipment.filter(equipment => equipment.assetId !== assetId)
                   })
               }
            });
    }

    displayCancelled = () =>  {

        const options = {
            message: 'My alert message',
            style: {
                backgroundColor: 'cornflowerblue',
                borderRadius: 0,
            },
            offset: '50px',
            position: 'top right',
            duration: 0,
        }


        alert("Deletion Cancelled");
    }
    handleDelete = (assetId) =>{

        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Delete this item? ',
            buttons: [
                {
                    label: 'Yes, Delete',
                    onClick: this.deleteItem.bind(this, assetId)
                },
                {
                    label: 'No',
                    //onClick: onclose
                    onClick: this.displayCancelled.bind(this)
                }
            ]
        })

    }

    viewSingleItem (e) {


        /*const URL_LOCALHOST = "http://localhost:8080/api/getequipmentById/";
        axios.get(URL_LOCALHOST+assetId)
            .then(response => response.data)
            .then((data) => {
                this.setState({singleEquipment: data})
            });*/

        //alert(e.assetId+e.serialNumber+e.location)
        console.log("Viewing single item")
        this.handleOpen.bind(this)
        return(


            /*<MyModal />*/


                <Modal show={this.state.modalShow} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{e.assetId}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Serial Number: {e.serialNumber}</p>
                        <p>Location: {e.location}</p>
                        <p>Department: {e.department}</p>
                        <p>Category: {e.type}</p>
                        <p>Brand: {e.brand}</p>
                        <p>Model: {e.model}</p>
                        <p>Purchase Date: {e.purchaseDate}</p>
                        <p>Warranty Months: {e.warrantyMonths}</p>
                        <p>IP Address(If applicable) : {e.ipAddress}</p>
                        <p>Workstation Id: {e.workStationId}</p>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant={'info'} onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

        )


    }

    alertItem = (e) => {
        alert("Asset Id : "+e.assetId+""+ "\n"+"Serial Number: " + e.serialNumber + "\n"+
        "Location : "+ e.location + "\n"+ "Department ID: " + e.department+ "\nDepartment Name: " +e.departmentName+ "\n"+"Category: "+ e.type+ "\n"+
        "Brand: "+e.brand+ "\n" + "Model: "+ e.model + "\nPurchase Date: " + e.purchaseDate + "\n"+
        "Warranty Months: "+e.warrantyMonths +"\nSupplier: "+e.supplier+"\nSupplier Name: " + e.supplierName+ "\n"+ "IP Address; "+e.ipAddress + "\n" +
        "Purchase order Number: "+ e.purchaseOrderNumber + "\n"+ "Workstation Id: "+e.workStationId)
    }

    handleClose = () => {
        this.state.modalShow = false
    }
    handleOpen = () => {
        this.state.modalShow = true
    }

    callCustomToast ( ){

    }
    render() {
        return(
            <Container fluid>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }
            <div>
                    <div style={{"display":this.state.show ? "block" :"none" }}>
                        <Toast1
                            children={{show:this.state.show,
                                message:"Equipment deleted successfully",
                                type: 'danger'}}/>
                    </div>
                <Table className={'table-sm'}striped bordered hover  variant='light' >

                    <thead>
                    <tr>
                        <th>Asset Id</th>
                        <th>Serial Number</th>
                        <th>Location</th>
                        <th>Department</th>
                        <th>Brand</th>
                        <th>Model</th>
                        {/*<th>Purchase Date</th>
                        <th>Warranty Months</th>*/}
                        <th>IP address</th>
                        {/*<th>PO Number</th>*/}
                        <th>Workstation ID</th>
                    </tr>

                    </thead>

                    <tbody>
                    {
                        this.state.equipment.length === 0?
                            <tr align='center'>
                                <td colSpan={6}> {this.state.equipment.length} records available </td>
                            </tr> :
                            this.state.equipment.map( (e) => (
                                    <tr key={e.assetId}>
                                        <td>{e.assetId}</td>
                                        <td>{e.serialNumber}</td>
                                        <td>{e.location}</td>
                                        {/*<td>{e.department}</td>*/}
                                        <td>{e.departmentName}</td>
                                        <td>{e.brand}</td>
                                        <td>{e.model}</td>
                                        {/*<td>{e.purchaseDate}</td>
                                        <td>{e.warrantyMonths}</td>*/}
                                        <td>{e.ipAddress}</td>
                                        {/*<td>{e.purchaseOrderNumber}</td>*/}
                                        <td>{e.workStationId}</td>



                                        <td>
                                            {/*<Link to={{
                                                pathname: '/singleEquipment',
                                                data: {
                                                    assetId: e.assetId,
                                                    serialNumber: e.serialNumber,
                                                    location: e.location,
                                                    department: e.department,
                                                    type: e.type,
                                                    brand: e.brand,
                                                    model: e.model,
                                                    purchaseDate: e.purchaseDate,
                                                    ipAddress: e.ipAddress,
                                                    warrantyMonths: e.warrantyMonths,
                                                    workStationId: e.workStationId,
                                                    purchaseOrderNumber: e.purchaseOrderNumber
                                                },
                                            }} >
                                                View
                                            </Link>*/}

                                            <Button className={'btn btn-primary btn-sm'} onClick={this.alertItem.bind(this,e)}  >
                                                View More Details
                                            </Button>

                                            {/*<Button className={'btn btn-secondary btn-sm'} onClick={this.viewSingleItem(e)}  >
                                                Modal
                                            </Button>*/}
                                        </td>

                                        {/*<td>
                                            <Link to={{
                                                pathname: '/updateEquipment',
                                                data: {
                                                    assetId: e.assetId,
                                                },
                                            }} >
                                                Edit Item details
                                            </Link>
                                        </td>*/}

                                        <td>

                                            <Button
                                                //onClick={this.deleteItem.bind(this,e.assetId)}
                                                onClick={this.handleDelete.bind(this,e.assetId)}
                                                className={'btn btn-danger btn-sm'}>Delete</Button>
                                        </td>

                                    </tr>
                                )

                            )
                    }


                    </tbody>
                </Table>
            </div>
            </Container>

        );
    }
}

export default WithAuth(InventoryList);