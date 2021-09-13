import React, {Component} from "react";
import axios from "axios";
import AuthHeader from "./AuthHeader";

import connection from "./connection.json";

const BACKEND_BASE_URL = "http://" + connection.ipAddress + ":" + connection.port;

const COMMON_URL = "/api/supplier/";
//const BACKEND_BASE_URL = "http://localhost:8080";

class SupplierService extends Component{
    constructor(props) {
        super(props);

    }

    getAllSuppliers (){
        return axios.get(BACKEND_BASE_URL +COMMON_URL+"allSuppliers",{headers:AuthHeader()});
    }

    addSupplier(supplier){
        return axios.post(BACKEND_BASE_URL + COMMON_URL + "addSupplier",supplier,{headers:AuthHeader()});
    }

    getSupplierById(id){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getSupplierById/"+ id , {headers:AuthHeader()});
    }

    isSupplierAvailable(name){
        return axios.get(BACKEND_BASE_URL +COMMON_URL + "isSupplierAvailable/" +name , {headers:AuthHeader()});
    }

    updateSupplier(id, supplier){
        return axios.put(BACKEND_BASE_URL + COMMON_URL+ "editSupplier/" + id,supplier,{headers: AuthHeader()});
    }

    deleteSupplierById(id){
        return axios.delete(BACKEND_BASE_URL + COMMON_URL + "deleteSupplierById/" + id ,{ headers:AuthHeader()});
    }

    getSupplierNameForId(id){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getSupplierNameForId/" + id, {headers:AuthHeader()});
    }



}

export default new SupplierService();