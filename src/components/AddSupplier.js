import React from "react";
import {Button, Col, Form} from "react-bootstrap";
import axios from "axios";
import Toast1 from "./Toast1";
import Toast2 from "./Toast2";

class AddSupplier extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false
        this.state.nameWarningShow = false

        this.submitSupplier = this.submitSupplier.bind(this)
        this.resetSupplier= this.resetSupplier.bind(this)
        this.isSupplierAvailable = this.isSupplierAvailable.bind(this)

    }

    initialState = {
        supplierName: '',
        phone: '',
        email: '',
        nameWarningShow:'',
        supplierAvailability:''
    }



    componentDidMount() {

    }

    submitSupplier = (event) =>{
        event.preventDefault();
        const URL_LOCAL_HOST_ADD = "http://localhost:8080/api/addSupplier/";
        const  URL_ADD_SUPPLIER = global.con + "/api/addSupplier/";

        this.isSupplierAvailable();

        const Supplier = {
            supplierName : this.state.supplierName,
            phone: this.state.phone,
            email: this.state.email
        }

        if(this.state.supplierAvailability == 'available'){

            axios.post(URL_ADD_SUPPLIER,Supplier)
                .then( response => {
                    if(response.data != null){
                        this.resetSupplier();
                        this.setState({"show": true})
                        setTimeout( () => this.setState( {"show":false}),3000)
                    }
                    else {
                        this.setState({"show":false})
                    }
                }).catch(error => {
                    alert(error+" The backend server might be down.")
            })
        }
        else {
            console.log("Supplier name is not available")
        }


    }

    isSupplierAvailable(){
        if(this.state.supplierName == null){
            console.log("Supplier name is null")
        }
        else{
            //const URL_LOCALHOST_CHECK_AVAILABILITY = "http://localhost:8080/api/isSupplierAvailable/";
            const URL_CHECK_AVAILABILITY = global.con+"/api/isSupplierAvailable/";


            axios.get(URL_CHECK_AVAILABILITY+this.state.supplierName)
                .then( response =>{
                    if(response.data == true){
                        this.state.supplierAvailability = 'available'
                        return true
                    }
                    else {
                        this.state.supplierAvailability = 'unavailable'
                        this.setState({"nameWarningShow" : true})
                        setTimeout(() => this.setState({"nameWarningShow" : false}),3000)
                        return  false;
                    }
                }).catch(error => {
                    alert(error)
            })
        }
    }

    resetSupplier (){
        this.setState( () => this.initialState)
        //this.state = this.initialState;
    }

    supplierChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        const {supplierName,phone,email} = this.state;
        const padding={
            padding:'20px'
        }
        return (
            <div style={padding}>

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{
                            show:this.state.show,
                            message:"Supplier added successfully",
                            type: 'success',
                        }} />
                </div>

                <div style={{"display":this.state.nameWarningShow ? "block" :"none" }}>
                    <Toast2
                        children={{
                            show:this.state.nameWarningShow,
                            message:"Supplier name is already entered",
                            type: 'info',
                        }} />
                </div>
                <Form onSubmit={this.submitSupplier.bind(this)} onReset={this.resetSupplier.bind(this)}>
                    <Form.Row>
                        <Form.Group controlId={'formSupplierName'} as={Col}>
                            <Form.Label>Supplier Name</Form.Label>
                            <Form.Control required
                            type={'text'}
                            name={'supplierName'}
                            placeHolder={'Enter Supplier Name'}
                                          value={supplierName}
                            onChange={this.supplierChange}/>
                        </Form.Group>

                        <Form.Group controlId={'formSupplierPhone'} as={Col}>
                            <Form.Label>Supplier Phone Number</Form.Label>
                            <Form.Control required
                                          type={'text'}
                                          name={'phone'}
                                          placeHolder={'Enter Supplier Phone Number'}
                                          defaultValue={phone}
                                          onChange={this.supplierChange}/>
                        </Form.Group>

                        <Form.Group controlId={'formSupplierEmail'}  as={Col}>
                            <Form.Label>Supplier Email</Form.Label>
                            <Form.Control required
                                          type={'text'}
                                          name={'email'}
                                          placeHolder={'Enter Supplier Email'}
                                          defaultValue={email}
                                          onChange={this.supplierChange}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Button type={'submit'} className={'btn btn-success'}>Submit</Button>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Button type={'reset'} className={'btn btn-info'}>Reset</Button>
                        </Form.Group>
                    </Form.Row>
                </Form>

            </div>
        );
    }

}

export default AddSupplier