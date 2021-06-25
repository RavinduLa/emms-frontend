import React from "react";
import AddBrand from "./AddBrand";
import BrandList from "./BrandList";

class BrandsFull extends React.Component{

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>

                <AddBrand></AddBrand>
                <BrandList></BrandList>

            </div>
        );
    }

}

export default BrandsFull