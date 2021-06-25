import React from "react";
import Toast1 from "../Toasts/Toast1";
import Toast2 from "../Toasts/Toast2";
import {Button, Col, Form, Row} from "react-bootstrap";
import axios from "axios";

class AddBrand extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show = false
        this.state.nameWarningShow = false

        this.submitBrand.bind(this)
        this.resetBrand.bind(this)
        this.isBrandAvailable.bind(this)

    }

    componentDidMount() {
    }

    initialState ={
        nameWarningShow:'',
        brandAvailabilityStatus: '',
        brandName: '',

    }

    submitBrand = event =>{
        event.preventDefault();
        const URL_LOCALHOST_ADD = "http://localhost:8080/api/addBrand"
        //getting api ip address by global variable
        const URL_ADD = global.con + "/api/addBrand"

        const brand ={
            brandName: this.state.brandName
        }

        this.isBrandAvailable()

        if(this.state.brandAvailabilityStatus == 'available'){
            console.log("Brand is available")
            axios.post(URL_ADD,brand)
                .then(response => {
                    if(response.data !=  null){
                        this.resetBrand();
                        this.setState({"show": true})
                        setTimeout( () => this.setState( {"show":false}),3000)
                    }
                    else {
                        this.setState({"show":false})
                    }
                }).catch(error => {
                    alert("Error: cannot add brand"+error + "\nThe backend server might be down")
            })

            //this.resetBrand.bind(this)
        }
        else {
            console.log("Brand is not available")
        }


    }
    async isBrandAvailable(){

        if(this.state.brandName == null){
            console.log("Brand name is null")
        }
        else{
            const URL_LOCALHOST = "http://localhost:8080/api/isBrandAvailable/";
            //getting api ip address by global variable
            const URL_CHECK_AVAILABILITY = global.con + "/api/isBrandAvailable/";
            await axios.get(URL_CHECK_AVAILABILITY+this.state.brandName)
                .then( response => {
                    if(response.data ==  true){
                        console.log("Brand availability statue set available");
                        this.state.brandAvailabilityStatus = 'available'
                        return true;
                    }
                    else {
                        console.log("Brand availability statue set unavailable");
                        this.state.brandAvailabilityStatus = 'unavailable'
                        this.setState({"nameWarningShow" : true})
                        setTimeout(() => this.setState({"nameWarningShow" : false}),3000)
                        return  false;
                    }
                }).catch(error => {
                    alert("Error: cannot check brand availability \n"+error + "\nThe backend server might be down")
            })
        }

    }
    resetBrand = () => {

        this.setState( () => this.initialState)
    }
    brandChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
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
                            message:"Brand is already entered",
                            type: 'info',
                        }} />
                </div>

                <Form onSubmit={this.submitBrand.bind(this)} onReset={this.resetBrand.bind(this)}
                      id={'addNewBrandForm'}>

                    <Form.Row>
                        <Form.Group controlId={'formBrandName'} as={Col}>
                            <Form.Label>Brand Name</Form.Label>

                            <Form.Control
                                required
                                type="text"
                                name={'brandName'}
                                plceholder="Enter Brand"
                                defaultValue={this.state.brandName}

                                onChange={this.brandChange}
                            />
                        </Form.Group>

                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button type={'submit'} className={'btn btn-success'}>Submit</Button>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Button type={'reset'} className={'btn btn-info'}>Clear</Button>
                        </Form.Group>
                    </Form.Row>



                </Form>


            </div>
        );
    }

}

export default AddBrand