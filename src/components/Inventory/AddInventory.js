import React from "react";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

import Toast1 from "../Toasts/Toast1";
import Toast2 from "../Toasts/Toast2";
import DepartmentService from "../../service/DepartmentService";
import SupplierService from "../../service/SupplierService";
import CategoryService from "../../service/CategoryService";
import BrandService from "../../service/BrandService";
import ModelService from "../../service/ModelService";
import EquipmentService from "../../service/EquipmentService";

import WithAuth from "../../service/WithAuth";
import UserService from "../../service/UserService";
import {Redirect} from "react-router-dom";



class AddInventory extends React.Component{



    constructor(props) {
        super(props);
        this.state= this.initialState;
        this.state.show = false;
        this.state.idWarningShow = false;
        this.state={
            type:'',
            deptList: [],
            categoryList: [],
            brandList: [],
            modelList: [],
            filteredBrandList: [],
            filteredModelList: [],
            combinationList: [],
            supplierList:[],

        }
        this.submitEquipment = this.submitEquipment.bind(this);
        this.equipmentChange = this.equipmentChange.bind(this);
        this.departmentChange = this.departmentChange.bind(this);
        this.brandChange = this.brandChange.bind(this);
        this.categoryChange = this.categoryChange.bind(this);
        this.modelChange = this.modelChange.bind(this);
        this.updateBrands = this.updateBrands.bind(this)
        this.updateModels = this.updateModels.bind(this)

        const currentUser = UserService.getCurrentUser();
        this.state.currentUser = currentUser;

        if (this.state.currentUser.roles == 'ADMIN'){
            console.log("User role is admin");
            this.state.permission = 'permitted';
        }

        this.state.currentUser.roles.map((e) => {
            if (e == 'LEADER'){
                this.state.permission = 'permitted';
            }
            else if(e== 'EDITOR'){
                this.state.permission = 'permitted';
            }
            console.log("Role : ",e);
        });

        console.log("Permission : ", this.state.permission);
    }

    initialState = {
        assetId: '',
        serialNumber:'',
        location:'',
        department:'',
        departmentName:'',
        departmentId:'',
        brand:'',
        model:'',
        type:'',
        purchaseDate:'',
        warrantyMonths:'',
        idAvailabilityStatus: '',
        purchaseOrderNumber: '',
        supplierName:'',
        supplierId:'',
        ipAddress: '',
        workStationId: '',

        departmentList:[],
        deptList: [],
        categoryList: [],
        brandList: [],
        modelList: [],
        filteredBrandList: [],
        filteredModelList: [],
        combinationList: [],
        supplierList:[],

        permission:'notPermitted',
        currentUser:''
    }

