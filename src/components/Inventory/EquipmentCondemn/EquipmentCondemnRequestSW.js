import React from "react";
import WithAuth from "../../../service/WithAuth";
import UserService from "../../../service/UserService";
import {Redirect} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import EquipmentService from "../../../service/EquipmentService";

class EquipmentCondemnRequestSW extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.permission = 'notPermitted';
        this.state.currentUser = '';
        this.state.loggedIn = 'no';

        this.onChange = this.onChange.bind(this);
        this.submitRequest = this.submitRequest.bind(this);

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;

        if (this.state.currentUser != null){
            this.state.loggedIn = 'yes';
            if (this.state.currentUser.roles == 'ADMIN'){
                console.log("User role is admin");
                this.state.permission = 'permitted';
            }
            else{
                this.state.currentUser.roles.map((e) => {
                    if (e == 'LEADER'){
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
        else {
            this.state.loggedIn = 'no';
        }

    }

    initialState={
        assetId:'',
        reason:'',
        markedForCondemn : false,

    }

    componentDidMount = async ()=> {
        await this.setState({assetId:this.props.match.params.id});
        console.log("Asset id in state : ", this.state.assetId);
        if (this.state.permission ==  'permitted'){
            EquipmentService.isEquipmentCondemnPending(this.state.assetId)
                .then(response => response.data)
                .then((data) => {
                    if (data == true){
                        this.setState({markedForCondemn:true});
                    }
                    else {
                        this.setState({markedForCondemn:false});
                    }
                }).catch(error => {
                    console.log("Error in checking whether the equipment is already condemn pending",error);
            })
        }
    }

    onChange =(event) => {
        this.setState({[event.target.name]: event.target.value} );
    }
    submitRequest=(event) => {
        event.preventDefault();

        const condemnRequest={
            assetId: this.state.assetId,
            reason : this.state.reason
        }

        EquipmentService.requestEquipmentCondemn(condemnRequest)
            .then(response => response.data)
            .then((data =>{
                if (data != null){
                    alert("Equipment marked for condemn");
                    this.componentDidMount();
                }
            })).catch(error =>{
                console.log("Error in condemning : ", error);
        })

    }

    render() {
        return (
            <div className={'container'}>

                {
                    this.state.loggedIn === 'no'?
                        <Redirect to={'/login'} />:
                        <div></div>
                }
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <h2> Asset id: {this.state.assetId} </h2>
                {
                    this.state.markedForCondemn === true?
                        <h3>Equipment Already Marked for condemn </h3>:
                        <div></div>
                }

                <Form onSubmit={this.submitRequest}>
                    <Form.Group>
                        <Form.Label>Reason</Form.Label>
                        <Form.Control
                        required
                        type={'text'}
                        placeholder={'Enter the reason for condemn'}
                        value={this.state.reason}
                        name={'reason'}
                        onChange={this.onChange}
                        />
                    </Form.Group>

                    {
                        this.state.markedForCondemn === true?
                            <Button disabled={true}>Cannot Request Condemn</Button>:
                            <Button type={'submit'} className={'btn btn-danger'}>Request Condemn</Button>
                    }

                </Form>


            </div>
        );
    }

}

export  default EquipmentCondemnRequestSW;