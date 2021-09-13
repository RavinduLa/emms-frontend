import React, {Component} from "react";
import axios from "axios";
import AuthHeader from "./AuthHeader";

import connection from "./connection.json";

const  COMMON_URL = "/api/model/";
//const BACKEND_BASE_URL = "http://localhost:8080";
const BACKEND_BASE_URL = "http://" + connection.ipAddress + ":" + connection.port;

class  ModelService extends Component{
    constructor(props) {
        super(props);

    }

    getAllModels(){
        return axios.get(BACKEND_BASE_URL+ COMMON_URL + "allModels", {headers:AuthHeader()});
    }

    addModel(model){
        return axios.post(BACKEND_BASE_URL + COMMON_URL + "addModel", model, {headers:AuthHeader()});
    }

    getModelById(id){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getModelById/"+ id, {headers:AuthHeader()});
    }

    deleteModel(id){
        return axios.delete(BACKEND_BASE_URL + COMMON_URL + "deleteModelById/" + id , {headers: AuthHeader()});
    }

    isModelAvailable(model){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "isModelAvailable/" + model , {headers:AuthHeader()});
    }

    getModelsForBrand(brand){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getModelsForBrand/" + brand, {headers:AuthHeader()});
    }

}

export default new ModelService();