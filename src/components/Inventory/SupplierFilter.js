import React from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import SupplierService from "../../service/SupplierService";
import EquipmentService from "../../service/EquipmentService";

class SupplierFilter extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.initialState;

        this.alertItem=this.alertItem.bind(this);
        this.resetSupplierFilter=this.resetSupplierFilter.bind(this);
        this.submitSupplierFiler=this.submitSupplierFiler.bind(this);
        this.supplierFilterChange=this.supplierFilterChange.bind(this);

    }

    initialState={

        supplierList:[],
        supplierId:'',
        supplierName:'',
        selectedSupplierId:'',
        equipment:[],
        filterInitiated:false

    }
    async componentDidMount(){

        const URL_SUPPLIER = global.con+"/api/allSuppliers/";

        //await axios.get(URL_SUPPLIER)
        await SupplierService.getAllSuppliers()
            .then(response => response.data)
            .then((data) => {
                this.setState({supplierList: data})
                this.setState({supplierId: data[0].supplierId})
                this.setState({supplierName: data[0].supplierName})
                this.setState({selectedSupplierId: data[0].supplierId})
            }).catch(error => {
                alert("Error: backednd servcermight be down \n"+error)
            })

    }
    resetSupplierFilter= async (event)=>{
        this.setState( () => this.initialState);
        const URL_SUPPLIER = global.con+"/api/allSuppliers/";

        //await axios.get(URL_SUPPLIER)
        await SupplierService.getAllSuppliers()
            .then(response => response.data)
            .then((data) => {
                this.setState({supplierList: data})
                this.setState({supplierId: data[0].supplierId})
                this.setState({supplierName: data[0].supplierName})
                this.setState({selectedSupplierId: data[0].supplierId})
            }).catch(error => {
                alert("Error: backednd servcermight be down \n"+error)
            })
    }

    supplierFilterChange=(event)=>{
        event.preventDefault();
        this.setState({supplierId: event.target.value})
        this.setState({selectedSupplierId: event.target.value})
    }

    submitSupplierFiler = async (event) => {
        event.preventDefault();
        const URL_EQUIPMENT= global.con+"/api/getEquipmentForSupplier/";
        this.setState({filterInitiated: true})

        //await axios.get(URL_EQUIPMENT+this.state.supplierId)
            await EquipmentService.getEquipmentForSupplier(this.state.supplierId)
            .then(response => response.data)
            .then((data) => {
                this.setState({equipment: data})
            }).catch(error =>{
                alert("Error in getting equipment: \n"+error+"\nBackend server might be down")
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

        const {supplierId,supplierName}  = this.state;
        const padding={
            padding:'10px'
        }
        return (
            <div>

                <div style={padding}>
                    <Card>
                        <Card.Body>
                            <Form onReset={this.resetSupplierFilter.bind(this)} onSubmit={this.submitSupplierFiler.bind(this)}>
                                    <Form.Group as={Row} controlId={'formSupplierFilter'}>
                                        <Form.Label column sm="2">Filter by Supplier</Form.Label>

                                        <Col sm="7">
                                        <Form.Control
                                        as={"select"} required name={'supplier'}
                                        defaultValue={'defSup'}
                                        value={supplierId}
                                        onChange={this.supplierFilterChange.bind(this)}>

                                            {
                                                this.state.supplierList.length === 0?
                                                    <option>No suppliers loaded</option>:
                                                    this.state.supplierList.map( (e) => (
                                                        <option value={e.supplierId} datatype={"text"}>
                                                            {e.supplierName}
                                                        </option>
                                                    ))
                                            }

                                        </Form.Control>

                                        </Col>

                                        <Col sm={'1'}>
                                            <Button type={'submit'}  className={'btn btn-primary btn-sm'}>
                                                Filter
                                            </Button>
                                        </Col>
                                        <Col sm={'2'}>
                                            <Button type={'reset'}  className={'btn btn-secondary btn-sm'}>
                                                Reset
                                            </Button>
                                        </Col>

                                    </Form.Group>

                            </Form>
                        </Card.Body>
                    </Card>

                    {
                        this.state.filterInitiated === false?
                            <div><p>Filter to get results</p></div>:
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
                                        <tr>No records for this supplier</tr>:
                                        this.state.equipment.map( (e) => (
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
export default SupplierFilter;