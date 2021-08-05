import React from "react";
import {Button, Dropdown} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import UserService from "../service/UserService";

class UserDetails extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;



    }

    initialState={
        user:'noUser'
    }

    componentDidMount() {
        const currentUser = UserService.getCurrentUser();

        if(currentUser){
            this.setState({user:currentUser});
        }
    }

    logout =()=> {
        UserService.logout();
        window.location.reload();
    }
    render() {
        return(
            <Dropdown>

                {
                    this.state.user.username === undefined?
                        <Dropdown.Toggle className='btn btn-block' variant='success' id='username'>
                            Logged Out

                        </Dropdown.Toggle >:
                        <Dropdown.Toggle className='btn btn-block' variant='success' id='username'>
                            {this.state.user.username}
                        </Dropdown.Toggle>
                }


                {
                    this.state.user.username === undefined?
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link to={'/login'} className={'dropdown-item'}>Login</Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>:
                        <Dropdown.Menu>

                            <Dropdown.Item>
                                <Link to={'/individualUser/profile' } className={'dropdown-item'}>Profile</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                {/*<a href={"/login"} className={"dropdown-item"} onClick={this.logout}>Logout</a>*/}
                                <Link to={'/login'} className={"dropdown-item"} onClick={this.logout}>Logout</Link>
                            </Dropdown.Item>

                        </Dropdown.Menu>
                }

            </Dropdown>
        );
    }
}

export default UserDetails