    async componentDidMount () {

        const LOCAL_HOST_URL_DEPARTMENTS = "http://localhost:8080/api/allDepartments";
        const LOCAL_HOST_URL_CATEGORIES = "http://localhost:8080/api/allCategories";
        const LOCAL_HOST_URL_BRANDS = "http://localhost:8080/api/allBrands";
        const LOCAL_HOST_URL_MODELS = "http://localhost:8080/api/allModels";

        const URL_DEPARTMENTS = global.con + "/api/allDepartments";
        const URL_CATEGORIES = global.con + "/api/allCategories";
        const URL_BRANDS = global.con + "/api/allBrands";
        const URL_MODELS = global.con + "/api/allModels";
        const URL_SUPPLIERS = global.con + "/api/allSuppliers/";

        //await axios.get(URL_DEPARTMENTS)
        await DepartmentService.getAllDepartments()
            .then( response => response.data)
            .then((data) =>{

                this.setState({deptList: data})
                this.setState({department: data[0].did})
                console.log("Department id  received: " + data[0].did)
                console.log("Department id stored: " + this.state.department)
                //this.setState({departmentId: data[0].did})
                this.setState({departmentName: data[0].departmentName})

            }).catch(error => {
                alert("Error in getting departments\n"+error+"\nBackend server might be down")
        });

        //await axios.get(URL_SUPPLIERS)
        await SupplierService.getAllSuppliers()
            .then(response => response.data)
            .then(  (data) => {
                this.setState({supplierList: data})
                this.setState( {supplierName : data[0].supplierName})
                this.setState( {supplierId : data[0].supplierId})
            })

        //await axios.get(URL_CATEGORIES)
            await CategoryService.getAllCategories()
            .then(response => response.data)
            .then( (data) => {

                console.log("Setting category list and type")
                console.log("type: " + this.state.type)

                this.setState({categoryList: data}  )
                this.setState({type: data[0].categoryName}  )
                //this.state.type = data[0].categoryName

                console.log("type: " + this.state.type)

            }).catch(error => {
                alert("Error in getting categories\n"+error+"\nBackend server might be down")
        });

        const LOCAL_HOST_URL_FIND_BRANDS = "http://localhost:8080/api/getBrandsForCategory/";
        const URL_FIND_BRANDS = global.con + "/api/getBrandsForCategory/";
        console.log("type before find brands : " + this.state.type)
        //await axios.get(URL_FIND_BRANDS + this.state.type)
            await CategoryService.getBrandsForCategory(this.state.type)

            .then(response => response.data)
            .then(  (data) => {
                this.setState( {filteredBrandList:data})
                this.setState( {brand: data[0].brandName})
            }).catch(error => {
                alert("Error in getting brands\n"+error+"\nBackend server might be down")
        })

        const LOCAL_HOST_FIND_MODELS = "http://localhost:8080/api/getModelsForBrand/";
        const URL_FIND_MODELS = global.con + "/api/getModelsForBrand/"
        //await axios.get(URL_FIND_MODELS + this.state.brand)
            await ModelService.getModelsForBrand(this.state.brand)
            .then(response => response.data )
            .then( (data) => {
                this.setState( {filteredModelList: data})
                this.setState( {model: data[0].model})
            }).catch(error => {
                alert("Error in getting models\n"+error+"\nBackend server might be down")
            })
        //this.updateModels();

        /*console.log("Category List: "+ this.state.categoryList)
        await axios.get(LOCAL_HOST_URL_BRANDS)
            .then(response => response.data)
            .then( (data) => {
                this.setState({brandList: data})
                this.setState({brand: data[0].brandName})
            }).catch(error => {
            alert(error)
        })*/



        //this.updateBrands()
    }

    createSelectItems(){
        let items2= [];
        let items = [];
        const LOCAL_HOST_URL = "http://localhost:8080/api/allDepartments";
        const URL_ALL_DEPARTMENTS = global.con + "/api/allDepartments"
        //axios.get(URL_ALL_DEPARTMENTS)
            DepartmentService.getAllDepartments()
            .then(response => {
                if(response.data != null){
                    items2 = response.data;

                }
            }).catch(error => {
            alert("Error in creating select items\n"+error+"\nBackend server might be down")
        })

        for( let i = 0; i < items2.length; i++){
            items.push(<option key={i} value={i}>{i}</option>)
        }

        return items;
    }

    submitEquipment = (event) => {
        //alert()

        event.preventDefault();
        const URLLocalHost = "http://localhost:8080/api/addEquipment";
        const URLIP = "http/192.168.12.9:8080/api/addEquipment";
        const URL_ADD_EQUIPMENT = global.con + "/api/addEquipment";

        //creating a json object
        const equipment = {
            assetId: this.state.assetId,
            serialNumber: this.state.serialNumber,
            location: this.state.location,
            //department: this.state.department,
            department: this.state.department,
            brand: this.state.brand,
            model: this.state.model,
            type: this.state.type,
            purchaseDate: this.state.purchaseDate,
            warrantyMonths: this.state.warrantyMonths,
            purchaseOrderNumber: this.state.purchaseOrderNumber,
            //supplier: this.state.supplierName,
            supplier:this.state.supplierId,
            ipAddress: this.state.ipAddress,
            workStationId: this.state.workStationId,
        }


        this.isAssetIdAvailable();
        if(this.state.idAvailabilityStatus == 'available'){
            //alert("Id is not available")
            console.log("Id status: available");

            //console.log("Equipment: " + this.state.equipment.purchaseDate)
            //axios.post(URL_ADD_EQUIPMENT,equipment)
            EquipmentService.addEquipment(equipment)
                .then(response =>{
                    if(response.data != null){
                        this.setState({"show" : true})
                        setTimeout(() => this.setState({"show" : false}),3000)

                        //alert("Equipment added to the inventory succesfully")
                    }
                    else {
                        this.setState({"show" : false})
                    }
                })
                .catch( (error) => {
                alert("Error in Adding equipment \n"+error+"\nBackend server might be down")
            })
            //this.setState(this.initialState);
            //this.setState( () => this.initialState);
            this.resetEquipment();
        }
        else{
            console.log("id status: unavailable");
        }

    }


