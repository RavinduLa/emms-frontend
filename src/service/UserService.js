import React from "react";
import axios from "axios";

const BACKEND_URL = global.con ;

class UserService extends React.Component{

    constructor(props) {
        super(props);

    }

    //login function for user
    login(username, password){
        const requestBody ={
            username:username,
            password:password
        }
        return axios.post(BACKEND_URL+"/authenticate",requestBody)
            .then(response => {
                if (response.data.jwt){
                    sessionStorage.setItem("user",JSON.stringify(response.data));
                }
                return response.data;
            });
    }

}