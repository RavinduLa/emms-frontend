import React from "react";
import {Col, Container, Image, Row} from "react-bootstrap";
import UserDetails from "./UserDetails";
import image from "./images/Ceylon_Petroleum_Corporation_logo.png";
import {Link} from "react-router-dom";

class Header extends React.Component{

    render() {
        const padding ={
            padding:'20px'
        }
        return(
            <Container fluid>
                <Row  style={padding}>
                    <Col xs={1} >
                        <Link to={"/"}>
                            <Image src={image} roundedCircle fluid/>
                        </Link>

                    </Col>

                    <Col xs={9}>

                    </Col>

                    <Col xs={2}>
                        <UserDetails />
                    </Col>
                </Row>

            </Container>
        );
    }

}

export default Header;