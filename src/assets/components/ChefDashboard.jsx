import React from 'react';
import AdminSidebar from './AdminSidebar';
import ChefSidebar from './ChefSidebar';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

// async function getChefStats(){
//     const currentUserString = localStorage.getItem("currentUser");
//     const currentUser = JSON.parse(currentUserString);

//     const response1 = await axios.get(
//         'http://localhost:3000/api/orders/orderItems',
//         {
//             headers: {
//                 Authorization: currentUser.accessToken,

//             }
//         }
//     );
//     let x1= response1.data.length;

    
//     const response2 = await axios.get(
//         'http://localhost:3000/api/orders/readyItems',
//         {
//             headers: {
//                 Authorization: currentUser.accessToken,

//             }
//         }
//     );
//     let x2=response2.data.length;

//     const response3 = await axios.get(
//         'http://localhost:3000/api/inventory',
//         {
//             headers: {
//                 Authorization: currentUser.accessToken,

//             }
//         }
//     );
    
//     let x3=response3.data.length

//     return {x1:x1,x2:x2,x3:x3}
// }


const ChefDashboardLayout = () => {
    
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <ChefSidebar />
                </div>
                <div className="col-md-9">
                    <ChefDashboard />
                </div>
            </div>
        </div>
    );
};




const ChefDashboard = (props) => {
    const [stats, setStats] = useState([0, 0, 0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUserString = localStorage.getItem("currentUser");
                const currentUser = JSON.parse(currentUserString);

                const response1 = await axios.get('http://localhost:3000/api/orders/orderItems', {
                    headers: {
                        Authorization: currentUser.accessToken,
                    }
                });
                const x1 = response1.data.length;

                const response2 = await axios.get('http://localhost:3000/api/orders/readyItems', {
                    headers: {
                        Authorization: currentUser.accessToken,
                    }
                });
                const x2 = response2.data.length;

                const response3 = await axios.get('http://localhost:3000/api/inventory', {
                    headers: {
                        Authorization: currentUser.accessToken,
                    }
                });
                const x3 = response3.data.length;

                setStats([x1, x2, x3]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <main>
                <div id="main-wrapper">
                    <div className="bg-white shadow-sm p-3">
                        <span className="me-3" id="sidebar-toggler-btn"><i className="fas fa-bars"></i></span>
                        <h5 className="m-0 color-theme d-inline-block">Dashboard</h5>
                    </div>

                    <div className="d-flex gap-3 flex-wrap m-4 text-white">
                        <div className="bg-primary rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(0, 123, 255)' }}>
                            <div className="fs-1" style={{ color: '#141E46' }}>{stats[0]}</div>
                            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Pending Orders</div>
                        </div>

                        <div className="bg-success rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(40, 167, 69)' }}>
                            <div className="fs-1" style={{ color: '#141E46' }}>{stats[1]}</div>
                            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Ready and Yet to be Served orders</div>
                        </div>

                        <div className="bg-primary rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(0, 123, 255)' }}>
                            <div className="fs-1" style={{ color: '#141E46' }}>{stats[2]}</div>
                            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Total Inventory Items</div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};



export default ChefDashboardLayout;
