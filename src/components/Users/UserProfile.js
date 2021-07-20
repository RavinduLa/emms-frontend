import React from "react";
import UserService from "../../service/UserService";
import {Button, Card} from "react-bootstrap";

class UserProfile extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

    }

    initialState={
        user:'noUser'
    }

    componentDidMount  = async() => {
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
        console.log("User id : ",this.state.user.id)
        console.log("Username : ",this.state.user.username);
        console.log("Roles : ",this.state.user.roles);
    }

    render() {
        return (
            <div className={'container'}>

                <h1>Profile</h1>

                Username : {this.state.user.username}
                <Card>
                    <Card.Header>Username : {this.state.user.username}</Card.Header>
                    {/*<Card.Body>Roles : {this.state.user.roles.map((e) => (e.name + "/"))}</Card.Body>*/}
                    <Card.Body>
                        <Button>Change Password</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

export default UserProfile;