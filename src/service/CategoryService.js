import React,{Component} from "react";
import axios from "axios";

import AuthHeader from "./AuthHeader";

import connection from "./connection.json";

const BACKEND_BASE_URL = "http://" + connection.ipAddress + ":" + connection.port;

const COMMON_URL = "/api/category/";
//const BACKEND_BASE_URL = "http://localhost:8080";

class CategoryService extends Component{
    constructor(props) {
        super(props);

    }

    getAllCategories(){
        return axios.get(BACKEND_BASE_URL  + COMMON_URL + "allCategories",{headers:AuthHeader()});
    }

    getCategoryById(id){
        return axios.get(BACKEND_BASE_URL  +COMMON_URL+ "getCatById/"+id ,{headers:AuthHeader()});
    }

    addCategory(category){
        return axios.post(BACKEND_BASE_URL  +COMMON_URL+"addCategory",category,{headers:AuthHeader()});
    }

    deleteCategory(id){
        return axios.delete(BACKEND_BASE_URL  + COMMON_URL +"deleteCategoryById/"+id,{headers:AuthHeader()});
    }

    getAllCategoryBrandCombinations(){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "allCategoryBrandCombinations",{headers :AuthHeader()});
    }

    addBrandToCategory(categoryBrand){
        return axios.post(BACKEND_BASE_URL + COMMON_URL+ "addBrandToCategory",categoryBrand, {headers: AuthHeader()});
    }

    deleteBrandCategory(id){
        return axios.delete(BACKEND_BASE_URL + COMMON_URL + "deleteBrandCategoryById/" + id, {headers:AuthHeader()});
    }

    getBrandsForCategory(category){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getBrandsForCategory/" + category, {headers: AuthHeader()});
    }

    isCategoryAvailable (name){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "isCategoryAvailable/"+ name, { headers: AuthHeader()});
    }


}
export default new CategoryService();