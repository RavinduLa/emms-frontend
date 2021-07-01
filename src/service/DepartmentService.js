import React,{Component} from "react";
import axios from "axios";
import AuthHeader from "./AuthHeader";

const COMMON_URL = "/api/department/";

class DepartmentService extends Component{
    constructor(props) {
        super(props);

    }

    getAllDepartments(){
        return axios.get(global.con+ COMMON_URL + "allDepartments" ,{headers:AuthHeader()});
    }

    addDepartment(department){
        return axios.post(global.con + COMMON_URL + "addDepartment", department , {headers:AuthHeader()});
    }

    getIdAvailability(did){
        return axios.get(global.con + COMMON_URL + "getIdAvailability/" + did , {headers:AuthHeader()});
    }

    deleteDepartment(did){
        return axios.delete(global.con + COMMON_URL + "deleteDepartment/" + did , {headers: AuthHeader()});
    }

    getDepartmentNameById(did){
        return axios.get(global.con + COMMON_URL + "getDepartmentNameById/" + did, {headers: AuthHeader()});
    }

}

export default new DepartmentService();