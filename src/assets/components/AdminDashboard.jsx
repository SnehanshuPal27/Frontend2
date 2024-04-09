import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminDashboardLayout = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <AdminSidebar />
                </div>
                <div className="col-md-9">
                    <AdminDashboard />
                </div>
            </div>
        </div>
    );
};


const AdminDashboard = ( props ) => {

  console.log("in admindashboard")
  
const currentUserString = localStorage.getItem("currentUser");
const currentUser = JSON.parse(currentUserString);

console.log(currentUser)  
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
            <div className="fs-1" style={{ color: '#141E46' }}>{currentUser.managerCount !== undefined ? currentUser.managerCount : 0}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Managers</div>
          </div>

          <div className="bg-success rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(40, 167, 69)' }}>
            <div className="fs-1" style={{ color: '#141E46' }}>{currentUser.totalchefCount !== undefined ? currentUser.totalchefCount : 0}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Chefs</div>
          </div>

          <div className="bg-primary rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(0, 123, 255)' }}>
            <div className="fs-1" style={{ color: '#141E46' }}>{currentUser.serverCount !== undefined ? currentUser.serverCount : 0}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Servers</div>
          </div>

          <div className="bg-success rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(40, 167, 69)' }}>
            <div className="fs-1" style={{ color: '#141E46' }}>{currentUser.tableCount !== undefined ? currentUser.tableCount : 0}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Tables Available</div>
          </div>

          <div className="bg-warning rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(255, 193, 7)' }}>
            <div className="fs-1" style={{ color: '#141E46' }}>{currentUser.reservationCount !== undefined ? currentUser.reservationCount : 0}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Reservations</div>
          </div>

          <div className="bg-danger rounded p-3" style={{ width: '250px', backgroundColor: 'rgb(228, 228, 228)', border: '2px solid rgba(220, 53, 69)' }}>
            <div className="fs-1" style={{ color: '#141E46' }}>{currentUser.totalOrderCount !== undefined ? currentUser.totalOrderCount : 0}</div>
            <div className="fs-5" style={{ fontSize: '1.25rem', color: '#141E46' }}>Total Orders</div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
};

export default AdminDashboardLayout;
