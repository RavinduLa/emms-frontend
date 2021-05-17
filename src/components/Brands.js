import React from "react";
import {Link} from "react-router-dom";

class Brands extends React.Component{

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>

                <Link to={'/addBrand'}>Add brand</Link> <br/>
                <Link to={'/brandList'}>Brand List</Link>

            </div>
        );
    }
}

export default Brands