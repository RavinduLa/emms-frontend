import React from "react";
import axios from "axios";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";

class InventorySearchSN extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.submitSearch = this.submitSearch.bind(this);
        this.changeSearch = this.changeSearch.bind(this);
        this.resetSearch = this.resetSearch.bind(this);
    }

    initialState ={
        equipment:'',
        assetId:'',
        serialNumber:'',
        location:'',
        departmentId:'',
        itemFoundStatus:'',
        initialSearch:true,
        departmentName:'',
        supplierId:'',
        supplierName:'',
        model:'',
        brand:'',
        purchaseDate:'',
        poNumber:'',
        warrantyMonths:'',
        type:'',
        wsId:'',
        ipAddress:''
    }

    componentDidMount() {
    }

    resetSearch= (event) =>{
        this.setState( () => this.initialState);
    }

    changeSearch=(event) =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    submitSearch = async (event) => {
        event.preventDefault();
        const URL_SEARCHINVENTORY = global.con+"/api/getEquipmentForSerialNumber/";
        const URL_DEPARTMENT = global.con+"/api/getDepartmentNameById/";
        const URL_SUPPLIER = global.con+"/api/getSupplierNameForId/";
        this.setState({serialNumber: event.target.value});
        await axios.get(URL_SEARCHINVENTORY + this.state.serialNumber)
            .then(response => response.data)
            .then((data) => {
                //console.log(data)
                if(data.serialNumber == null){
                    this.setState({initialSearch: false})
                    this.setState({itemFoundStatus: 'notFound'})
                }
                else{
                    this.setState({initialSearch: false})
                    this.setState({itemFoundStatus: 'found'})
                    this.setState({equipment: data})
                    this.setState({assetId: data.assetId})
                    this.setState({serialNumber: data.serialNumber})
                    this.setState({location: data.location})
                    this.setState({departmentId: data.department})
                    this.setState({supplierId: data.supplier})
                    this.setState({brand: data.brand})
                    this.setState({model:data.model})
                    this.setState({purchaseDate: data.purchaseDate})
                    this.setState({warrantyMonths: data.warrantyMonths})
                    this.setState({type: data.type})
                    this.setState({wsId: data.workStationId})
                    this.setState({ipAddress: data.ipAddress})
                    this.setState({poNumber: data.purchaseOrderNumber})
                    console.log(this.state.equipment)
                }


            })

        await axios.get(URL_DEPARTMENT + this.state.departmentId)
            .then(response => response.data)
            .then( (data) => {
                this.setState({departmentName: data})
            })

        await axios.get(URL_SUPPLIER + this.state.supplierId)
            .then(response => response.data)
            .then( (data) => {
                this.setState({supplierName: data})
            })

    }

    render() {
        const {serialNumber} = this.state;
        const padding={
            padding:'10px'
        }
        const padding2={
            padding:'70px'
        }
        return (
            <div>

                <div style={padding}>

                    <Form onReset={this.resetSearch.bind(this) } onSubmit={this.submitSearch.bind(this)} id={'searchBySNForm'}>
                        <Card>
                        <Card.Body>
                                <Form.Group controlId={'formAssetId'} as={Row}>
                                    <Form.Label column sm="4">Search by Serial Number</Form.Label>
                                    <Col sm="4">
                                    <Form.Control required
                                                  type="text"
                                                  name={'serialNumber'}
                                                  placeHolder={"Serial Number"}
                                        /*defaultValue={'123'}*/
                                                  value={serialNumber}

                                                  onChange={this.changeSearch}
                                    />
                                    </Col>
                                    <Col sm={'2'}>
                                        <Button  type={'submit'} onSubmit={this.submitSearch.bind(this)} className={'btn btn-primary btn-sm'}>Search</Button>
                                    </Col>
                                    <Col sm={'1'}>
                                        <Button type={'reset'} onReset={this.resetSearch.bind(this)} className={'btn btn-secondary btn-sm'}>Reset</Button>
                                    </Col >
                                </Form.Group>




                        </Card.Body>
                        </Card>
                    </Form>

                    {/*{
                    this.state.equipment === ''?
                        <div>Search to get results</div>   :

                        <div>  {new DisplayItem(this.state.equipment)  }  </div>
                }*/}

                    {
                        this.state.initialSearch === true ?
                            <div>
                                Search to get results
                            </div> :

                            this.state.itemFoundStatus === 'notFound' ?
                                <div style={padding2}>
                                    <center>
                                        <h2>No Results</h2>
                                    </center>
                                </div>:
                            <div>
                                <Row>
                                    <Col>
                                        <Table className={'table-sm'} striped bordered hover variant='success'>
                                            <tr>
                                                <td>Asset Id</td>
                                                <td>{this.state.assetId}</td>
                                            </tr>
                                            <tr>
                                                <td>Serial Number</td>
                                                <td>{this.state.serialNumber}</td>
                                            </tr>

                                            <tr>
                                                <td>Location</td>
                                                <td>{this.state.location}</td>
                                            </tr>

                                            <tr>
                                                <td>Department</td>
                                                <td>{this.state.departmentName}</td>
                                            </tr>

                                            <tr>
                                                <td>Supplier</td>
                                                <td>{this.state.supplierName}</td>
                                            </tr>

                                            <tr>
                                                <td>Type</td>
                                                <td>{this.state.type}</td>
                                            </tr>



                                        </Table>
                                    </Col>
                                    <Col>
                                        <Table className={'table-sm'} striped bordered hover variant='success'>
                                            <tr>
                                                <td>Brand</td>
                                                <td>{this.state.brand}</td>
                                            </tr>
                                            <tr>
                                                <td>Model</td>
                                                <td>{this.state.model}</td>
                                            </tr>


                                            <tr>
                                                <td>Purchase Date</td>
                                                <td>{this.state.purchaseDate}</td>
                                            </tr>
                                            <tr>
                                                <td>Warranty Months</td>
                                                <td>{this.state.warrantyMonths}</td>
                                            </tr>

                                            <tr>
                                                <td>PO Number </td>
                                                <td>{this.state.poNumber}</td>
                                            </tr>

                                            <tr>
                                                <td>Workstation Id</td>
                                                <td>{this.state.wsId}</td>
                                            </tr>

                                            <tr>
                                                <td>IP Address</td>
                                                <td>{this.state.ipAddress}</td>
                                            </tr>
                                        </Table>
                                    </Col>
                                </Row>

                            </div>
                    }
                </div>


            </div>
        );
    }

}

export default InventorySearchSN;