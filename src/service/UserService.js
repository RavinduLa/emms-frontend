import React from "react";
import axios from "axios";
import AuthHeader from "./AuthHeader";

import connection from "./connection.json";

const BACKEND_BASE_URL = "http://" + connection.ipAddress + ":" + connection.port;

//const BACKEND_BASE_URL = "http://localhost:8080";

class UserService extends React.Component{

    constructor(props) {
        super(props);

    }

    //login function for user
    login(username, password){

        console.log("Running login");
        console.log("Username : "+username);
        console.log("Password : "+password);
        console.log("Connection url : "+global.con);

        const requestBody ={
            username,
            password
        }
        return axios.post(BACKEND_BASE_URL+"/authenticate",{username,password})
            .then(response => {
                console.log("Jwt : "+response.data.jwt);
                if (response.data.jwt){
                    sessionStorage.setItem("user",JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    //method to logout the current user
    logout(){
        console.log("Logging out user")
        sessionStorage.removeItem("user");
    }

    //returns the current user
    getCurrentUser(){
        return JSON.parse(sessionStorage.getItem("user"));
    }

    //register user -- only admin
    register(user){
        return axios.post(BACKEND_BASE_URL+ "/api/user/register",user,{headers: AuthHeader ()});
    }

    getAllUsers(){
        return axios.get(BACKEND_BASE_URL + "/api/user/get-all-users",{headers: AuthHeader()});
    }

    getUserById(id){
        return axios.get(BACKEND_BASE_URL + "/api/user/get-user/"+id,{headers: AuthHeader()});
    }

    updateUserRoles(roleUpdateRequest){
        return axios.put(BACKEND_BASE_URL + "/api/user/updateUserByUsername",roleUpdateRequest,{headers: AuthHeader()});
    }

    deleteUserById(id){
        return axios.delete(BACKEND_BASE_URL + "/api/user/deleteUser/" + id,{headers: AuthHeader()});
    }

    enableUser(id){
        return axios.put(BACKEND_BASE_URL + "/api/user/enable/" +id, {},{headers:AuthHeader()});
    }

    disableUser(id){
        return axios.put(BACKEND_BASE_URL + "/api/user/disable/" +id, {}, {headers: AuthHeader()} );
    }

    resetPassword(resetRequest){
        return axios.put(BACKEND_BASE_URL + "/api/user/resetPassword",resetRequest,{headers:AuthHeader()});
    }

    getUserProfile(username){
        return axios.get(BACKEND_BASE_URL + "/api/individualUser/getUser/"+username, {headers:AuthHeader()});
    }

    isUsernameAvailable(username){
        return axios.get(BACKEND_BASE_URL + "/api/user/isUsernameAvailable/" + username, {headers: AuthHeader()});
    }

    checkOldPassword(passwordCheckRequest){
        return axios.post(BACKEND_BASE_URL + "/api/individualUser/checkOldPassword",passwordCheckRequest,
            {headers:AuthHeader()});
    }

    individualChangePassword(resetRequest){
        return axios.put(BACKEND_BASE_URL + "/api/individualUser/changePassword",resetRequest, {headers: AuthHeader()});
    }

}
export default new UserService();