import React from "react";
import Toast1 from "../Toasts/Toast1";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";

import BrandService from "../../service/BrandService";

import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";

class BrandList extends React.Component{

    constructor(props) {
        super(props);

        this.state = this.initialState
        this.state.show=  false
        this.state={
            brands: [],
        }

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }

        console.log("Permission : ", this.state.permission);
    }

    initialState ={
        brands: [],
        permission:'notPermitted',
        currentUser:''
    }

    componentDidMount() {

        const URL_LOCALHOST = "http://localhost:8080/api/allBrands";
        const URL_VIEW_ALL_BRANDS = global.con + "/api/allBrands"

        //axios.get(URL_LOCALHOST)
        BrandService.getAllBrands()
            .then(response => response.data)
            .then( (data) => {
                this.setState( {brands : data})
            }).catch(error => {
                alert("Error: cannot view brand list\n" + error+ "\nThe backend server might be down.")
        })
    }

    deleteBrand= (brandId) => {
        const DELETE_LOCALHOST_URL = "http://localhost:8080/api/deleteBrand/";
        const DELETE_BRAND = global.con + "/api/deleteBrand/";

        //axios.delete(DELETE_BRAND+brandId)
        BrandService.deleteBrand(brandId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show" : true})
                    setTimeout(() => this.setState({"show" : false}),3000)

                    this.setState(
                        {brands: this.state.brands.filter(brands =>brands.brandId !==brandId)
                        })
                }
            }).catch(error => {
                alert("Could not delete brand"+error+"The backend server might be down.")
        });
    }

    handleDeletion = (brandId) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Delete this item? ',
            buttons: [
                {
                    label: 'Yes, Delete',
                    onClick: this.deleteBrand.bind(this, brandId)
                },
                {
                    label: 'No',
                    //onClick: onclose
                    onClick: this.displayCancelled.bind(this)
                }
            ]
        })
    }

    displayCancelled(){
        alert("Deletion cancelled")
    }

    render() {
        return (
            <div>
                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.show,
                            message:"Brand deleted successfully",
                            type: 'danger'}}/>
                </div>

                <Link to={'/addBrand'}>Add new brand</Link>
                <Table className={'table-sm'} striped bordered hover variant='light'>
                    <thead>
                        <tr>
                            <th>Brand Id</th>
                            <th>Brand Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.brands.length === 0?
                            <tr align='center'>
                                <td colSpan={6}> {this.state.brands.length} records available </td>
                            </tr>:
                            this.state.brands.map((e) => (
                                <tr key={e.brandId}>
                                    <td>{e.brandId}</td>
                                    <td>{e.brandName}</td>

                                    <td>
                                        <Button
                                            onClick={this.handleDeletion.bind(this,e.brandId)}
                                            className={'btn btn-danger btn-sm'}>Delete</Button>
                                    </td>
                                </tr>

                            )
                            )
                    }
                    </tbody>
                </Table>

            </div>
        );
    }

}

export default WithAuth(BrandList);