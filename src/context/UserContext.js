import React from "react";

//user context
const UserContext = React.createContext({});

export class UserContextProvider extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.setUsername = this.setUsername.bind(this);
        this.logoutContext = this.logoutContext.bind(this);

    }

    initialState={
        username:'NotLoggedIn',
        setUsername:this.setUsername.bind(this)
    }

    setUsername(username){
        this.setState({username:username});
    }

    logoutContext(){
        sessionStorage.clear();
        this.setState({username:'NotLoggedIn'});
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }

}
export default UserContext;