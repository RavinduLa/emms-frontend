import React, {Component} from "react";
import axios from "axios";

import AuthHeader from "./AuthHeader";

//const BACKEND_COMMON_URL = global.con+"/api/inventory/";
const COMMON_URL = "/api/inventory/";
const BACKEND_BASE_URL = "http://localhost:8080";

class BrandService extends Component{
    constructor(props) {
        super(props);

    }

    addBrand(brand){
        return axios.post(BACKEND_BASE_URL +"/api/inventory/"+"addBrand",brand,{headers:AuthHeader()} );
    }

    getAllBrands(){
        return axios.get(BACKEND_BASE_URL +"/api/inventory/"+"allBrands", {headers:AuthHeader()} );
    }

    isBrandAvailable(name){
        return axios.get(BACKEND_BASE_URL  + COMMON_URL + "isBrandAvailable/"+ name , {headers:AuthHeader()});
    }

    getBrandById(id){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getBrandById/"+ id, {headers: AuthHeader()});
    }

    deleteBrand(id){
        return axios.delete(BACKEND_BASE_URL + COMMON_URL +"deleteBrand/"+ id,{headers: AuthHeader()});
    }



}

export default new BrandService();