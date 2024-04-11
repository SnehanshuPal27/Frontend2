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

function App() {
  const [count, setCount] = useState(0);
 const [orderSummary,setOrderSummary]=useState({})
 const [finalInventory,setFinalInventory]=useState([])
  return (
   <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<LoginForm/>} />
      <Route path="/adminDashboard" element={<AdminDashboardLayout/>}></Route>
      <Route path="/EmployeeListAdmin" element={<AdminEmployeeList/>}/>
      <Route path="/adminNewEmp" element={<NewEmpForm/>}></Route>
      <Route path="/placeOrder"  element={<PlaceOrder orderSummary={orderSummary} setOrderSummary={setOrderSummary} finalInventory={finalInventory} setFinalInventory={setFinalInventory} />}></Route>
      <Route path="/newFinaliseOrder" element={<CheckoutOne orderSummary={orderSummary} setOrderSummary={setOrderSummary} finalInventory={finalInventory} setFinalInventory={setFinalInventory}/> }></Route>
      <Route path="/orderFinalise" element={<></>}></Route>
    </Routes>

   </Router> 
   
    
    
  );
}

export default App;
