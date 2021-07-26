import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

class NoPermissionMessage extends React.Component{

    render() {
        const padding={
            padding:'10px'
        }
        return (
            <div style={padding}>
                <Card className={'bg-transparent'}>
                    <Card.Header className={'bg-danger text-white'}>No Permission</Card.Header>
                    <Card.Body className={'bg-warning'}>
                        <Card.Title>You currently do not have permission to view this resource</Card.Title>
                        <Card.Title>Please login with proper permissions</Card.Title>
                        <Card.Text>If you think this is an error please contact the administrator</Card.Text>

                        <Link to={'/'} className={'btn btn-primary'}>Home</Link>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default NoPermissionMessage;