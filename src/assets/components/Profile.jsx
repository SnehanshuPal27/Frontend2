import React from 'react';

export const Profile = () => {
    return (
        <div className="student-profile py-4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="card shadow-sm">
                            <div className="card-header bg-transparent text-center">
                                <img className="profile_img" src="https://source.unsplash.com/600x300/?student" alt="student dp" />
                                <h3>Ishmam Ahasan Samin</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card shadow-sm">
                            <div className="card-header bg-transparent border-0"></div>
                            <div className="card-body pt-0">
                                <p><strong>Role: </strong> Manager</p>
                                <p><strong>Email: </strong>samin@gmail.com</p>
                                <p><strong>Hiredate: </strong> 21/05/2020</p>
                                <p><strong>Salary: </strong> ₹60,000</p>
                            </div>
                        </div>
                        <div style={{ height: '26px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
