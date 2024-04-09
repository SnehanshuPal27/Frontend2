import React from 'react';

const currentUser=null;

async function getEmpList(){
    try {
        const currentUserString = localStorage.getItem("currentUser");
        currentUser = JSON.parse(currentUserString);
        
        const employeeList = await axios.get(
            'http://localhost:3000/api/employees',
            {
                headers: {
                    Authorization: currentUser.accessToken,
                    userrole:currentUser.role

                }
            }
        );
        return employeeList;
        
        
    } catch (error) {
        console.log("Error in fetching employeeList:", error);
    }
}

const AdminEmployeeList = () => {
  let employeeList=getEmpList();  

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Employees</h2>
          <p className="mt-1 text-sm text-gray-700">
            This is a list of all employees. You can add new employees, edit or delete existing ones.
          </p>
        </div>
        <div>
          <button
            type="button"
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            <a href="/addNewEmployee">Add new employee</a>
          </button>
        </div>
      </div>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      <span>Employee</span>
                    </th>
                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Salary
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Hiring Date
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-700"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-4 py-3.5">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {employeeList.data.map((employee, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={employee.ImageUrl}
                              alt="img"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {employee.EmployeeName}
                            </div>
                            <div className="text-sm text-gray-700">{employee.Email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-12 py-4">
                        <div className="text-sm text-gray-900 ">{employee.Salary}</div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                        {employee.HireDate.substring(0, 10)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-700">
                        {employee.EmployeeRole}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-medium">
                        <a href="#" className="text-gray-700">
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminEmployeeList;
