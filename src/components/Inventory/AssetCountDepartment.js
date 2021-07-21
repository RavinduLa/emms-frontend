import React from "react";
import {Button, Card, Col, Form, Row, Table} from "react-bootstrap";
import axios from "axios";
import CategoryService from "../../service/CategoryService";
import DepartmentService from "../../service/DepartmentService";
import EquipmentService from "../../service/EquipmentService";
import WithAuth from "../../service/WithAuth";

class AssetCountDepartment extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialState;

        this.changeDept = this.changeDept.bind(this);
        this.resetDeptAssetCount = this.resetDeptAssetCount.bind(this);
        this.alertDepartmentAssets = this.alertDepartmentAssets.bind(this);
        this.writeOutput = this.writeOutput.bind(this);

        //this.submitDepartmentSelection = this.submitDepartmentSelection.bind(this);

    }

    initialState={

        deptList:[],
        departmentAssetCount: new Map(),
        departmentId:'',
        departmentName:'',
        assetCount:'',
        typeList:[],
        typeAssetCount: new Map(),
        output:''
    }

    async componentDidMount(){
        const URL_DEPARTMENTS = global.con+"/api/allDepartments";
        const URL_GETEQUIPMENTCOUNT = global.con+"/api/getDepartmentAssetCount/";
        const URL_GET_ALL_TYPES = global.con+"/api/allCategories/";

        console.log("Asset count department component mounted")

        //await axios.get(URL_GET_ALL_TYPES)
         await   CategoryService.getAllCategories()
            .then(response => response.data)
            .then((data) => {
                this.setState({typeList: data})
            }).catch(error => {
                alert("Cannot get type list. Backend server might be down.\n"+error)
            })

        //await axios.get(URL_DEPARTMENTS)
             await DepartmentService.getAllDepartments()
            .then(response => response.data)
            .then((data) => {
                this.setState({deptList: data})
            }).catch(error => {
                alert("Cannot get departments: \n Backend server might be down.\n"+error)
            })

        let departmentAssetCountMap = new Map();
        await this.state.deptList.map( (e) => (

            //axios.get(URL_GETEQUIPMENTCOUNT+e.did)
            EquipmentService.getDepartmentAssetCount(e.did)
                .then(response => response.data)
                .then((data) => {
                    departmentAssetCountMap.set(e.did,data);
                    this.setState({departmentAssetCount: departmentAssetCountMap});
                    //this.setState({departmentAssetCount: departmentAssetCountMap});
                    //this.state.departmentAssetCount.set(e.did,data);
                    //this.state.departmentAssetCount = departmentAssetCountMap;
                    //console.log("inside axios: "+departmentAssetCountMap.get(1));
                    //console.log("inside axios state v: "+this.state.departmentAssetCount.get(1));
                })

        ))

        //console.log("Outside axios map: "+departmentAssetCountMap.get(1))
        //console.log("Outside axios map:"+this.state.departmentAssetCount.get(1))


        /*this.state.departmentAssetCount.map((e) => {
            console.log(e)
        })*/

     }

    resetDeptAssetCount=async ()=>{
        this.setState(() => this.initialState);
        const URL_DEPARTMENTS = global.con+"/api/allDepartments/";

        //await axios.generateKey(URL_DEPARTMENTS)
        await DepartmentService.getAllDepartments()
            .then(response => response.data)
            .then((data) => {
                this.setState({deptList: data})
            }).catch(error => {
                alert("Backend server might be down.\n"+error);
            })
    }

    changeDept= (event) =>{
        event.preventDefault();

        this.setState({departmentId: event.target.value})
    }

     getDepartmentAssetCount = async (id) => {
        const URL_GETEQUIPMENTCOUNT = global.con+"/api/getDepartmentAssetCount/";
        console.log("Running getDepartmentAssetCount");

        //await axios.get(URL_GETEQUIPMENTCOUNT+id)
         await EquipmentService.getDepartmentAssetCount(id)
            .then(response => response.data)
            .then((data) => {
                console.log("Returning data: "+data);
                return data;
            })
    }

    alertDepartmentAssets= async (did) => {
        const URL_GET_TYPES = global.con+"/api/getTypeDeptAssetCount/"

        let typeAssetCountMap = new Map;
        let outputM = '';
        this.setState({output: ''});

        await Promise.all(
            this.state.typeList.map( async (e) => (
                await axios.get(URL_GET_TYPES+did+"/"+e.categoryName)
                    .then(response => response.data)
                    .then( async (data) => {
                        //alert("Category "+e.categoryName +" : "+data)
                        await typeAssetCountMap.set(e.categoryName,data)
                        await this.setState({typeAssetCount: typeAssetCountMap})

                    })
                    .then( async () => {
                        outputM = outputM + e.categoryName + " : "+ await this.state.typeAssetCount.get(e.categoryName)+"\n";
                    })
                    .then( async () => {
                         await this.setState({output:outputM})
                    })
                    .catch(error => {
                        console.log("Error in alerting: "+error);
                    })
            ))
        ).then( () => {
            alert(this.state.output);
        })
            .then( () => {
                this.setState({output:''});
            })




        /*console.log("Write output running")
        await this.state.typeList.map(   (e) => { //here should be brackets
            //outputM.concat(outputM,e.categoryName,' : ',this.state.typeAssetCount.get(e.categoryName),'\n')
            outputM = outputM + e.categoryName + " : "+ this.state.typeAssetCount.get(e.categoryName)+"\n";
            console.log("outputM : "+outputM)

        })

        this.setState({output:outputM})
        alert(this.state.output);*/



    }
    writeOutput = async (event) => {
        event.preventDefault();
        let outputM = '';
        console.log("Write output running")
        await this.state.typeList.map( (e) => {
            //outputM.concat(outputM,e.categoryName,' : ',this.state.typeAssetCount.get(e.categoryName),'\n')
            outputM = outputM + e.categoryName + " : "+ this.state.typeAssetCount.get(e.categoryName)+"\n";
        })

        console.log(outputM);
        alert(outputM);
    }

    submitDepartmentSelection = async (event) =>{
        event.preventDefault();

        const URL_GETEQUIPMENTCOUNT = global.con+"/api/getDepartmentAssetCount/";

        //await axios.get(URL_GETEQUIPMENTCOUNT+this.state.departmentId)
        await EquipmentService.getDepartmentAssetCount(this.state.departmentId)
            .then(response => response.data)
            .then((data) => {
                this.setState({assetCount:data})
            }).catch(error => {
                alert("Backend server might be down \n"+error)
            })
    }

    render() {
        const {departmentId,departmentName} = this.state;

        async function getAssetCount(id){
            const URL_GETEQUIPMENTCOUNT = global.con+"/api/getDepartmentAssetCount/";
            console.log("Running get asset count");

            //await axios.get(URL_GETEQUIPMENTCOUNT+id)
            await EquipmentService.getDepartmentAssetCount(id)
                .then(response => response.data)
                .then((data) => {
                    console.log("Returning data: "+data);
                    return data;
                })
        }
        return (
            <div>
                <div>
                    Third time's the charm....
                    <Table>
                        <thead>
                        <tr>
                            <td>Department</td>
                            <td>IT Item Count</td>
                        </tr>
                        </thead>

                        <tbody>
                        {

                            this.state.deptList.map(  (e) => (

                                <tr key={e.did}>
                                    <td>{e.departmentName}</td>
                                    <td>{this.state.departmentAssetCount.get(e.did)}</td>
                                    {/*<td>{this.state.typeAssetCount.get('CPU')}</td>*/}
                                    <td>
                                        <Button
                                            onClick={this.alertDepartmentAssets.bind(this,e.did)}
                                            className={'btn btn-info'}>
                                            View
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>



                </div>
            </div>
        );
    }

}
export default WithAuth(AssetCountDepartment);