import React from "react";
import axios from "axios";
import {render} from "@testing-library/react";
import {Button, Col, Form} from "react-bootstrap";
import Toast1 from "../Toasts/Toast1";
import WithAuth from "../../service/WithAuth";

class EditEquipment extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show =  false;


    }

    initialState= {
        existingEquipment : {
            assetId: '',
            serialNumber: '',
            location: '',
            brand: '',
            model: '',
            purchaseDate: '',
            warrantyMonths: '',
        },
        newEquipment: {
            assetId: '',
            serialNumber: '',
            location: '',
            brand: '',
            model: '',
            purchaseDate: '',
            warrantyMonths: '',
        },
        receivedAssetId: ''
    }

    componentDidMount() {
        const {data} = this.props.location;

        this.state.receivedAssetId  = data.assetId;

        /*this.setState(
            this.state.receivedAssetId =  data.assetId,
        )*/

        console.log("received asset ID: "+ this.state.receivedAssetId);

        const URL_LOCALHOST = "http://localhost:8080/api/getEquipmentById/";
        axios.get(URL_LOCALHOST+this.state.receivedAssetId)
            .then( response=> response.data)
            .then( (data) => {

                this.setState(
                    {existingEquipment:data}
                )

            })

        console.log("asset details :" + this.state.existingEquipment.assetId + this.state.existingEquipment.serialNumber)


    }

    updateDetails = event => {

        event.preventDefault();
        const URLLocalHost = "http://localhost:8080/api/updateEquipment";
        const URLIP = "http/192.168.12.9:8080/api/updateEquipment";

        const equipment = {
            assetId: this.state.assetId,
            serialNumber: this.state.serialNumber,
            location: this.state.location,
            brand: this.state.brand,
            model: this.state.model,
            type: this.state.type,
            purchaseDate: this.state.purchaseDate,
            warrantyMonths: this.state.warrantyMonths,
        }

        axios.post(URLLocalHost, equipment)
            .then(response => {
                if(response.data != null){
                    this.setState({"show" : true})
                    setTimeout(() => this.setState({"show" : false}),3000)
                    //alert("Equipment added to the inventory succesfully")
                }
                else {
                    this.setState({"show" : false})
                }
            }).catch( (reject) => {
                alert("Rejected"+reject);
        })

    }

    equipmentChange = event =>{


        this.setState({
            [event.target.name]:event.target.value
        });

    }
    /*equipmentChange (event){
        this.setState(this.state.newEquipment = event.target.value );
    }*/


    render(){

        return(
            <div>
                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{
                            show:this.state.show,
                            message:"Equipment edited successfully",
                            type: 'warning',
                        }} />
                </div>

                <div>

                <h2>Edit Equipment Details</h2>

                <Form onSubmit={this.updateDetails} id={'editEquipmentDetails'}>

                    <Form.Group controlId={"formAssetId"} as={Col}>
                        <Form.Label>AssetId Current Value : </Form.Label>
                        <Form.Label>{this.state.existingEquipment.assetId}</Form.Label>
                        <Form.Control required
                                      type="number"
                                      name={'assetId'}
                                      placeholder= {"Enter new Asset ID"}

                                      defaultValue={this.state.newEquipment.assetId}
                                      onChange={this.equipmentChange}
                        />
                    </Form.Group>

                    <Form.Group controlId={"formSerialNumber"} as={Col}>
                        <Form.Label>Serial Number current value: </Form.Label>
                        <Form.Label>{this.state.existingEquipment.serialNumber}</Form.Label>
                        <Form.Control required
                                      type="text"
                                      name={'serialNumber'}
                                      placeholder= {"Enter new serial number"}

                                      defaultValue={this.state.newEquipment.serialNumber}
                                      onChange={this.equipmentChange}
                        />
                    </Form.Group>

                    <Form.Group controlId={"formLocation"} as={Col}>
                        <Form.Label>Current Location : </Form.Label>
                        <Form.Label>{this.state.existingEquipment.location}</Form.Label>
                        <Form.Control required
                                      type="text"
                                      name={'location'}
                                      placeholder= {"Enter new location"}

                                      defaultValue={this.state.newEquipment.location}
                                      onChange={this.equipmentChange}
                        />
                    </Form.Group>

                    <Form.Group controlId={"formBrand"} as={Col}>
                        <Form.Label>Current Brand : </Form.Label>
                        <Form.Label>{this.state.existingEquipment.brand}</Form.Label>
                        <Form.Control required
                                      type="text"
                                      name={'brand'}
                                      placeholder= {"Enter new brand"}

                                      defaultValue={this.state.newEquipment.brand}
                                      onChange={this.equipmentChange}
                        />
                    </Form.Group>

                    <Form.Group controlId={"formModel"} as={Col}>
                        <Form.Label>Model current value : </Form.Label>
                        <Form.Label>{this.state.existingEquipment.model}</Form.Label>
                        <Form.Control required
                                      type="text"
                                      name={'model'}
                                      placeholder= {"Enter new Model"}

                                      defaultValue={this.state.newEquipment.model}
                                      onChange={this.equipmentChange}
                        />
                    </Form.Group>

                    <Form.Group controlId={"formPurchaseDate"} as={Col}>
                        <Form.Label>Purchase date : </Form.Label>
                        <Form.Label>{this.state.existingEquipment.purchaseDate}</Form.Label>
                        <Form.Control required
                                      type="text"
                                      name={'purchaseDate'}
                                      placeholder= {"Enter new Purchase date"}

                                      defaultValue={this.state.newEquipment.purchaseDate}
                                      onChange={this.equipmentChange}
                        />
                    </Form.Group>

                    <Form.Group controlId={"formType"} as={Col}>
                        <Form.Label> Current Equipment Type : </Form.Label>
                        <Form.Label> {this.state.existingEquipment.type} </Form.Label>
                        <Form.Control
                            required as={"select"} name={'type'}
                            defaultValue={this.state.existingEquipment.type}
                            value={this.state.newEquipment.type}
                            onChange={this.equipmentChange}>

                            <option>PC</option>
                            <option>Networking</option>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId={"formWarrantyMonths"} as={Col}>
                        <Form.Label>Current warranty months : </Form.Label>
                        <Form.Label>{this.state.existingEquipment.warrantyMonths}</Form.Label>
                        <Form.Control required
                                      type="text"
                                      name={'warrantyMonths'}
                                      placeholder= {"Enter new warranty months"}

                                      defaultValue={this.state.newEquipment.warrantyMonths}
                                      onChange={this.equipmentChange}
                        />
                    </Form.Group>

                    <Button type={'submit'} className={'btn btn-warning'}> Edit Item</Button>

                </Form>
                </div>
            </div>
        );
    }

}
export default WithAuth(EditEquipment);