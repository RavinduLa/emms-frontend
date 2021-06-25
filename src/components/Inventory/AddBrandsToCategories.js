import React from "react";
import {Button, Col, Form} from "react-bootstrap";
import axios from "axios";
import Toast1 from "../Toasts/Toast1";
import Toast2 from "../Toasts/Toast2";

class AddBrandsToCategories extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show = false
        this.state.duplicateEntry = false
        this.state = {
            brandList : [],
            categoryList: []
        }
        this.submitCombo.bind(this)
        this.categoryChange.bind(this)
        this.brandChange.bind(this)

    }

    initialState = {
        brand:'',
        categoryName:'',
        brandList:[],
        categoryList: []
    }
    componentDidMount() {
        const URL_LOCALHOST_BRANDS = "http://localhost:8080/api/allBrands"
        const URL_LOCALHOST_CATEGORIES = "http://localhost:8080/api/allCategories"

        const URL_BRANDS = global.con + "/api/allBrands";
        const URL_CATEGORIES = global.con + "/api/allCategories";

        axios.get(URL_LOCALHOST_BRANDS)
            .then( response => response.data)
            .then( (data) => {
                this.setState({brandList: data})
                this.setState( {brand: data[0].brandName})
            }).catch(error => {
                alert(error)
        })

        axios.get(URL_LOCALHOST_CATEGORIES)
            .then( response => response.data)
            .then( (data) => {
                this.setState({categoryList: data})
                this.setState( {categoryName: data[0].categoryName})
            }).catch(error => {
            alert(error)
        })
    }

    submitCombo = (event) => {
        event.preventDefault()

        const combo = {
            category: this.state.categoryName,
            brand: this.state.brand
        }

        const LOCALHOST_URL_ADD_BRAND_TO_CATEGORY = "http://localhost:8080/api/addBrandToCategory/"

        axios.post(LOCALHOST_URL_ADD_BRAND_TO_CATEGORY,combo)
            .then(response => {
                if (response.data == true){
                    this.setState({"show" : true})
                    setTimeout(() => this.setState({"show" : false}),3000)
                }
                else {
                    this.setState({"show" : false})
                    this.setState({"duplicateEntry" : true})
                    setTimeout(() => this.setState({"duplicateEntry" : false}),3000)
                }
            }).catch(error => {
                alert(error)
        })


    }

    categoryChange = (event) => {
        event.preventDefault()
        this.setState({categoryName: event.target.value})
    }

    brandChange = (event) => {
        //event.preventDefault()
        this.setState({brand: event.target.value})
    }
    render() {
        return (
            <div>

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{
                            show:this.state.show,
                            message:"Brand added to category successfully",
                            type: 'success',
                        }} />
                </div>

                <div style={{"display":this.state.duplicateEntry ? "block" :"none" }}>
                    <Toast2
                        children={{
                            show:this.state.duplicateEntry,
                            message:"This brand is already in this Category",
                            type: 'warning',
                        }} />
                </div>

                <Form onSubmit={this.submitCombo.bind(this)}>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                required
                                as={'select'}
                                value={this.state.category}
                                onChange={this.categoryChange.bind(this)}>

                                {
                                    this.state.brandList.length === 0?
                                        <option>No categories registered</option>:
                                        this.state.categoryList.map( (e) => (
                                            <option value={e.categoryName} datatype={'text'}>
                                                {e.categoryName}
                                            </option>
                                        ))
                                }
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                required
                                as={'select'}
                                value={this.state.brand}
                                onChange={this.brandChange.bind(this)}>

                                {
                                    this.state.brandList.length === 0?
                                        <option>No brands registered</option>:
                                        this.state.brandList.map( (e) => (
                                            <option value={e.brandName} datatype={'text'}>
                                                {e.brandName}
                                            </option>
                                        ))
                                }
                            </Form.Control>


                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Button type={'submit'} className={'btn btn-secondary'}>Add Combination</Button>
                    </Form.Row>


                </Form>
            </div>
        );
    }

}

export default AddBrandsToCategories