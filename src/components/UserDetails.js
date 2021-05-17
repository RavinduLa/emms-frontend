import React from "react";
import {Dropdown} from "react-bootstrap";

class UserDetails extends React.Component{
    render() {
        return(
            <Dropdown>
                <Dropdown.Toggle className='btn btn-block' variant='success' id='username'>
                    Username
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    <Dropdown.Item>Logout</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}

export default UserDetails