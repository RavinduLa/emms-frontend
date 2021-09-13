import React, {Component} from "react";
import axios from "axios";
import AuthHeader from "./AuthHeader";

import connection from "./connection.json";

//const BACKEND_BASE_URL = "http://localhost:8080";
const BACKEND_BASE_URL = "http://" + connection.ipAddress + ":" + connection.port;
const COMMON_URL = "/api/addInventory/";

class AddInventoryService extends Component{
    constructor(props) {
        super(props);

    }

    getAllDepartments(){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getAllDepartments",{headers: AuthHeader()});
    }

    getAllSuppliers(){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getAllSuppliers", {headers:AuthHeader()});
    }

    getAllCategories(){
        return axios.get(BACKEND_BASE_URL +COMMON_URL + "getAllCategories" , {headers : AuthHeader()});
    }

    getBrandsForCategory(category){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getBrandsForCategory/" +category , {headers: AuthHeader()});
    }

    getModelsForBrand(brand){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getModelsForBrand/" + brand, {headers : AuthHeader()});
    }

    addEquipment(equipment){
        return axios.post(BACKEND_BASE_URL + COMMON_URL + "addEquipment" ,equipment,{headers: AuthHeader()});
    }

    checkIdAvailability(id){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "checkIdAvailability/" + id, {headers: AuthHeader()} );
    }

}

export default new AddInventoryService();