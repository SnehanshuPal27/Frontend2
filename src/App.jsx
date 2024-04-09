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

function App() {
  const [count, setCount] = useState(0);

  return (
   <Router>
    <Header/>
    <Routes>
      <Route path='/' element={<LoginForm/>} />
      <Route path="/adminDashboard" element={<AdminDashboardLayout/>}></Route>
      <Route path="/EmployeeListAdmin" element={<AdminEmployeeList/>}/>
      <Route path="/adminNewEmp" element={<NewEmpForm/>}></Route>
    </Routes>

   </Router> 
   
    
    
  );
}

export default App;
