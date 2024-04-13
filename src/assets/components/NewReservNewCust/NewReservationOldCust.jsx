import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

async function fetchTables() {
    const currentUserString = localStorage.getItem("currentUser");
    const currentUser = JSON.parse(currentUserString);
    const response = await axios.get(
        'http://localhost:3000/api/tables/',
        {
            headers: {
                Authorization: currentUser.accessToken,
                userRole: currentUser.role
            }
        }
    );
    console.log("here")
    console.log(response.data)
    return response.data;
}

async function maxReservationValue() {
    let tableList = await fetchTables()
    let max = 0
    tableList.forEach((item) => {
        console.log(item.TableStatus)
        if (item.Capacity > max && item.TableStatus === 'Available') {
            max = item.Capacity
        }
    })
    return max
}






const ReservationFormOldCust = () => {
    const navigate=useNavigate()
    const [ReservationData, setReservationData] = useState({
        ReservationID: '',
        CustomerID: '',
        TableID: '',
        ReservationTime: '',
        ReservationDate: '',
        NumberOfGuests: ''
    });
    const [maxGuests, setMaxGuests] = useState(0);

    async function assignTable() {
        let tableList = await fetchTables()
        let id = 1;
        for (let item of tableList) {
            console.log(item.TableStatus)
            if (item.Capacity >= ReservationData.NumberOfGuests && item.TableStatus === 'Available') {
                id = item.TableID;
                break; // Exit the loop once a suitable table is found
            }
        }
        return id;
    }


    async function getCustomer(email) {
        try {
            const currentUserString = localStorage.getItem("currentUser");
            const currentUser = JSON.parse(currentUserString);
            const response = await axios.post(
                'http://localhost:3000/api/customers/email',{
                    Email: ReservationData.Email

                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: currentUser.accessToken,
                        userRole: currentUser.role
                    }
                     
                }
            );
            console.log(response.data);
            return response.data['CustomerID'];
        } catch (error) {
            console.error('Error in getCustomer:', error.message);
            return 0;
        }
    }
        




    useEffect(() => {
        async function getMaxGuests() {
            const maxGuestsValue = await maxReservationValue();
            setMaxGuests(maxGuestsValue);
        }

        getMaxGuests();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReservationData({
            ...ReservationData,
            [name]: value
        });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        const currentUserString = localStorage.getItem("currentUser");
        const currentUser = JSON.parse(currentUserString);
        // Perform form submission logic here (e.g., send data to server)
        console.log(ReservationData);
        const outputIndex = await getCustomer(ReservationData.Email)
        // console.log(outputIndex)
        setReservationData({
            ...ReservationData,
            CustomerID: outputIndex
        });
        console.log(ReservationData)
        let tableindex = await assignTable()

        try {
            await axios.post(
                'http://localhost:3000/api/reservations/',
                {
                    CustomerID: outputIndex,
                    TableID: tableindex,
                    ReservationTime: ReservationData.ReservationTime,
                    ReservationDate: getCurrentDate(),
                    NumberofGuests: ReservationData.NumberOfGuests
                },
                {
                    headers: {
                        Authorization: currentUser.accessToken,
                        userRole: currentUser.role

                    }
                }
            );
            navigate("/manageReservation")
        } catch (error) {
            console.error('Error creating reservation:', error);
            // Handle the error as needed
        }


    };

    const guestOptions = [];
    for (let i = 1; i <= maxGuests; i++) {
        guestOptions.push(<option key={i} value={i}>{i}</option>);
    }

    console.log(maxGuests)
    return (
        <div style={{ fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '10px', background: 'linear-gradient(115deg, #DC6B19 10%, #F7C566 90%)' }}>
            <div style={{ maxWidth: '800px', background: '#FFEFD5', width: '800px', padding: '25px 40px 10px 40px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '12px' }}>
                <div style={{ textAlign: 'center', fontSize: '41px', fontWeight: '600', background: 'linear-gradient(115deg, #DC6B19 10%, #F7C566 90%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Make Your Reservation Now!</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="input-data">
                            <select id="guests" name="NumberOfGuests" value={ReservationData.NumberOfGuests} onChange={handleChange} required>
                                {guestOptions}
                            </select>
                            <div className="underline"></div>
                            <label htmlFor="guests">Guests</label>
                        </div>
                    </div>
                    {/* <div className="form-row">
                        <div className="input-data">
                            <input type="tel" name="CustomerID" value={ReservationData.CustomerID} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="CustomerID">Contact Number</label>
                        </div>
                    </div> */}
                    <div className="form-row">
                        <div className="input-data">
                            <input type="email" name="Email" value={ReservationData.Email} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="CustomerID">Email Address</label>
                        </div>
                    </div>
                    {/* <div className="form-row">
                        <div className="input-data">
                            <input type="text" name="Address" value={ReservationData.Address} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="CustomerID">Address</label>
                        </div>
                    </div> */}
                    {/* <div className="form-row">
                        <div className="input-data">
                            <input type="text" name="CustomerName" value={ReservationData.CustomerName} onChange={handleChange} required />
                            <div className="underline"></div>
                            <label htmlFor="CustomerID">Customer Name</label>
                        </div>
                    </div> */}
                    <div className="form-row">
                        <div className="input-data">
                        <select id="timeslot" name="ReservationTime" value={ReservationData.ReservationTime} onChange={handleChange}>
  

                                <option value="9AM-10AM">9:00 AM - 10:00 AM</option>
                                <option value="10AM-11AM">10:00 AM - 11:00 AM</option>
                                <option value="11AM-12PM">11:00 AM - 12:00 PM</option>
                                <option value="12PM-1PM">12:00 PM - 1:00 PM</option>
                                <option value="1PM-2PM">1:00 PM - 2:00 PM</option>
                                <option value="2PM-3PM">2:00 PM - 3:00 PM</option>
                                <option value="3PM-4PM">3:00 PM - 4:00 PM</option>
                                <option value="4PM-5PM">4:00 PM - 5:00 PM</option>
                                <option value="5PM-6PM">5:00 PM - 6:00 PM</option>
                                <option value="6PM-7PM">6:00 PM - 7:00 PM</option>
                                <option value="7PM-8PM">7:00 PM - 8:00 PM</option>
                                <option value="8PM-9PM">8:00 PM - 9:00 PM</option>
                                <option value="9PM-10PM">9:00 PM - 10:00 PM</option>
                            </select>
                            <div className="underline"></div>
                            <label htmlFor="timeslot">Pick your slot</label>
                        </div>
                    </div>
                    <div className="form-row submit-btn">
                        <div className="input-data">
                            <div className="inner"></div>
                            <input type="submit" value="Submit" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReservationFormOldCust;
