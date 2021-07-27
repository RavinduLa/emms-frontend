import React from "react";
import UserService from "../../service/UserService";
import {Button, Form} from "react-bootstrap";
import Toast1 from "../Toasts/Toast1";

import WithAuth from "../../service/WithAuth";

class ChangePassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.showOldPwWarning = false;
        this.state.showPwChanged = false;

        this.onChange = this.onChange.bind(this);
        this.toggleShowOldPassword = this.toggleShowOldPassword.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.submitPassword = this.submitPassword.bind(this);
        this.checkOldPassword = this.checkOldPassword.bind(this);

    }

    initialState={
        user:'noUser',
        password:'',
        oldPassword:'',
        oldPasswordStatus:''
    }

    componentDidMount = async () => {
        const currentUser = UserService.getCurrentUser();

        if(currentUser){
            await UserService.getUserProfile(currentUser.username)
                .then(response => response.data)
                .then((data) => {
                    this.setState({user:data});
                }).catch(error => {
                    console.log("Error in connecting : ",error);
                })
        }
    }

    onChange = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    toggleShowPassword = () => {
        let x = document.getElementById("passwordId");
        if (x.type === 'password'){
            x.type = 'text';
        }else{
            x.type = 'password';
        }
    }

    toggleShowOldPassword = () =>{
        let x = document.getElementById("oldPasswordId");
        if (x.type === 'password'){
            x.type = 'text';
        }else{
            x.type = 'password';
        }
    }

    submitPassword= async (event)=>{
        event.preventDefault();

        await this.checkOldPassword();

        if(this.state.oldPasswordStatus == 'correct'){
            //submit the new password
            let changeRequest ={
                id:this.state.user.id,
                newPassword: this.state.password
            }
            UserService.individualChangePassword(changeRequest)
                .then(response => response.data)
                .then((data) => {
                    if(data != null){
                        console.log("Password Changed successfully");
                        this.setState({"showPwChanged":true});
                        setTimeout(() => this.setState({"showPwChanged" : false}),3000);
                    }
                    else {
                        alert("Error in changing the password");
                    }
                }).catch(error => {
                    console.log("Error in connecting :  ", error);
            })
        }
        else {
            console.log("Old password is incorrect. Cannot change password");
        }
    }

    checkOldPassword=() =>{
        let OldPasswordCheckRequest = {
            username:this.state.user.username,
            oldPassword:this.state.oldPassword
        }
        UserService.checkOldPassword(OldPasswordCheckRequest)
            .then(response =>{
                if(response.data == true){
                    console.log("Old password is correct");
                    this.setState({oldPasswordStatus:'correct'});
                    return true;
                }
                else {
                    console.log("Old password is incorrect.");
                    this.setState({"showOldPwWarning":true});
                    setTimeout(() => this.setState({"showOldPwWarning" : false}),3000);
                    return  false;
                }
            }).catch(error => {
                console.log("Error connecting",error);
        })
    }

    render() {
        return (
            <div className={'container'}>

                <div style={{"display":this.state.showOldPwWarning ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.showOldPwWarning,
                            message:"Old Password is incorrect",
                            type: 'danger'}}/>
                </div>

                <div style={{"display":this.state.showPwChanged ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.showPwChanged,
                            message:"Password Changed Successfully",
                            type: 'success'}}/>
                </div>

                <h1>Change Password</h1>
                Username : {this.state.user.username}

                <Form onSubmit={this.submitPassword}>
                    <Form.Group>
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control
                            type={'password'}
                            name={'oldPassword'}
                            id={'oldPasswordId'}
                            required
                            onChange={this.onChange}

                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Check type={'checkbox'} label={'Show Old Password'} onClick={this.toggleShowOldPassword} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>New Password</Form.Label>
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
                        <Form.Check type={'checkbox'} label={'Show New Password'} onClick={this.toggleShowPassword} />
                    </Form.Group>

                    <Button type={'submit'} className={'btn btn-primary'}>Change Password</Button>
                </Form>
            </div>
        );
    }

}
export default WithAuth(ChangePassword);