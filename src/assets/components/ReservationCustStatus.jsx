import React from 'react';

export function ReservationCustStatus() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="button-container text-center">
                <a href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-3xl mr-4">Existing Customer</a>
                <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-3xl ml-4">New Customer</a>
            </div>
        </div>
    );
};

export default ReservationCustStatus;
