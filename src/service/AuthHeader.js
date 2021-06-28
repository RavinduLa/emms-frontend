
//this function can be used to get authentication header to the axios calls.
export default function AuthHeader(){
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user && user.jwt){
        return{Authorization: 'Bearer ' + user.jwt};
    }
    else {
        console.log("Could not find user or user jwt in AuthHeader");
        return {};
    }
}