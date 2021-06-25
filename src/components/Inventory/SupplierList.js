import React from "react";
import axios from "axios";
import {Button, Container, Table} from "react-bootstrap";
import Toast1 from "../Toasts/Toast1";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";

class SupplierList extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show=  false
        this.state.modalShow = false

        this.state={
            suppliers: [],
        }

        //this.deleteSupplier =this.deleteSupplier.bind(this)
    }

    initialState = {
        suppliers: []
    }
    componentDidMount() {

        const URL_GET_SUPPLIERS = global.con + "/api/allSuppliers";
        axios.get(URL_GET_SUPPLIERS)
            .then(response => response.data)
            .then((data) => {
                this.setState({suppliers:data})
            })


    }

    deleteSupplier = (supplierId) => {

        const URL_DELETE_SUPPLIER = global.con + "/api/deleteSupplierById/";

        axios.delete(URL_DELETE_SUPPLIER+supplierId)
            .then(response => {
                if(response.data != null){
                    console.log("Deleting supplier")
                    this.setState({"show":true})
                    setTimeout(() => this.setState({"show" : false}),3000)
                    this.setState({
                        suppliers: this.state.suppliers.filter(suppliers => suppliers.supplierId !== supplierId)
                    })
                }
            }).catch(error => {
                alert(error)
        })

    }

    handleDelete = (supplierId) => {

        confirmAlert(   {
            title: 'Confirm Deletion',
            message: 'Delete this supplier? ',
            buttons: [
                {
                    label: 'Yes',
                    onClick: this.deleteSupplier.bind(this,supplierId)
                },
                {
                    label: 'No',
                    onClick: this.displayCanceled.bind(this)
                }
            ]
        })

    }

    displayCanceled(){
        alert("Deletion Cancelled")
    }

    render() {
        return (
            <div>
                <Link to={'/addSupplier'}>Add supplier</Link>
                <Container fluid>
                    <div>
                        <div style={{"display":this.state.show ? "block" :"none" }}>
                            <Toast1
                                children={{show:this.state.show,
                                    message:"Equipment deleted successfully",
                                    type: 'danger'}}/>
                        </div>

                        <Table striped bordered hover variant='light'>
                            <thead>
                            <tr>
                                <th>Supplier Id</th>
                                <th>Supplier Name</th>
                                <th>Supplier Phone</th>
                                <th>Supplier Email</th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                this.state.suppliers.length === 0?
                                    <tr align={'center'}>
                                        <td colSpan={6}>{this.state.suppliers.length} records available</td>
                                    </tr>:
                                    this.state.suppliers.map(  (e) => (
                                        <tr key={e.supplierId}>
                                            <td>{e.supplierId}</td>
                                            <td>{e.supplierName}</td>
                                            <td>{e.phone}</td>
                                            <td>{e.email}</td>

                                            <td>
                                                <Button className={'btn btn-danger'} onClick={this.handleDelete.bind(this,e.supplierId)}>Delete</Button>
                                            </td>
                                        </tr
                                        >
                                    ))

                            }
                            </tbody>
                        </Table>
                    </div>
                </Container>

            </div>
        );
    }

}

export default SupplierList;