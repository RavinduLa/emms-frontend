import React from "react";
import Toast1 from "../Toasts/Toast1";
import {Button, Table} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import {confirmAlert} from "react-confirm-alert";
import CategoryService from "../../service/CategoryService";

class EquipmentCategoryList extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show=  false
        this.state={
            categories: []
        }
    }

    initialState = {

        categories : []
    }

    componentDidMount() {
        const URL_LOCALHOST = "http://localhost:8080/api/allCategories";
        const URL_ALL_CATEGORIES = global.con + "/api/allCategories";

        //axios.get(URL_ALL_CATEGORIES)
        CategoryService.getAllCategories()
            .then(response => response.data)
            .then((data) => {
                this.setState({categories: data})
            }).catch(error => {
                alert("Error: could not get categories")
        });
    }

    loadCategories = event =>{
        event.preventDefault()
        const URL_LOCALHOST = "http://localhost:8080/api/allCategories";
        const URL_ALL_CATEGORIES = global.con + "/api/allCategories";

        //axios.get(URL_ALL_CATEGORIES)
        CategoryService.getAllCategories()
            .then(response => response.data)
            .then((data) => {
                this.setState({categories: data})
            }).catch(error => {
                alert("Error: could not load categories\n"+error+"\nBackend server might be down")
        })
    }

    deleteCategory = (categoryId) =>{

        const URL_LOCALHOST = "http://localhost:8080/api/deleteCategoryById/";
        const URL_DELETE_CATEGORY = global.con + "/api/deleteCategoryById/"

        //axios.delete(URL_DELETE_CATEGORY+categoryId)
            CategoryService.deleteCategory(categoryId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show" : true})
                    setTimeout(() => this.setState({"show" : false}),3000)
                    //categories: this.state.categories.filter(categories => categories.categoryId !== categoryId)
                    this.setState({
                        categories: this.state.categories.filter(categories => categories.categoryId !== categoryId)
                    })
                }
            }).catch(error => {
                alert("Error: Could not delete category\n"+error+"\nBackend server might be down")
        })
    }
    //categoryId;

    handleDelete = (categoryId) =>{

        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Delete this category? ',
            buttons: [
                {
                    label: 'Yes, Delete',
                    onClick: this.deleteCategory.bind(this, categoryId)
                },
                {
                    label: 'No',
                    //onClick: onclose
                    onClick: this.displayCancelled.bind(this)
                }
            ]
        })
    }

    displayCancelled(){
        alert("Deletion Cancelled")
    }



    render() {
        return (

            <div>

                <Link to={'/addEquipmentCategory'}>Add new Category</Link>
                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.show,
                            message:"Category deleted successfully",
                            type: 'danger'}}/>
                </div>

                {/*<Button onClick={this.loadCategories}>Load Categories</Button>*/}


                <Table className={'table-sm'} striped bordered hover variant='light'>

                    <thead>
                        <tr>
                            <th>Equipment Categories</th>
                        </tr>
                    </thead>

                    <tbody>
                    {this.state.categories.length === 0 ?
                        <tr align='center'>
                            <td colSpan={6}> {this.state.categories.length} categories available</td>
                        </tr>:
                        this.state.categories.map( (c) => (
                            <tr key={c.categoryId}>
                                <td>{c.categoryName}</td>

                                <td>
                                    <Button
                                        onClick={this.handleDelete.bind(this,c.categoryId)}
                                        className={'btn btn-danger btn-sm'}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>

                </Table>

            </div>
        );
    }

}

export default EquipmentCategoryList;