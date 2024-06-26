import React from 'react';
import "./sidebar.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AdminSidebar = ({dashLink,setDashLink}) => {


    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(currentUserString);
    const navigate=useNavigate()
    const handleLogout=()=>{
       setDashLink("/") 
       localStorage.removeItem("currentUser");
       console.log("in handle logout")
       navigate("/")
    }
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Welcome {currentUser.name}</h3>
            </div>

            <ul className="list-unstyled components">
                {/* <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                    <ul className="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <a href="#">Page 1</a>
                        </li>
                        <li>
                            <a href="#">Page 2</a>
                        </li>
                        <li>
                            <a href="#">Page 3</a>
                        </li>
                    </ul>
                </li> */}
                <li>
                    <Link to="/EmployeeListAdmin"> Employee </Link>
                </li>
                <li>
                    <Link to="/placeOrder">Take Order </Link>
                </li>
                <li>
                <Link to="/manageMenu">Manage Menu </Link>
                </li>
                <li>
                    <Link to="/manageReservation"> Manage Reservations </Link>
                </li>
                <li>
                <Link to="/manageInventory"> Manage Inventory </Link>
                </li>
                <li>
                <Link to="/manageCustomers"> Manage Customers </Link>
                </li>
                <li>
                <Link to="/manageSuppliers"> Manage Suppliers </Link>
                </li>
                <li>
                <Link to="/finances"> Manage Orders & Finances </Link>
                </li>
                <li>
                <Link to="/profile"> My Profile </Link>
                </li>
                
                <li>
                <a> <button onClick={handleLogout}> Logout </button> </a>
                </li>
            </ul>
        </nav>
    );
};

export default AdminSidebar;
