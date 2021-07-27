import React from "react";
import UserService from "../../service/UserService";
import {Button, Card, Form, Table} from "react-bootstrap";
import {F} from "react-select/dist/index-4bd03571.esm";
import Select from "react-select";
import {Redirect} from "react-router-dom";
import WithAuth from "../../service/WithAuth";

class EditUser extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.submitUser = this.submitUser.bind(this);
        this.onSelectRoles = this.onSelectRoles.bind(this);

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
        user:'',
        enabled:false,
        roles:[],
        options:[
            {value:2, label:'Leader'},
            {value:3, label:'Technician'},
            {value:4, label:'Viewer'},
            {value:5, label:'Editor'}
        ],
        updatePermitted:'yes',

        permission:'notPermitted',
        currentUser:'',
        loggedIn:'no'
    }

    componentDidMount = async () => {

        //set the user to the state
        await UserService.getUserById(this.props.match.params.id)
            .then(response => response.data)
            .then((data => {
                this.setState({user:data});
                if (data.username == 'admin'){
                    this.setState({updatePermitted:'no'});
                }

            })).catch(error => {
                console.log("Error in connecting : ",error);
        })

        /*UserService.getUserById(this.props.match.params.id)
            .then((data) => {
                console.log("Response data",data);
            }).catch(error => {
                console.log("Error in connecting :",error);
        })*/
    }

    submitUser = (event) => {
        event.preventDefault();
        let modeledRoles=[];

        this.state.roles.map((e) => {
            let role = { id: e}
            modeledRoles.push(role);
        })
        console.log(modeledRoles);

        let roleUpdateRequest ={
            username:this.state.user.username,
            roles:modeledRoles
        }

        UserService.updateUserRoles(roleUpdateRequest)
            .then(response => response.data)
            .then((data) => {
                if (data!= null){
                    alert("User Roles Updated Successfully");
                }
                else{
                    alert("Error in updating user roles");
                }
            }).catch(error => {
                console.log("Error in connecting : ",error);
        })
    }

    onSelectRoles = (event) => {
        this.setState({roles:event ? event.map(item => item.value) : []  });
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

                <div className={'container'}>

                    Username : {this.state.user.username}



                    <Form onSubmit={this.submitUser}>

                        <Select
                            options = {this.state.options}
                            className={'basic-multi-select'}
                            isMulti={true}
                            onChange={this.onSelectRoles}
                        />

                        {
                            this.state.updatePermitted === 'no'?
                                <h3>Updating Admin is not allowed</h3>  :
                                <Button
                                    type={'submit'}
                                    className={'btn btn-secondary'}
                                >
                                    Save
                                </Button>
                        }


                    </Form>

                </div>
            </div>
        );
    }


}

export default EditUser;