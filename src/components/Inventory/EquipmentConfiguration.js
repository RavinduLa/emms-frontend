import React from "react";
import EquipmentCategories from "./EquipmentCategories";
import {Link} from "react-router-dom";
import {Button, Card, Col, Row,Jumbotron} from "react-bootstrap";

class EquipmentConfiguration extends React.Component{

    render() {
        const padding={
            padding:'20px'
        }
        return (
            <div>
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

export default EquipmentConfiguration