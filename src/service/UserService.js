import React from "react";
import axios from "axios";
import AuthHeader from "./AuthHeader";

const BACKEND_URL = global.con ;

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
        return axios.post(global.con+"/authenticate",{username,password})
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
        return axios.post(global.con + "/api/user/register",user,{headers: AuthHeader ()});
    }

    getAllUsers(){
        return axios.get(global.con + "/api/user/get-all-users",{headers: AuthHeader()});
    }

}
export default new UserService();