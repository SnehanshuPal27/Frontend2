import React from 'react';
import "./sidebar.css"
import { Link } from 'react-router-dom';
const AdminSidebar = () => {
    return (
        <nav id="sidebar">
            <div className="sidebar-header">
                <h3>Sidebar</h3>
            </div>

            <ul className="list-unstyled components">
                <li>
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
                </li>
                <li>
                    <Link to="/EmployeeListAdmin"> Employee </Link>
                </li>
                <li>
                    <a href="#">Contact</a>
                </li>
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li>
                    <a href="#">Pending donations</a>
                </li>
                <li>
                    <a href="#">Previous donations</a>
                </li>
                <li>
                    <a href="#">Agents</a>
                </li>
                <li>
                    <a href="#">My profile</a>
                </li>
                <li>
                    <a href="#">Logout</a>
                </li>
            </ul>
        </nav>
    );
};

export default AdminSidebar;
