import React, {Component} from "react";
import axios from "axios";
import AuthHeader from "./AuthHeader";

const COMMON_URL = "/api/inventory/";

class EquipmentService extends Component{
    constructor(props) {
        super(props);

    }

    getAllEquipment(){
        return axios.get(global.con + COMMON_URL + "equipment" , {headers: AuthHeader()});
    }

    getEquipmentById(id){
        return axios.get(global.con + COMMON_URL +"getEquipmentById/" + id ,{ headers: AuthHeader()});
    }

    checkIdAvailability(id){
        return axios.get(global.con + COMMON_URL + "checkIdAvailability/"+ id, {headers:AuthHeader()});
    }

    addEquipment(equipment){
        return axios.post(global.con +COMMON_URL + "addEquipment",equipment, {headers: AuthHeader()});
    }

    updateEquipment(equipment){
        return axios.post((global.con + COMMON_URL + "updateEquipment",equipment, {headers: AuthHeader()}));
        //need to change to put later
    }

    deleteEquipment(id){
        return axios.delete(global.con + COMMON_URL + "deleteEquipment/"+id, {headers: AuthHeader()});
    }

    getAssetCount(){
        return axios.get(global.con + COMMON_URL + "assetCount",{headers:AuthHeader()});
    }

    getDepartmentAssetCount(did){
        return axios.get(global.con+ COMMON_URL + "getDepartmentAssetCount/", {headers:AuthHeader()});
    }

    getTypeDeptAssetCount(did, type){
        return axios.get(global.con + COMMON_URL + "getTypeDeptAssetCount/"+did+"/"+type, {headers:AuthHeader()});
    }

    getLocationAssetCount(location){
        return axios.get(global.con + COMMON_URL + "getLocationAssetCount/" + location, {headers:AuthHeader()});
    }

    getSupplierAssetCount(){
        return axios.get(global.con + COMMON_URL + "getSupplierAssetCount", {headers:AuthHeader()});
    }

    getUnderWarrantyAssetCont(){
        return axios.get(global.con + COMMON_URL + "underWarrantyCount", {headers:AuthHeader()});
    }

    getNoWarrantyAssetCount(){
        return axios.get(global.con+ COMMON_URL + "noWarrantyCount", {headers:AuthHeader()});
    }

    getEquipmentForSupplier(id){
        return axios.get(global.con + COMMON_URL + "getEquipmentForSupplier/"+id , {headers:AuthHeader()});
    }

    getEquipmentForLocation(location){
        return axios.get(global.con + COMMON_URL + "getEquipmentForLocation/" + location , {headers:AuthHeader()});
    }

    getEquipmentForDepartment(department){
        return axios.get(global.con + COMMON_URL + "getEquipmentForDepartment/" +department, {headers:AuthHeader()});
    }

    getEquipmentDepartmentCount(department){
        return axios.get( global.con+ COMMON_URL + "equipmentDepartmentCount/"+ department, {headers:AuthHeader()});
    }

    getEquipmentLocationCount(location){
        return axios.get(global.con + COMMON_URL + "equipmentLocationCount/"+ location, {headers:AuthHeader()});
    }

    getEquipmentForLocationAndDepartment(location, department){
        return axios.get(global.con + COMMON_URL + "getEquipmentForLocationAndDepartment" + location + "/" + department,
            {headers:AuthHeader()});
    }

    getEquipmentForAssetId(id){
        return axios.get(global.con + COMMON_URL + "getEquipmentForAssetId/" + id , {headers: AuthHeader()});
    }

    getEquipmentForSerialNumber(number){
        return axios.get(global.con + COMMON_URL + "getEquipmentForSerialNumber/" +number , {headers:AuthHeader()});
    }

    getEquipmentForTimePeriod(start, end){
        return axios.get(global.con + COMMON_URL + "getEquipmentForTimePeriod/" + start + "/" + end,
            {headers:AuthHeader()});
    }

    getUnderWarrantyEquipment(){
        return axios.get(global.con + COMMON_URL + "getUnderWarrantyEquipment", {headers:AuthHeader()});
    }

    getNoWarrantyEquipment(){
        return axios.get(global.con + COMMON_URL + "getNoWarrantyEquipment" , {headers:AuthHeader()});
    }

}

export default new EquipmentService();