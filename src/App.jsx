import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './assets/components/Header.jsx';

import Login from './assets/components/LoginForm.jsx';
import Header2 from './assets/components/Header2.jsx';
import LoginForm from './assets/components/LoginForm.jsx';
import AdminDashboard from './assets/components/AdminDashboard.jsx';
import AdminDashboardLayout from './assets/components/AdminDashboard.jsx';

import AdminEmployeeList from './assets/components/AdminEmployeeList.jsx';
import NewEmpForm from './assets/components/NewEmpForm.jsx';
import PlaceOrder from './assets/components/PlaceOrder.jsx';
import { CheckoutOne } from './assets/components/CheckoutOne.jsx';
import { MenuManage } from './assets/components/MenuManage.jsx';
import NewMenuForm from './assets/components/NewMenuForm.jsx';
import NewMenuFormAdd from './assets/components/NewMenuFormAdd.jsx';
import { ReservationManage } from './assets/components/MakeReservation.jsx';
import ReservationCustStatus from './assets/components/ReservationCustStatus.jsx';
import ReservationFormNewCust from './assets/components/NewReservNewCust/NewReservationNewCust.jsx';
import ReservationFormOldCust from './assets/components/NewReservNewCust/NewReservationOldCust.jsx';
import ReservationEdit from './assets/components/ReservationEdit.jsx';
import ModifyEmpForm from './assets/components/ModifyEmpForm.jsx';
import { OrderItemsManage } from './assets/components/OrderItemsManage.jsx';
import { ReadyItemsManage } from './assets/components/ReadyOrder.jsx';
import ChefDashboardLayout from './assets/components/ChefDashboard.jsx';
import ServerDashboardLayout from './assets/components/ServerDashboard.jsx';
import { InventoryManage } from './assets/components/InventoryManage.jsx';
import NewInventoryAdd from './assets/components/NewInventoryAdd.jsx';
import ModifyInventory from './assets/components/ModifyInventory.jsx';
import { CustomerManage } from './assets/components/ManageCustomer.jsx';
import ModifyCustomer from './assets/components/ModifyCustomer.jsx';
import AddCustomer from './assets/components/AddCustomer.jsx';
import { IngridientsManage } from './assets/components/ManageIngridients.jsx';
import ModifyIngridients from './assets/components/ModifyIngridients.jsx';
import AddIngridient from './assets/components/AddIngridient.jsx';
import { SupplierManage } from './assets/components/ManageSuppliers.jsx';
import ModifySupplier from './assets/components/ModifySupplier.jsx';
import AddSupplier from './assets/components/AddSupplier.jsx';
import Profile from './assets/components/Profile.jsx';

