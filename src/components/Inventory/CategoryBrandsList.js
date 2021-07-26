import React from "react";
import Toast1 from "../Toasts/Toast1";
import {Button, Table} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import CategoryService from "../../service/CategoryService";
import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";

class CategoryBrandsList extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState
        this.state.show =  false

        this.deleteCombo.bind(this)

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;


        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }

        console.log("Permission : ", this.state.permission);

    }

    initialState ={
        brandList:[],
        categoryList: [],
        comboList: [],
        category: '',
        permission:'notPermitted',
        currentUser:''

    }

    componentDidMount() {
        const LOCALHOST_URL_GET_ALL = "http://localhost:8080/api/allCategoryBrandCombinations"
        const URL_GET_ALL_COMBINATIONS = global.con + "/api/allCategoryBrandCombinations";
        //axios.get(URL_GET_ALL_COMBINATIONS)
        CategoryService.getAllCategoryBrandCombinations()
            .then(response => response.data)
            .then( (data) => {
                this.setState( {comboList: data}  )
            }).catch(error => {
                alert("Error: could not get combos\n"+error +"\nBackend server might be down.")
        })
    }



    deleteCombo = (id) => {

        const LOCAL_HOST_URL_DELETE = "http://localhost:8080/api/deleteBrandCategoryById/"
        const URL_DELETE_COMBO = global.con + "/api/deleteBrandCategoryById/"
        //axios.delete(URL_DELETE_COMBO+id)
            CategoryService.deleteBrandCategory(id)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true})
                    setTimeout(() => this.setState({"show" : false}),3000)
                    this.setState({
                        comboList: this.state.comboList.filter(comboList => comboList.id !== id)
                    })
                }
            }).catch(error => {
                alert("Error: could not delete combo \n" + error + "\nBackend server might be down")
        })

    }

    render() {
        return (
            <div>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }

                <Link to={'/addBrandsToCategories'}>Category and Brands</Link> <br/>

                <div style={{"display":this.state.show ? "block" :"none" }}>
                    <Toast1
                        children={{show:this.state.show,
                            message:"Combo Deleted successfully",
                            type: 'danger'}}/>
                </div>

                <Table className={'table-sm'} striped bordered hover variant='light'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Category</th>
                            <th>Brand</th>
                        </tr>
                    </thead>

                    <tbody>
                    {
                        this.state.comboList.length === 0?
                            <tr align='center'>
                                <td colSpan={6}> {this.state.comboList.length} records available </td>
                            </tr> :
                            this.state.comboList.map( (e) => (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.category}</td>
                                    <td>{e.brand}</td>

                                    <td>
                                        <Button className={'btn btn-danger btn-sm'} onClick={this.deleteCombo.bind(this,e.id)}>
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

export default WithAuth(CategoryBrandsList);