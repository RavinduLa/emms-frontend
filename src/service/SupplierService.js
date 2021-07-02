import React, {Component} from "react";
import axios from "axios";
import AuthHeader from "./AuthHeader";

const COMMON_URL = "/api/inventory/";

class SupplierService extends Component{
    constructor(props) {
        super(props);

    }

    getAllSuppliers (){
        return axios.get(global.con+COMMON_URL+"allSuppliers",{headers:AuthHeader()});
    }

    addSupplier(supplier){
        return axios.post(global.con + COMMON_URL + "addSupplier",supplier,{headers:AuthHeader()});
    }

    getSupplierById(id){
        return axios.get(global.con + COMMON_URL + "getSupplierById/"+ id , {headers:AuthHeader()});
    }

    isSupplierAvailable(name){
        return axios.get(global.con +COMMON_URL + "isSupplierAvailable/" +name , {headers:AuthHeader()});
    }

    updateSupplier(id, supplier){
        return axios.put(global.con + COMMON_URL+ "editSupplier/" + id,supplier,{headers: AuthHeader()});
    }

    deleteSupplierById(id){
        return axios.delete(global.con + COMMON_URL + "deleteSupplierById/" + id ,{ headers:AuthHeader()});
    }

    getSupplierNameForId(id){
        return axios.get(global.con + COMMON_URL + "getSupplierNameForId/" + id, {headers:AuthHeader()});
    }



}

export default new SupplierService();