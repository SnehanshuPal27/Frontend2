import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signin', {
            email,
            password
        });

      // Assuming the response data is an array of items
      const data = response.data;
      console.log('Data:', data);
      let currentUser=data;
      if (data.role == 'Manager') {
        console.log(currentUser);
        // order numbers
        try {
            const orderCountResponse = await axios.get(
                'http://localhost:3000/api/orders/orderCount',
                {
                    headers: {
                        Authorization: `${currentUser.accessToken}`
                    }
                }
            );
            currentUser.totalOrderCount = orderCountResponse.data.data
        } catch (error) {
            console.log("Error in fetching order count:", error);
        }
    //chef numbers
    try {
        const chefCountResponse = await axios.get(
            'http://localhost:3000/api/employees/chefCount',
            {
                headers: {
                    Authorization: `${currentUser.accessToken}`,
                    userRole: currentUser.role
                },
                
                

                
            }
        );
        //  console.log(chefCountResponse.data[0]['COUNT(*)'])
        currentUser.totalchefCount = chefCountResponse.data[0]['COUNT(*)']


    } catch (error) {
        console.log("Error in fetching order count:", error);
    }
    //  console.log(currentUser)
    //reservation count
    try {
        const ReservationCountResponse = await axios.get(
            'http://localhost:3000/api/reservations/reserveCount',
            {
                headers: {
                    Authorization: `${currentUser.accessToken}`
                }
            }
        );
        // console.log(ReservationCountResponse.data['COUNT(*)'])
        currentUser.reservationCount = ReservationCountResponse.data['COUNT(*)']
    } catch (error) {
        console.log("Error in fetching order count:", error);
    }
//all rem stats
try {
const managerStats = await axios.get(
    'http://localhost:3000/api/employees/managerStats',
    {
        headers: {
            Authorization: `${currentUser.accessToken}`,
            userRole: currentUser.role
        },
        
        

        
    }
);
console.log(managerStats.data)
currentUser.serverCount=managerStats.data.ServerCount
 currentUser.managerCount=managerStats.data.managerCount
 currentUser.tableCount=managerStats.data.tableCount
 localStorage.setItem('currentUser', JSON.stringify(currentUser));
 console.log(currentUser)
}
catch{
  console.log("mamangerState datafetch error")
}
 

 
// currentUser.totalchefCount = chefCountResponse.data[0]['COUNT(*)']
navigate('/adminDashboard', { currentUser } );

} 

if (data.role == 'Chef'){
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  navigate('/chefDashboard', { currentUser } );
}

if (data.role == 'Server'){
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  navigate('/ServerDashboard', { currentUser } );
}
      
       // If you want to return the data to the caller
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // You can rethrow the error if you want to handle it in the calling function
    }
    
    // Here you can perform any authentication logic before redirecting to the dashboard
    // For now, just calling loadDashboard function
    
  };

  return (
    <div className="m-0 pt-5 w-100 bg-img-2">
      <form
        onSubmit={handleSubmit}
        className="w-50 bg-white p-5 m-auto"
        style={{ minWidth: '320px' }}
      >
        <h3 className="text-center mb-3">User Login</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            id="email"
            placeholder="Enter email.."
            required
            autoFocus
            style={{ boxShadow: '0 0 10px #DC6B19' }}
          />
        </div>
    
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="password"
            placeholder="Enter password.."
            required
            style={{ boxShadow: '0 0 10px #DC6B19' }}
          />
        </div>
    
        <button type="submit" className="btn btn-lg btn-primary joinus m-auto mt-3" style={{ width: '200px', borderRadius: 0, zIndex: 6, backgroundColor: '#DC6B19' }}>Submit</button>
    
        <div className="mt-3">
          <span>Don't have an account?</span>
          <a href="/auth/signup">Signup here</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
