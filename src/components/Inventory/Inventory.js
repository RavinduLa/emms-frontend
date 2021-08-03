import React from "react";
import InventoryList from "./InventoryList";
import {Button, Col, Container, Row} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";

class Inventory extends React.Component{

    constructor(props) {
        super(props);
        this.state  = this.initialState;

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;

        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }
        else {
            this.state.currentUser.roles.map((e) => {
                if (e == 'LEADER'){
                    this.state.permission = 'permitted';
                }
                else if(e== 'VIEWER'){
                    this.state.permission = 'permitted';
                }
                else {
                    this.state.permission = 'notPermitted';
                }
                console.log("Role : ",e);
            });
        }

        console.log("Permission : ", this.state.permission);

    }

    initialState = {
        permission:'notPermitted',
        currentUser:''
    }


    render() {

        const padding={
            padding:'5px'
        }
            return(
               <Container fluid>

                   {
                       this.state.permission === 'notPermitted'?
                           <Redirect to={'/no-permission'} />:
                           <div></div>
                   }

                   <Row style={padding}>
                       <Col xs={10}>
                           <h5>Inventory List</h5>
                       </Col>
                       <Col xs={2}>
                           <Link to={"addInventory"}> Add Inventory  </Link>
                       </Col>
                   </Row>

                   <Row style={padding}>
                       <InventoryList />
                   </Row>

               </Container>

                /*<InventoryList />*/

        );
    }

}

export default WithAuth(Inventory);