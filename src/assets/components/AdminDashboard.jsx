import React from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import { useState,useEffect } from 'react';
const AdminDashboardLayout = ({dashLink, setDashLink}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <AdminSidebar dashLink={dashLink} setDashLink={setDashLink}/>
                </div>
                <div className="col-md-9">
                    <AdminDashboard dashLink={dashLink} setDashLink={setDashLink} />
                </div>
            </div>
        </div>
    );
};


const AdminDashboard = ( {dashLink, setDashLink} ) => {
  const [dashboardData, setDashboardData] = useState([0, 0, 0, 0, 0, 0]); // Initial array with 0s

  useEffect(() => {
      const fetchData = async () => {
          setDashLink("/adminDashboard")
          const currentUserString = localStorage.getItem("currentUser");
          const currentUser = JSON.parse(currentUserString);
          
          try {
              const orderCountResponse = await axios.get(
                  'http://localhost:3000/api/orders/orderCount',
                  {
                      headers: {
                          Authorization: `${currentUser.accessToken}`
                      }
                  }
              );
              const x1 = orderCountResponse.data.data;

              const chefCountResponse = await axios.get(
                  'http://localhost:3000/api/employees/chefCount',
                  {
                      headers: {
                          Authorization: `${currentUser.accessToken}`,
                          userRole: currentUser.role
                      }
                  }
              );
              const x2 = chefCountResponse.data[0]['COUNT(*)'];

              const ReservationCountResponse = await axios.get(
                  'http://localhost:3000/api/reservations/reserveCount',
                  {
                      headers: {
                          Authorization: `${currentUser.accessToken}`
                      }
                  }
              );
              const x3 = ReservationCountResponse.data['COUNT(*)'];

              const managerStats = await axios.get(
                  'http://localhost:3000/api/employees/managerStats',
                  {
                      headers: {
                          Authorization: `${currentUser.accessToken}`,
                          userRole: currentUser.role
                      }
                  }
              );
              const x4 = managerStats.data.ServerCount;
              const x5 = managerStats.data.managerCount;
              const x6 = managerStats.data.tableCount;

              setDashboardData([x1, x2, x3, x4, x5, x6]);

          } catch (error) {
              console.log("Error in fetching data:", error);
          }
      };

      fetchData();
  }, []);


  // console.log("in admindashboard")
  
// const currentUserString = localStorage.getItem("currentUser");
// const currentUser = JSON.parse(currentUserString);

// console.log(currentUser)  
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
            <div className="fs-1" style={{ color: '#141E46' }}>{dashboardData[4]}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Managers</div>
          </div>

          <div className="bg-success rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(40, 167, 69)' }}>
            <div className="fs-1" style={{ color: '#141E46' }}>{dashboardData[1]}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Chefs</div>
          </div>

          <div className="bg-primary rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(0, 123, 255)' }}>
            <div className="fs-1" style={{ color: '#141E46' }}>{dashboardData[3]}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Servers</div>
          </div>

          <div className="bg-success rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(40, 167, 69)' }}>
            <div className="fs-1" style={{ color: '#141E46' }}>{dashboardData[5]}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Tables Available</div>
          </div>

          <div className="bg-warning rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(255, 193, 7)' }}>
            <div className="fs-1" style={{ color: '#141E46' }}>{dashboardData[2]}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Reservations</div>
          </div>

          <div className="bg-danger rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(220, 53, 69)' }}>
            <div className="fs-1" style={{ color: '#141E46' }}>{dashboardData[0]}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Total Orders</div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default AdminDashboardLayout;
