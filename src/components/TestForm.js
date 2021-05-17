import React from "react";
import {Form} from "react-bootstrap";
import axios from "axios";

class TestForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state={
            deptList: [],
        }

    }

    initialState ={
        deptList:[]
    }

    componentDidMount() {

        axios.get("http://localhost:8080/api/allDepartments")
            .then( response => response.data)
            .then((data) => {
                this.setState({deptList: data})
            });
        //console.log("list:" + this.state.deptList.map(e))

    }

    onDropdownSelected(e) {
        console.log("THE VAL", e.target.value);
        //here you will see the current selected value of the select input
    }


    createSelectItems() {
        let items = [];
        for (let i = 0; i <= this.state.deptList.length; i++) {
            items.push(<option key={i} value={i}>{this.state.deptList[i].did}</option>);
            //here I will be creating my options dynamically based on
            //what props are currently passed to the parent component
        }
        return items;
    }

    render() {
        return(
            <div>


                <Form>
                    <Form.Group>
                        <Form.Label>Dept</Form.Label>
                        <Form.Control
                            required
                            as={"select"}
                            name={"dept"}
                            defaultValue={"IT"}
                        onChange={this.onDropdownSelected}>

                            {
                                this.state.deptList.length === 0?
                                    <option>No depts</option>:
                                this.state.deptList.map( (e) =>(
                                    <option value={e.departmentName}>{e.departmentName}</option>
                                ))
                            }


                        </Form.Control>
                    </Form.Group>
                </Form>

            </div>
        )
    }
}
export default TestForm;