import React from "react";
import {Table} from "react-bootstrap";
import WithAuth from "../../service/WithAuth";

class DisplayItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.equipment = this.props

    }

    initialState={
        equipment:''
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Table className={'table-bordered table-striped table-success'}>
                    <tr>
                        <td>Asset Id</td>
                        <td>{this.state.equipment.assetId}</td>
                    </tr>
                    <tr>
                        <td>Serial Number</td>
                        <td>{this.state.equipment.serialNumber}</td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td>{this.state.equipment.location}</td>
                    </tr>
                    <tr>
                        <td>Department</td>
                        <td>{this.state.equipment.department}</td>
                    </tr>
                </Table>
            </div>
        );
    }

}

export default WithAuth(DisplayItem);