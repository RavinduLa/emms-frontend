import React, {Component} from "react";
import axios from "axios";
import AuthHeader from "./AuthHeader";

const  COMMON_URL = "/api/inventory/";

class  ModelService extends Component{
    constructor(props) {
        super(props);

    }

    getAllModels(){
        return axios.get(global.con + COMMON_URL + "allModels", {headers:AuthHeader()});
    }

    addModel(model){
        return axios.post(global.con + COMMON_URL + "addModel", model, {headers:AuthHeader()});
    }

    getModelById(id){
        return axios.get(global.con + COMMON_URL + "getModelById/"+ id, {headers:AuthHeader()});
    }

    deleteModel(id){
        return axios.delete(global.con + COMMON_URL + "deleteModelById/" + id , {headers: AuthHeader()});
    }

    isModelAvailable(model){
        return axios.get(global.con + COMMON_URL + "isModelAvailable/" + model , {headers:AuthHeader()});
    }

    getModelsForBrand(brand){
        return axios.get(global.con + COMMON_URL + "getModelsForBrand/" + brand, {headers:AuthHeader()});
    }

}

export default new ModelService();