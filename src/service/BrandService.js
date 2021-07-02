import React, {Component} from "react";
import axios from "axios";

import AuthHeader from "./AuthHeader";

//const BACKEND_COMMON_URL = global.con+"/api/inventory/";
const COMMON_URL = "/api/inventory/";

class BrandService extends Component{
    constructor(props) {
        super(props);

    }

    addBrand(brand){
        return axios.post(global.con+"/api/inventory/"+"addBrand",brand,{headers:AuthHeader()} );
    }

    getAllBrands(){
        return axios.get(global.con+"/api/inventory/"+"allBrands", {headers:AuthHeader()} );
    }

    isBrandAvailable(name){
        return axios.get(global.con + COMMON_URL + "isBrandAvailable/"+ name , {headers:AuthHeader()});
    }

    getBrandById(id){
        return axios.get(global.con + COMMON_URL + "getBrandById/"+ id, {headers: AuthHeader()});
    }

    deleteBrand(id){
        return axios.delete(global.con + COMMON_URL +"deleteBrand/"+ id,{headers: AuthHeader()});
    }



}

export default new BrandService();