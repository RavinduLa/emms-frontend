import React,{Component} from "react";
import axios from "axios";
import AuthHeader from "./AuthHeader";

const COMMON_URL = "/api/department/";
const BACKEND_BASE_URL = "http://localhost:8080";

class DepartmentService extends Component{
    constructor(props) {
        super(props);

    }

    getAllDepartments(){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "allDepartments" ,{headers:AuthHeader()});
    }

    addDepartment(department){
        return axios.post(BACKEND_BASE_URL  + COMMON_URL + "addDepartment", department , {headers:AuthHeader()});
    }

    getIdAvailability(did){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getIdAvailability/" + did , {headers:AuthHeader()});
    }

    deleteDepartment(did){
        return axios.delete(BACKEND_BASE_URL + COMMON_URL + "deleteDepartment/" + did , {headers: AuthHeader()});
    }

    getDepartmentNameById(did){
        return axios.get(BACKEND_BASE_URL + COMMON_URL + "getDepartmentNameById/" + did, {headers: AuthHeader()});
    }

}

export default new DepartmentService();