    isAssetIdAvailable = (status) =>{
        const URL_CHECK_ID_AVAILABILITY = global.con + "/api/checkIdAvailability/"
        if(this.state.assetId == null){
            console.log("Asset id is null");
        }
        else {
            console.log("Asset id: " + this.state.assetId);
            //axios.get(URL_CHECK_ID_AVAILABILITY+this.state.assetId)
            EquipmentService.checkIdAvailability(this.state.assetId)
                .then(response => {
                    if(response.data == true){
                        console.log("Id is not used");
                        this.state.idAvailabilityStatus = 'available';

                        //this.state.idWarningShow = false;
                        return true;
                    }
                    else {
                        console.log("Id is used already");
                        this.setState({"idWarningShow" : true})
                        setTimeout(() => this.setState({"idWarningShow" : false}),3000)
                        return  false;
                    }
                }).catch( (error) => {
                alert("Error in checking asset sid availability\n"+error+"\nBackend server might be down")
            });
        }

        };
    onDropDownSelected (e) {

        //this.state.department =  e.target.value;
        console.log("THE VAL", e.target.value);

    }

    equipmentChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        });

    }

    departmentChange  = (event) =>{
        //this.setState({department: event.value})
        console.log("dept value: "+event.target.value)
        //this.state.department = event.value;
        this.setState({department : event.target.value})
    }

    categoryChange  =  async(event) => {

        event.preventDefault();
        this.setState({type: event.target.value})
        console.log("Category Change")

        const LOCAL_HOST_URL_FIND_BRANDS = "http://localhost:8080/api/getBrandsForCategory/";
        const URL_FIND_BRANDS = global.con + "/api/getBrandsForCategory/"
        //await axios.get(URL_FIND_BRANDS+this.state.type)
            await CategoryService.getBrandsForCategory(this.state.type)
            .then(response => response.data)
            .then(  (data) => {
                this.setState( {filteredBrandList:data})
                this.setState( {brand: data[0].brandName})
            }).catch(error => {

                alert("Error in changing category\n"+error+"\nBackend server might be down")
                //thrown error when returning to an category with brands
                //after selecting a category without brands
            console.log("error in category change find brands : "+error)
        })

        await this.updateBrands();

        const LOCAL_HOST_FIND_MODELS = "http://localhost:8080/api/getModelsForBrand/";
        const URL_FIND_MODELS = global.con + "/api/getModelsForBrand/"
        //await axios.get(URL_FIND_MODELS + this.state.brand)
            await ModelService.getModelsForBrand(this.state.brand)
            .then(response => response.data )
            .then( (data) => {
                this.setState( {filteredModelList: data})
                this.setState( {model: data[0].model})
            }).catch(error => {
                alert("Error in updating brands\n"+error+"\nBackend server might be down")
            })

        await this.updateModels();


    }

    updateBrands =async() => {
        const LOCAL_HOST_URL_FIND_BRANDS = "http://localhost:8080/api/getBrandsForCategory/";
        const URL_FIND_BRANDS = global.con + "/api/getBrandsForCategory/"
        //await axios.get(URL_FIND_BRANDS+this.state.type)
            await CategoryService.getBrandsForCategory(this.state.type)
            .then(response => response.data)
            .then(  (data) => {
                this.setState( {filteredBrandList:data})
                this.setState( {brand: data[0].brandName})
            }).catch(error => {
                //error thrown when selected a category without any brands
                alert("System detected that no brands are registered for one or more categories." +
                    "Please register brands for all categories.")
            console.log("Error in update brands: "+error)
        })
    }

    brandChange = async(event) => {
        event.preventDefault()
        this.setState({brand: event.target.value})
        console.log("brand change");

        const LOCAL_HOST_FIND_MODELS = "http://localhost:8080/api/getModelsForBrand/";
        const URL_FIND_MODELS = global.con + "/api/getModelsForBrand/"
        //await axios.get(URL_FIND_MODELS + this.state.brand)
            await ModelService.getModelsForBrand(this.state.brand)
            .then(response => response.data )
            .then( (data) => {
                this.setState( {filteredModelList: data})
                //this.setState( {model: data[0].model})
            }).catch(error => {
                alert("Error in changing brands\n"+error+"\nBackend server might be down")
        })
        await this.updateModels();

    }

    updateModels = async() => {
        const LOCAL_HOST_FIND_MODELS = "http://localhost:8080/api/getModelsForBrand/";
        const URL_FIND_MODELS = global.con + "/api/getModelsForBrand/"
        //await axios.get(URL_FIND_MODELS + this.state.brand)
            await ModelService.getModelsForBrand(this.state.brand)
            .then(response => response.data )
            .then( (data) => {
                this.setState( {filteredModelList: data})
                this.setState( {model: data[0].model})
            }).catch(error => {
                alert("Error in updating models\n"+error+"\nBackend server might be down")
            console.log("Error in update models find models"+error)
        })

    }

    modelChange = (event) => {
        event.preventDefault();
        this.setState({model: event.target.value})

    }

    supplierChange = (event) => {
        event.preventDefault();
        this.setState({supplierId: event.target.value})
    }

    /*change: function(event){
        this.setState({de})

    }*/

    resetEquipment = () => {
        this.setState( () => this.initialState);
        const LOCAL_HOST_URL_DEPARTMENTS = "http://localhost:8080/api/allDepartments";
        const LOCAL_HOST_URL_CATEGORIES = "http://localhost:8080/api/allCategories";
        const LOCAL_HOST_URL_FIND_BRANDS = "http://localhost:8080/api/getBrandsForCategory/";
        const LOCAL_HOST_FIND_MODELS = "http://localhost:8080/api/getModelsForBrand/";

        const URL_DEPARTMENTS = global.con + "/api/allDepartments";
        const URL_CATEGORIES = global.con + "/api/allCategories";
        const URL_FIND_BRANDS = global.con + "/api/getBrandsForCategory/";
        const URL_FIND_MODELS = global.con + "/api/getModelsForBrand/";
        const URL_FIND_SUPPLIERS = global.con + "/api/allSuppliers/";

        //axios.get(URL_DEPARTMENTS)
        DepartmentService.getAllDepartments()
            .then( response => response.data)
            .then((data) => {
                this.setState({deptList: data})
            }).catch(error => {
            alert("Error in getting departments in resetting\n"+error+"\nBackend server might be down")
        });

        //axios.get(URL_FIND_SUPPLIERS)
        SupplierService.getAllSuppliers()
            .then( response => response.data)
            .then((data) => {
                this.setState({supplierList: data})
            }).catch(error => {
            alert("Error in getting departments in resetting\n"+error+"\nBackend server might be down")
        });

        //axios.get(URL_CATEGORIES)
        CategoryService.getAllCategories()
            .then(response => response.data)
            .then( (data) => {

                console.log("Setting category list and type")
                console.log("type: " + this.state.type)

                this.setState({categoryList: data}  )
                this.setState({type: data[0].categoryName}  )
                //this.state.type = data[0].categoryName

                console.log("type: " + this.state.type)

            }).catch(error => {
            alert("Error in getting categories in resetting\n"+error+"\nBackend server might be down")
            });

        //axios.get(URL_FIND_BRANDS + this.state.type)
        CategoryService.getBrandsForCategory(this.state.type)
            .then(response => response.data)
            .then(  (data) => {
                this.setState( {filteredBrandList:data})
                this.setState( {brand: data[0].brandName})
            }).catch(error => {
                alert(error)
            }).catch(error => {
            alert("Error in getting brands in resetting\n"+error+"\nBackend server might be down")
        })

        //axios.get(URL_FIND_MODELS + this.state.brand)
            ModelService.getModelsForBrand(this.state.brand)
            .then(response => response.data )
            .then( (data) => {
                this.setState( {filteredModelList: data})
                this.setState( {model: data[0].model})
            }).catch(error => {
            alert("Error in getting models in resetting\n"+error+"\nBackend server might be down")
            })



    }

    toggleToastShow = () => {
        this.setState({"show" : false})
    }



    render() {
        const padding={
            padding:'10px'
        }


        /*let axiosResponse = axios.get("http://localhost:8080/api/allDepartments")
            .then( response => {
                if(response.data != null){
                    Data = response.data;
                    for(let i = 0; i < response.data.length; i++){
                        Data[i] = response.data.departmentName
                    }
                    console.log("Data"+Data)
                }
                else {
                    alert("department list empty")
                }
            }).catch(error => {
                alert(error)
            })
        let Data =[],
            MakeItem= function (X){
                return <option>{X}</option>
            }*/


        const {assetId,serialNumber,location,
            department,departmentId, departmentName,brand,model,type,purchaseDate,warrantyMonths,supplier} = this.state;
        return(

            <Container fluid>
                {
                    this.state.permission === 'notPermitted'?
                        <Redirect to={'/no-permission'} />:
                        <div></div>
                }


                {/*<Col style={padding}>*/}

                <div style={padding}>

                        <div style={{"display":this.state.show ? "block" :"none" }}>
                            <Toast1
                                children={{
                                    show:this.state.show,
                                    message:"Equipment added successfully",
                                    type: 'success',
                                }} />
                        </div>

                <div style={{"display":this.state.idWarningShow ? "block" :"none" }}>
                    <Toast2
                        children={{

                            show:this.state.idWarningShow,
                            message:"Id is already used",
                            type: 'warning',
                        }} />
                </div>



                    <Card className={'border border-dark bg-light'}>
                        <Card.Header>Add Item to Inventory</Card.Header>

                            <Form onReset={this.resetEquipment.bind(this)} id={'addNewInventoryForm'}
                              onSubmit={this.submitEquipment.bind(this)}>
                            <Card.Body>
                                <Form.Row>

                                <Form.Group controlId={"formAssetId"} as={Col}>
                                    <Form.Label>AssetId</Form.Label>
                                    <Form.Control required
                                        type="number"
                                        name={'assetId'}
                                        placeholder="Enter AssetID"
                                        //value={this.state.assetId}
                                        //this was here earlier
                                        // later removed .state
                                        value={assetId}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId={"formSerialNo"} as={Col}>
                                    <Form.Label>Serial Number</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name={'serialNumber'}
                                        placeholder="Enter Serial Number"
                                        value={serialNumber}
                                        onChange={this.equipmentChange}/>
                                </Form.Group>

                                <Form.Group controlId={"formLocation"} as={Col}>
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name={'location'}
                                        placeholder="Enter the initial Location"
                                        value={location}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>




                                    <Form.Group controlId={"formDepartment"} as={Col}>
                                        <Form.Label>Department</Form.Label>
                                        <Form.Control
                                             as={"select"} required name={'department'}
                                            defaultValue={"ITDef"}
                                            value={department}
                                            onChange={this.departmentChange.bind(this)}>


                                            {
                                                this.state.deptList.length === 0?
                                                    <option>No depts</option>:
                                                    this.state.deptList.map( (e) =>(
                                                        <option  value={e.did} datatype="text">
                                                            {e.departmentName}
                                                        </option>
                                                    ))
                                            }

                                        </Form.Control>
                                    </Form.Group>



                                </Form.Row>

                                <Form.Row>

                                    <Form.Group controlId={"formType"} as={Col}>
                                        <Form.Label>Equipment Category</Form.Label>
                                        <Form.Control
                                            required as={"select"} name={'type'}
                                            defaultValue={"PC"}
                                            value={type}
                                            onChange={this.categoryChange.bind(this)}>

                                            {
                                                this.state.categoryList.length === 0?
                                                    <option>No Categories</option>:
                                                    this.state.categoryList.map( (e) =>(
                                                        <option  value={e.categoryName} datatype="text">
                                                            {e.categoryName}
                                                        </option>
                                                    ))
                                            }

                                        </Form.Control>
                                    </Form.Group>

                                <Form.Group controlId={"formBrand"} as={Col}>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        required
                                        as={'select'}
                                        name={'brand'}
                                        value={brand}
                                        onChange={this.brandChange.bind(this)}
                                    >
                                        {
                                            this.state.filteredBrandList.length === 0?
                                                <option>No Brands!!</option>:
                                                this.state.filteredBrandList.map( (e) => (
                                                    <option value={e.brandName}>{e.brandName}</option>
                                                ))
                                        }
                                    </Form.Control>


                                </Form.Group>

                                <Form.Group controlId={"formModel"} as={Col}>
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        required
                                        as={'select'}
                                        name={'model'}
                                        value={model}
                                        onChange={this.modelChange.bind(this)}
                                    >

                                        {
                                            this.state.filteredModelList.length === 0?
                                                <option>No Models!!</option>:
                                                this.state.filteredModelList.map( (e) => (
                                                    <option value={e.model}>{e.model}</option>
                                                ))
                                        }

                                    </Form.Control>
                                </Form.Group>





                                </Form.Row>

                                <Form.Row>

                                <Form.Group controlId={"formPurchaseDate"} as={Col}>
                                    <Form.Label>Purchase Date</Form.Label>
                                    <Form.Control
                                        required
                                        type="date"
                                        name={'purchaseDate'}
                                        value={purchaseDate}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>

                                <Form.Group controlId={"formWarrantyMonths"} as={Col}>
                                    <Form.Label>Warranty Months</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name={'warrantyMonths'}
                                        placeholder="Warranty Period"
                                        value={warrantyMonths}
                                        onChange={this.equipmentChange}
                                    />
                                </Form.Group>

                                    <Form.Group controlId={"formPurchaseOrderNumber"} as={Col}>
                                        <Form.Label>Purchase Order Number</Form.Label>
                                        <Form.Control
                                            required
                                            type="number"
                                            name={'purchaseOrderNumber'}
                                            placeholder="Purchase Order number"

                                            value={this.state.purchaseOrderNumber}

                                            onChange={this.equipmentChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId={"formModel"} as={Col}>
                                        <Form.Label>Supplier</Form.Label>
                                        <Form.Control
                                            required
                                            as={'select'}
                                            name={'supplier'}
                                            value={supplier}
                                            onChange={this.supplierChange.bind(this)}
                                        >

                                            {
                                                this.state.supplierList.length === 0?
                                                    <option>No Suppliers!!</option>:
                                                    this.state.supplierList.map( (e) => (
                                                        <option value={e.supplierId}>{e.supplierName}</option>
                                                    ))
                                            }

                                        </Form.Control>
                                    </Form.Group>





                                    <Form.Group controlId={"formIpAddress"} as={Col}>
                                        <Form.Label>IP address</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name={'ipAddress'}
                                            placeholder="ip address (if applicable)"
                                            value={this.state.ipAddress}
                                            onChange={this.equipmentChange}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId={"formWorkstationId"} as={Col}>
                                        <Form.Label>Workstation Id</Form.Label>
                                        <Form.Control
                                            required
                                            type="text"
                                            name={'workStationId'}
                                            placeholder="Workstation id"
                                            value={this.state.workStationId}
                                            onChange={this.equipmentChange}
                                        />
                                    </Form.Group>
                                </Form.Row>


                            </Card.Body>

                            <Card.Footer>
                                <Row>
                                    <Col>
                                        <Button className={'btn btn-success'} type={'submit'}>Add Item</Button>
                                    </Col>
                                    <Col>
                                        <Button className={'btn btn-secondary'} type={'reset'}>Reset Values</Button>
                                    </Col>

                                    <Col>
                                        <Button className={'btn btn-info'} onClick={this.isAssetIdAvailable}>
                                            Check asset id
                                        </Button>
                                    </Col>
                                </Row>


                            </Card.Footer>
                            {/*<Card.Footer>
                                <Button className={'btn btn-secondary'} type={'reset'}>Reset Values</Button>
                            </Card.Footer>*/}
                        </Form>



                    </Card>

                {/*</Col>*/}

                </div>

            </Container>
        );
    }

}
export default WithAuth(AddInventory);