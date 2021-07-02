import React,{Component} from "react";
import axios from "axios";

import AuthHeader from "./AuthHeader";

const COMMON_URL = "/api/inventory/"

class CategoryService extends Component{
    constructor(props) {
        super(props);

    }

    getAllCategories(){
        return axios.get(global.con + COMMON_URL + "allCategories",{headers:AuthHeader()});
    }

    getCategoryById(id){
        return axios.get(global.con +COMMON_URL+ "getCatById/"+id ,{headers:AuthHeader()});
    }

    addCategory(category){
        return axios.post(global.con+COMMON_URL+"addCategory",category,{headers:AuthHeader()});
    }

    deleteCategory(id){
        return axios.delete(global.con + COMMON_URL +"deleteCategoryById/"+id,{headers:AuthHeader()});
    }

    getAllCategoryBrandCombinations(){
        return axios.get(global.con + COMMON_URL + "allCategoryBrandCombinations",{headers :AuthHeader()});
    }

    addBrandToCategory(categoryBrand){
        return axios.post(global.con + COMMON_URL+ "addBrandToCategory",categoryBrand, {headers: AuthHeader()});
    }

    deleteBrandCategory(id){
        return axios.delete(global.con + COMMON_URL + "deleteBrandCategoryById/" + id, {headers:AuthHeader()});
    }

    getBrandsForCategory(category){
        return axios.get(global.con + COMMON_URL + "getBrandsForCategory/" + category, {headers: AuthHeader()});
    }

    isCategoryAvailable (name){
        return axios.get(global.con + COMMON_URL + "isCategoryAvailable/"+ name, { headers: AuthHeader()});
    }


}
export default new CategoryService();