function App() {
  const [dashLink, setDashLink] = useState('/');
  const [orderSummary, setOrderSummary] = useState({})
  const [finalInventory, setFinalInventory] = useState([])
  const [MenuData, setMenuData] = useState({
    MenuItemID: '',
    MenuItemName: '',
    Description: '',
    Category: '',
    Price: '',
    ImageUrl: '',

  });

  const [inventoryData, setInventoryData] = useState({
    InventoryID: '',
    SupplierID: '',
    ItemName: '',
    Category: '',
    Quantity: '',
    ExpiryDate: ''

  });  

  const [customerData, setCustomerData] = useState({
    CustomerID: '',
    CustomerName: '',
    ContactNumber: '',
    Email: '',
    Address: ''
    

  });  

  const [ReservationData, setReservationData] = useState({
    ReservationID: '',
    CustomerID: '',
    TableID: '',
    ReservationTime: '',
    ReservationDate: '',
    NumberOfGuests: '',

  });

  const [supplierData, setSupplierData] = useState({
    SupplierID :'',
    SupplierName :'',
    SupplierAddress: '',
    ContactPerson:'',
    ContactNumber :''

  });  

  const [ingridientData, setIngridientData] = useState({
    MenuItemID: '',
    InventoryID: '',
    Quantity: ''
    

  });

  const [EmpFormData, setEmpFormData] = useState({
    EmployeeID: '',
    Email: '',
    EmployeeName: '',
    EmployeeRole: '',
    HireDate: '',
    Salary: '',
    Password: ''
  });

  return (
    <Router>
      <Header dashLink={dashLink} setDashLink={setDashLink} />
      <Routes>
        <Route path='/profile' element={<Profile></Profile>}></Route>
        <Route path='/addSupplier' element={<AddSupplier/>}></Route>
        <Route path='/manageSuppliers' element={<SupplierManage supplierData={supplierData} setSupplierData={setSupplierData}/>}></Route>
        <Route path='/editSupplier' element={<ModifySupplier supplierData={supplierData} setSupplierData={setSupplierData}/>}></Route>
        <Route path='/addIngridient' element={<AddIngridient/>}></Route>
        <Route path='/modifyIngridients' element={<ModifyIngridients ingridientData={ingridientData} setIngridientData={setIngridientData}/>}></Route>
        <Route path='/manageIngridients' element={<IngridientsManage ingridientData={ingridientData} setIngridientData={setIngridientData}/>}></Route>
        <Route path='/addCustomer' element={<AddCustomer/>}></Route>
        <Route path='/manageCustomers' element={<CustomerManage customerData={customerData} setCustomerData={setCustomerData}/> }></Route> 
        <Route path='/editCustomer' element={<ModifyCustomer customerData={customerData} setCustomerData={setCustomerData}/>}></Route>
        <Route path='/' element={<LoginForm dashLink={dashLink} setDashLink={setDashLink} />} />
        <Route path='/serverDashboard' element={<ServerDashboardLayout dashLink={dashLink} setDashLink={setDashLink}/>}></Route>
        <Route path='/chefDashboard' element={<ChefDashboardLayout dashLink={dashLink} setDashLink={setDashLink}/>}></Route>
        <Route path="/manageOrderItemsAll" element={<OrderItemsManage/>}></Route>
        <Route path="/manageReadyItemsAll" element={<ReadyItemsManage/>}></Route>
        <Route path="/adminDashboard" element={<AdminDashboardLayout dashLink={dashLink} setDashLink={setDashLink} />}></Route>
        <Route path="/EmployeeListAdmin" element={<AdminEmployeeList EmpFormData={EmpFormData} setEmpFormData={setEmpFormData} />} />
        <Route path="/modifyEmployee" element={<ModifyEmpForm EmpFormData={EmpFormData} setEmpFormData={setEmpFormData} />} />
        <Route path="/adminNewEmp" element={<NewEmpForm />}></Route>
        <Route path="/placeOrder" element={<PlaceOrder orderSummary={orderSummary} setOrderSummary={setOrderSummary} finalInventory={finalInventory} setFinalInventory={setFinalInventory} />}></Route>
        <Route path="/newFinaliseOrder" element={<CheckoutOne orderSummary={orderSummary} setOrderSummary={setOrderSummary} finalInventory={finalInventory} setFinalInventory={setFinalInventory} />}></Route>
        <Route path="/orderFinalise" element={<></>}></Route>
        <Route path="/manageMenu" element={<MenuManage MenuData={MenuData} setMenuData={setMenuData} />}></Route>
        <Route path="/editMenuItem" element={<NewMenuForm MenuData={MenuData} setMenuData={setMenuData} />}></Route>
        <Route path="/addMenuItem" element={<NewMenuFormAdd />}></Route>
        <Route path="/manageReservation" element={<ReservationManage ReservationData={ReservationData} setReservationData={setReservationData} />}></Route>
        <Route path="/editReservation" element={<ReservationEdit ReservationData={ReservationData} setReservationData={setReservationData} />}></Route>
        <Route path="/custStatusResv" element={<ReservationCustStatus />}></Route>
        <Route path="/newResvNewCust" element={<ReservationFormNewCust />}> </Route>
        <Route path="/newResvOldCust" element={<ReservationFormOldCust />}> </Route>
        <Route path="/ResvCustStatus" element={<ReservationCustStatus />}></Route>
        <Route path="/manageInventory" element={<InventoryManage inventoryData={inventoryData} setInventoryData={setInventoryData}/>}></Route>
        <Route path="/addInventory" element={<NewInventoryAdd/>}></Route>
        <Route path ="/editInventory" element={<ModifyInventory inventoryData={inventoryData} setInventoryData={setInventoryData}/>}></Route>
      </Routes>

    </Router>



  );
}

export default App;
