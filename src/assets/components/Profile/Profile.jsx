import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Profile = () => {
    function getDateFromISOString(isoString) {
        // Check if the isoString is in yyyy-mm-dd format
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        
        if (regex.test(isoString)) {
            return isoString; // Return the date as is
        }
        
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return `${year}-${month}-${day}`;
    }
    
    const [currentProfile, setCurrentProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUserString = localStorage.getItem("currentUser");
                const currentUser = JSON.parse(currentUserString);

                const response = await axios.get(
                    `http://localhost:3000/api/employees/${currentUser.id}`,
                    {
                        headers: {
                            Authorization: currentUser.accessToken,
                            userrole: currentUser.role
                        }
                    }
                );

                setCurrentProfile(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    console.log(currentProfile)
    return (
        <div style={{ 
            background: 'linear-gradient(115deg, #DC6B19 10%, #F7C566 90%)', 
            padding: '0', 
            margin: '0', 
            fontFamily: 'Arial, Helvetica, sans-serif', 
            color: '#000', 
            fontSize: '12px' 
        }}>
            <div className="container">
                <div className="row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '50px' }}>
                    <div className="col-lg-4">
                        <div className="card shadow-sm" style={{ borderRadius: '10px', backgroundColor: '#F7C566' }}>
                            <div className="card-header bg-transparent text-center">
                                <img className="profile_img" src="https://source.unsplash.com/600x300/?student" alt="student dp" style={{ 
                                    width: '150px', 
                                    height: '150px', 
                                    objectFit: 'cover', 
                                    margin: '10px auto', 
                                    borderRadius: '50%' 
                                }} />
                                <h3 style={{ fontSize: '20px', fontWeight: '700' }}>{currentProfile.EmployeeName}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="card shadow-sm" style={{ borderRadius: '10px', backgroundColor: '#F7C566' }}>
                            <div className="card-header bg-transparent border-0"></div>
                            <div className="card-body pt-0" style={{ 
                                display: 'grid', 
                                gridTemplateColumns: 'repeat(2, 1fr)', 
                                gap: '10px', 
                                alignItems: 'end' 
                            }}>
                                <p><strong>Role: </strong> {currentProfile.EmployeeRole}</p>
                                <p><strong>Email: </strong>{currentProfile.Email}</p>
                                <p><strong>Hiredate: </strong> {getDateFromISOString(currentProfile.HireDate)}</p>
                                <p><strong>Salary: </strong> ₹{currentProfile.Salary}</p>
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
