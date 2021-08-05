import React from "react";
import {Button, Form} from "react-bootstrap";
import UserContext from "../../context/UserContext";
import UserService from "../../service/UserService";
import Toast1 from "../Toasts/Toast1";

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;

        this.onChange = this.onChange.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }
    initialState={
        username:'',
        password:'',
        message:''
    }

    onChange =(event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    submitLogin =(event) => {
        event.preventDefault();

        console.log("Running submit login");

        UserService.login(this.state.username,this.state.password)
            .then(() => {
                console.log("Username and password correct");
                this.props.history.push("/");
                window.location.reload();
            },error => {
                console.log("Username or password incorrect");
                this.setState({"show":true});
                setTimeout(() => this.setState({"show" : false}),3000);
            })
    }

    render() {
        return (

                        <div className={'container'}>

                            <div style={{"display":this.state.show ? "block" :"none" }}>
                                <Toast1
                                    children={{show:this.state.show,
                                        message:"Username Or Password Incorrect",
                                        type: 'danger'}}/>
                            </div>

                            <h1>Login</h1>
                            <Form onSubmit={this.submitLogin}>
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
                                    <Form.Control
                                        type={'password'}
                                        name={'password'}
                                        required
                                        onChange={this.onChange}

                                    />
                                </Form.Group>

                                <Button
                                    className={'btn btn-primary'}
                                    type={'submit'}

                                >
                                    Login
                                </Button>
                            </Form>

                        </div>

        );
    }


}

export default Login;