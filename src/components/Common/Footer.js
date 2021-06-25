import React from "react";
import {Col, Container, Navbar} from "react-bootstrap";

class Footer extends React.Component{
    render() {
        return(
            <Navbar  bg='secondary'>
                <Container>
                    <Col className='text-center'>
                        <div>EMMS -IT</div>

                    </Col>
                </Container>
            </Navbar>
        );
    }
}
export default Footer