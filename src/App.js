//import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar';

import React, { useState, useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

//import {Container, Row, Jumbotron, Col} from 'react-bootstrap';
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Inventory from "./components/Inventory";
import Header from "./components/Header";
import AddInventory from "./components/AddInventory";
import SingleEquipment from "./components/SingleEquipment";
import Maintenance from "./components/Maintenance";
import AddJob from "./components/AddJob";
import Dashboard from "./components/Dashboard";
import EditEquipment from "./components/EditEquipment";
import Departments from "./components/Departments";
import AddDepartment from "./components/AddDepartment";
import TestForm from "./components/TestForm";
import Admin from "./components/Admin";
import EquipmentConfiguration from "./components/EquipmentConfiguration";
import EquipmentCategories from "./components/EquipmentCategories";
import EquipmentCategoryList from "./components/EquipmentCategoryList";
import AddEquipmentCategory from "./components/AddEquipmentCategory";
import Brands from "./components/Brands";
import AddBrand from "./components/AddBrand";
import BrandList from "./components/BrandList";
import BrandsFull from "./components/BrandsFull";
import AddModels from "./components/AddModels";
import ModelList from "./components/ModelList";
import AddBrandsToCategories from "./components/AddBrandsToCategories";
import CategoryBrandsList from "./components/CategoryBrandsList";
import Suppliers from "./components/Suppliers";
import AddSupplier from "./components/AddSupplier";
import IpSettings from "./components/IpSettings";

import connectionData from './connection.json'
import SupplierList from "./components/SupplierList";
import InventoryLanding from "./components/InventoryLanding";
import InventoryFilter from "./components/InventoryFilter";
import WarrantyFilter from "./components/WarrantyFilter";
import DepartmentFilter from "./components/DepartmentFilter";
import SupplierFilter from "./components/SupplierFilter";
import LocationFilter from "./components/LocationFilter";
import InventoryFilter2 from "./components/InventoryFilter2";
import WarrantyPresentEquipment from "./components/WarrantyPresentEquipment";
import WarrantyAbsentEquipment from "./components/WarrantyAbsentEquipment";
//import SupplierList from "./components/SupplierList";

function App() {

  const fs = require('fs')
  //const connectionFileName = __dirname + '/connectionConfig.txt'

  global.ipa = 'localhost'

  const   newCon = connectionData;


  const [connection, setConnection] = useState('');


  //useEffect is equivalent to using lifecycle methods in a class based component
  //it is like we are using componentDidMount/Update
  //by passing an array of connections as the second arguement, this only rerenders after connection value is changed.
  //without useEffect, performance issues were encountered.

  useEffect(() => {
    fetch('connection.json').then(response => {
      response.json().then(con => {
        setConnection(con);
      })
    })

    //console.log("Connection IP: " + connection.ipAddress + "Port: "+ connection.port);
  },[connection])

  //this sets the global variable accessed by all other components for the url.
  global.con = "http://"+connection.ipAddress +":"+ connection.port;

  /*fs.readFile(connectionFileName, (err,data) => {
      if(err){
          console.log(err)
      }

      else {
          global.ipa = data.toString();
      }
  })*/

  return (
      <Router >

        <Header />
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={Welcome}/>
          <Route path="/inventory" exact component={Inventory} />
          <Route path="/addInventory" exact component={AddInventory} />
          <Route path="/singleEquipment" exact component={SingleEquipment} />
          <Route path="/maintenance" exact component={Maintenance} />
          <Route path="/addNewJob" exact component={AddJob} />
          <Route path="/dashboard-admin" exact component={Dashboard} />
          <Route path="/updateEquipment" exact component={EditEquipment} />
          <Route path="/departments" exact component={Departments} />
          <Route path="/addDepartment" exact component={AddDepartment} />
          <Route path="/testForm" exact component={TestForm} />
          <Route path="/admin" exact component={Admin} />
          <Route path="/equipmentConfiguration" exact component={EquipmentConfiguration} />
          <Route path="/equipmentCategories" exact component={EquipmentCategories} />
          <Route path="/equipmentCategoryList" exact component={EquipmentCategoryList} />
          <Route path="/brands" exact component={Brands} />
          <Route path="/addBrand" exact component={AddBrand} />
          <Route path="/brandList" exact component={BrandList} />
          <Route path="/brandsFull" exact component={BrandsFull} />
          <Route path="/addModels" exact component={AddModels} />
          <Route path="/modelList" exact component={ModelList} />
          <Route path="/addBrandsToCategories" exact component={AddBrandsToCategories} />
          <Route path="/viewBrandForCategories" exact component={CategoryBrandsList} />
          <Route path="/addEquipmentCategory" exact component={AddEquipmentCategory} />
          <Route path="/suppliers" exact component={Suppliers} />
          <Route path="/addSupplier" exact component={AddSupplier} />
          <Route path="/supplierList" exact component={SupplierList}/>
          <Route path="/inventoryLanding" exact component={InventoryLanding}/>
          <Route path="/inventoryFilter" exact component={InventoryFilter}/>
          <Route path="/warrantyFilter" exact component={WarrantyFilter}/>
          <Route path="/departmentFilter" exact component={DepartmentFilter}/>
          <Route path="/locationFilter" exact component={LocationFilter}/>
          <Route path="/supplierFilter" exact component={SupplierFilter}/>
          <Route path="/inventoryFilter2" exact component={InventoryFilter2}/>
          <Route path="/warrantyPresentEquipment" exact component={WarrantyPresentEquipment}/>
          <Route path="/warrantyAbsentEquipment" exact component={WarrantyAbsentEquipment}/>
          <Route path="/supplierList" exact component={SupplierList}/>

          {/*<Route path="/departmentFilter" exact component={DepartmentFilter}/>*/}
        </Switch>

        {/*<Container>
            <Row>
                <Col>
                    <Switch>
                        <Route path="/" exact component={Welcome} />
                        <Route path="/inventory" exact component={Inventory} />
                    </Switch>
                </Col>
            </Row>
        </Container>*/}

        <Footer />

      </Router>
  );
}

export default App;
