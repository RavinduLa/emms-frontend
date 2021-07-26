import React from "react";
import {Link, Redirect} from "react-router-dom";
import {Button, Card, Col, Row,Jumbotron} from "react-bootstrap";
import WithAuth from "../service/WithAuth";
import UserService from "../service/UserService";
class Admin extends React.Component{

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

        this.state.currentUser.roles.map((e) => {
            console.log("Role : ",e);
        });



    }

    initialState={
        permission:'notPermitted',
        currentUser:''
    }

    componentDidMount() {
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

                <div style={padding}>
                    <Jumbotron>
                        <Row>
                            <Col>
                                <Link className={'btn btn-primary btn-block'} to={'/equipmentConfiguration'}>Equipment Configurations</Link> <br/>
                            </Col>
                            <Col>
                                <Link className={'btn btn-secondary btn-block'} to={'/supplierList'}>Suppliers</Link>  <br/>
                            </Col>
                            <Col>
                                <Link  className={'btn btn-warning btn-block'}to={"/departments"} >Departments</Link>
                            </Col>
                            <Col>
                                <Link  className={'btn btn-warning btn-block'}to={"/user"} >Internal Users</Link>
                            </Col>
                        </Row>



                    </Jumbotron>
                </div>






                {/*<Link to={'/addEquipmentCategory'}>Add Categories</Link> <br/>
                <Link to={'/addBrandsToCategories'}>Add Brands to Categories</Link>  <br/>
                <Link to={'/viewBrandForCategories'}>View Brands of Categories</Link>  <br/>
                <Link to={'/brands'}>Brands</Link>  <br/>
                <Link to={'/brandsFull'}>Brands Full</Link>  <br/>
                <Link to={'/addModels'}>Add Models</Link>  <br/>
                <Link to={'/modelList'}>Model list</Link>  <br/>
                <Link to={'/ipSettings'}>IP Settings</Link>  <br/>*/}

            </div>
        );
    }
}
export default WithAuth(Admin);