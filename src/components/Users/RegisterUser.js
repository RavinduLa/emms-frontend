import React from "react";
import Select from "react-select";
import {Button, Form} from "react-bootstrap";
import UserService from "../../service/UserService";
import Toast1 from "../Toasts/Toast1";

class RegisterUser extends React.Component{
    constructor(props) {
        super(props);

        this.state = this.initialState;
        this.state.showUsernameWarning = false;

        this.onChange = this.onChange.bind(this);
        this.onSelectRoles = this.onSelectRoles.bind(this);
        this.submitUser = this.submitUser.bind(this);
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
        this.resetForm = this.resetForm.bind(this);

    }

    initialState= {
        username:'',
        password:'',
        usernameAvailable:'',
        roles:[],
        options:[
            {value:2, label:'Leader'},
            {value:3, label:'Technician'},
            {value:4, label:'Viewer'},
            {value:5, label:'Editor'}
        ]
    }

    componentDidMount() {
    }

    onChange = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    onSelectRoles = (event) => {
        this.setState({roles:event ? event.map(item => item.value) : []  });
    }

    submitUser = async (event) => {
        event.preventDefault();
        await this.checkUsernameAvailability(this.state.username);

        if (this.state.usernameAvailable == 'available'){

            let modeledRoles=[];

            this.state.roles.map((e) => {
                let role = { id: e}
                modeledRoles.push(role);
            })
            console.log(modeledRoles);

            let registrationRequest ={
                username:this.state.username,
                password: this.state.password,
                roles:modeledRoles
            }

            console.log(registrationRequest);

            await UserService.register(registrationRequest)
                .then(response => response.data)
                .then((data) => {
                    if (data != null){
                        alert("User Registered Successfully");
                    }
                    else {
                        alert("Error in registering the user");
                    }
                }).catch(error => {
                    console.log("Error in calling register");
                    console.log("Error code : " + error);
                });

            await this.resetForm();
        }

    }

    checkUsernameAvailability = (username) =>{
        if(this.state.username == null){
            console.log("Username is null");
        }
        else{
            UserService.isUsernameAvailable(username)
                .then(response =>{
                    if(response.data == true){
                        console.log("Username is available");
                        this.setState({usernameAvailable:'available'});

                        return true;
                    }
                    else{
                        console.log("Username is taken.");
                        this.setState({"showUsernameWarning":true});
                        setTimeout(() => this.setState({"showUsernameWarning" : false}),3000)
                        return  false;
                    }
                }).catch(error => {
                    console.log("Error in connecting : ", error);
            })
        }
        return UserService.isUsernameAvailable(username);
    }

    toggleShowPassword = () => {
        let x = document.getElementById("passwordId");
        if (x.type === 'password'){
            x.type = 'text';
        }else{
            x.type = 'password';
        }
    }

    resetForm(){
        this.setState( () => this.initialState)
    }

    render() {
        return (
            <div>

                <div style={{"display":this.state.showUsernameWarning ? "block" :"none" }}>
                    <Toast1
                        children={{
                            show:this.state.showUsernameWarning,
                            message:"Username Already Assigned",
                            type: 'warning',
                        }} />
                </div>
                <h1>Register User</h1>

                <Form onSubmit={this.submitUser}>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type={'text'}
                            name={'username'}
                            required
                            onChange={this.onChange}

                        />
                    </Form.Group>

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

                    <Select
                        options = {this.state.options}
                        className={'basic-multi-select'}
                        isMulti={true}
                        onChange={this.onSelectRoles}
                    />

                    <Button type={'submit'} className={'btn btn-primary'}>Add User</Button>

                </Form>


            </div>
        );
    }

}

export default RegisterUser;