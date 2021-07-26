import React from "react";
import EquipmentCategories from "./EquipmentCategories";
import {Link, Redirect} from "react-router-dom";
import {Button, Card, Col, Row,Jumbotron} from "react-bootstrap";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";

class EquipmentConfiguration extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }

        console.log("Permission : ", this.state.permission);
    }


    initialState={
        permission:'notPermitted',
        currentUser:''
    }

    render() {
        const padding={
            padding:'20px'
        }
        return (
            <div>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }
               {/* <EquipmentCategories></EquipmentCategories>*/}
               <div style={padding}>

                   <Jumbotron>
                       <center>
                           <Row>
                               <Col>
                                   <Link className={'btn btn-primary btn-block'} to={'/equipmentCategoryList'}>Equipment Categories</Link>  <br/>
                                   <Link className={'btn btn-secondary btn-block'} to={'/brandList'}>Equipment Brands</Link> <br/>
                               </Col>
                               <Col>
                                   <Link className={'btn btn-warning btn-block'} to={'/modelList'}>Equipment Models</Link> <br/>
                                   <Link className={'btn btn-success btn-block'} to={'/viewBrandForCategories'}>Category and Brands</Link> <br/>
                               </Col>
                           </Row>
                       <Col>


                       </Col>
                       </center>
                   </Jumbotron>

               </div>

            </div>
        );
    }
}

export default WithAuth(EquipmentConfiguration);