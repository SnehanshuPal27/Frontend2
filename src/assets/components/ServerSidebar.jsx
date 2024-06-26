import React from 'react';
import "./sidebar.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ServerSidebar = ({dashLink,setDashLink}) => {
    const navigate=useNavigate()
    const handleLogout=()=>{
        setDashLink('/')
       localStorage.removeItem("currentUser");
       console.log("in handle logout")
       navigate("/")
    }

    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(currentUserString);
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Welcome {currentUser.name}</h3>
            </div>

            <ul className="list-unstyled components">
                
                
                <li>
                <Link to="/placeOrder">Take Orders </Link>
                </li>
                
                <li>
                    <Link to="/manageReadyItemsAll"> Serve Orders</Link>
                </li>
                <li>
                    <Link to ="/manageReservation"> Manage Reservations</Link>
                </li>
                <li>
                    <a href="/profile">My profile</a>
                </li>
                <li>
                <a> <button onClick={handleLogout}> Logout </button> </a>
                </li>
            </ul>
        </nav>
    );
};

export default ServerSidebar;
