import React from "react";
import Toast1 from "../Toasts/Toast1";
import {Button, Col, Form} from "react-bootstrap";
import axios from "axios";
import Toast2 from "../Toasts/Toast2";
import BrandService from "../../service/BrandService";
import ModelService from "../../service/ModelService";
import WithAuth from "../../service/WithAuth";

class AddModels extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show = false
        this.state.nameWarningShow = false
        this.state = {
            brandList : []
        }

        this.submitModel.bind(this)
        this.modelChange.bind(this)
        this.brandChange.bind(this)

    }

    initialState = {
        modelId:'',
        model:'',
        brand: '',
        modelAvailabilityStatus:'',

        brandList: []
    }

    componentDidMount() {
        const LOCAL_HOST_URL = "http://localhost:8080/api/allBrands";
        const URL_ALL_BRANDS = global.con + "/api/allBrands"
        //axios.get(LOCAL_HOST_URL)
            BrandService.getAllBrands()
            .then(response => response.data)
            .then((data) => {
                this.setState({brandList: data})
                this.setState({brand: data[0].brandName })
            }).catch(error => {
                alert(error)
        })
    }

    submitModel = (event) => {

        event.preventDefault();

        const URLLocalHost = "http://localhost:8080/api/addModel";
        const URL_ADD_MODELS = global.con + "/api/addModel";

        const model = {
            model: this.state.model,
            brand: this.state.brand
        }

        this.isModelAvailable();
        if(this.state.modelAvailabilityStatus == 'available'){
            console.log("Model details" + model.modelId+ model.model)
            //axios.post(URL_ADD_MODELS, model)
                ModelService.addModel(model)
                .then(response => {
                    if (response.data != null){
                        this.setState({"show" : true})
                        setTimeout(() => this.setState({"show" : false}),3000)
                    }
                    else {
                        this.setState({"show" : false})
                    }
                }).catch(reject => {
                alert(reject)
            })
            this.resetModel()
        }

        else {
            console.log("Model is not available")
        }

    }

    isModelAvailable(){
        if(this.state.model == null){
            console.log("Model name is null")
        }
        else{
            const URL_LOCALHOST = "http://localhost:8080/api/isModelAvailable/";
            const URL_CHECK_MODEL_AVAILABILITY =global.con + "/api/isModelAvailable/";
            //axios.get(URL_CHECK_MODEL_AVAILABILITY+this.state.model)
            ModelService.isModelAvailable(this.state.model)
                .then( response => {
                    if(response.data == true){
                        this.state.modelAvailabilityStatus = 'available'
                        return true;
                    }
                    else {
                        this.state.modelAvailabilityStatus = 'unavailable'
                        this.setState({"nameWarningShow" : true})
                        setTimeout(() => this.setState({"nameWarningShow" : false}),3000)
                        return  false;
                    }
                }).catch(error => {
                    alert(error)
                })
        }
    }



    resetModel = () => {
        this.setState( () => this.initialState);
        const LOCAL_HOST_URL = "http://localhost:8080/api/allBrands";
        const URL_ALL_BRANDS = global.con + "/api/allBrands";
        //axios.get(URL_ALL_BRANDS)
        BrandService.getAllBrands()
            .then( response => response.data)
            .then((data) => {
                this.setState({brandList: data})
            });

    }

    modelChange = (event) => {
        this.setState({
            [event.target.name]:event.target.value
        });

    }

    brandChange = (event) => {
        this.setState( {brand: event.target.value});

    }

    render() {
        const padding={
            padding:'20px'
        }
        return (
            <div style={padding}>

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{
                            show:this.state.show,
                            message:"Brand added successfully",
                            type: 'success',
                        }} />
                </div>

                <div style={{"display":this.state.nameWarningShow ? "block" :"none" }}>
                    <Toast2
                        children={{
                            show:this.state.nameWarningShow,
                            message:"Model is already entered",
                            type: 'warning',
                        }} />
                </div>


                <Form onSubmit={this.submitModel.bind(this)} onReset={this.resetModel.bind(this)}
                id={'modelAddForm'}>
                    <Form.Row>

                        <Form.Group controlId={'formBrandName'}>
                            <Form.Label>Brand</Form.Label>

                            <Form.Control
                                as={"select" } required name={'brand'}
                                /*defaultValue={"None"}*/
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
                        <Form.Group controlId={'formModelName'} as={Col}>
                            <Form.Label>Add Model</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name={'model'}
                                placeholder="Enter Model"
                                value={this.state.model}

                                onChange={this.modelChange.bind(this)}
                            />

                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button type={'submit'} className={'btn btn-success'}>Submit</Button>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Button type={'reset'} className={'btn btn-secondary'}>Reset</Button>
                        </Form.Group>
                    </Form.Row>



                </Form>

            </div>
        );
    }

}

export default WithAuth(AddModels);