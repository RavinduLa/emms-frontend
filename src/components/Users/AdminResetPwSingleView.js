import React from "react";
import {Button, Form} from "react-bootstrap";
import UserService from "../../service/UserService";
import Toast1 from "../Toasts/Toast1";
import {Redirect} from "react-router-dom";

import WithAuth from "../../service/WithAuth";

class AdminResetPwSingleView extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;

        this.onChange = this.onChange.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.submitPassword = this.submitPassword.bind(this);

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser != null){
            this.state.loggedIn = 'yes';
            if (this.state.currentUser.roles == 'ADMIN'){
                console.log("User role is admin");
                this.state.permission = 'permitted';
            }

            console.log("Permission : ", this.state.permission);
        }
        else {
            this.state.loggedIn = 'no';
        }

    }

    initialState={
        id:'',
        username:'',
        password:'',

        permission:'notPermitted',
        currentUser:'',
        loggedIn:'no'
    }

    componentDidMount() {
        //let {data} = this.props.location;

        this.setState({id:this.props.match.params.id});

        UserService.getUserById(this.props.match.params.id)
            .then(response => response.data)
            .then((data) => {
                this.setState({username:data.username});
            }).catch(error=> {
                console.log("Error in connecting");
        })
        //this.setState({username:data.username});
    }

    onChange = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    submitPassword = (event) => {
        event.preventDefault();
        let resetRequest ={
            id: this.state.id,
            newPassword: this.state.password
        }

        console.log("State : id", this.state.id);
        console.log("State Password : ", this.state.password);

        console.log("Request id : ", resetRequest.id );
        console.log("Request Password : ", resetRequest.password);

        UserService.resetPassword(resetRequest)
            .then(response => response.data)
            .then((data) => {
                if(data != null){
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show" : false}),3000);
                }
                else{
                    alert("Error in resetting the password.")
                }
            }).catch(error => {
                console.log("Error in connecting.",error);
        })

    }

    toggleShowPassword = () => {
        let x = document.getElementById("passwordId");
        if (x.type === 'password'){
            x.type = 'text';
        }else{
            x.type = 'password';
        }
    }

    render() {
        return (
            <div>

                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                {
                    this.state.loggedIn === 'no'?
                        <Redirect to={'/login'} />:
                        <div></div>
                }

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.show,
                            message:"Password Reset Successfully",
                            type: 'success'}}/>
                </div>

                <h2>Reset Password</h2>
                <h3>Username : {this.state.username}</h3>

                <Form onSubmit={this.submitPassword}>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <h6>Must contain numbers, letters, special characters and at least 6 characters</h6>
                        <Form.Control
                            type={'password'}
                            name={'password'}
                            id={'passwordId'}
                            pattern={"(?=.*\\d)(?=.*[a-zA-Z])(?=.*?[~`!@#$%\\^&*()\\-_=+[\\]{};:\x27.,\x22\\\\|/?><]).{6,}"}
                            required
                            onChange={this.onChange}

                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Check type={'checkbox'} label={'Show Password'} onClick={this.toggleShowPassword} />
                    </Form.Group>

                    <Button type={'submit'} className={'btn btn-primary'}>Reset Password</Button>

                </Form>

            </div>
        );
    }

}
export default AdminResetPwSingleView;