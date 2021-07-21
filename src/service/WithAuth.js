import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import UserService from "./UserService";

const WithAuth = (Component) => {
    const AuthRoute = () => {
        const isAuth = !!UserService.getCurrentUser();
        if(isAuth){
            return <Component />;
        }
        else{
            return <Redirect to={'/login'}/>
        }
    }
    return AuthRoute;
}

export default WithAuth;