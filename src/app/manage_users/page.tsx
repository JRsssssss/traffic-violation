'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiX } from 'react-icons/fi';
import { UserService } from '@/service/user';

const ManageUsers = () => {
    const router = useRouter();

    const [users, setUsers] = useState<any[]>([]);
    const [sortOrder, setSortOrder] = useState("A-Z");
    const [filter, setFilter] = useState("");
    const usersPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [isManaging, setIsManaging] = useState(false);

    useEffect(() => {
      const fetchViolations = async () => {
        const response = await UserService.getAllUsers();
        setUsers(response);
        console.log(users);
      };
  
      fetchViolations();
    }, []);
    // Sort function
    const sortedUsers = [...users].sort((a, b) => {
      if (sortOrder === "A-Z") return b.name.localeCompare(a.name);
      return a.name.localeCompare(b.name);
    });
  
    // Filter function
    const filteredUsers = sortedUsers.filter((user) =>
      user.username.toLowerCase().includes(filter.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const indexOfLastReport = currentPage * usersPerPage; 
    const indexOfFirstReport = indexOfLastReport - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstReport, indexOfLastReport);

    const toggleManageUsers = () => {
      setIsManaging(!isManaging);
    };
  
    // Handle user deletion
    const deleteUser = async (userId: number) => {
      const confirmDelete = confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) return;
    
      try {
        const res = await UserService.deleteUser(userId);
        setUsers(users.filter(user => user.id !== userId));
        alert("User deleted successfully.");
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert("Failed to delete user.");
      }
    };
    

    return (
        <div className="flex-1 p-6 bg-[#CFE4F0] rounded-lg h-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-center flex-1">Users</h1>
          </div>

          {/* Sorting & Filter */}
          <div className="flex justify-between items-center gap-4 mb-4">
            <div className='flex justify-center items-center gap-4'>
              <label className="font-medium text-lg">Sort by:</label>
              <select
                className="px-4 py-2 border rounded-lg shadow-sm"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>

              <label className="font-medium text-lg">Filter:</label>
              <input
                type="text"
                className="px-4 py-2 border rounded-lg shadow-sm"
                placeholder="Search name..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className='flex gap-4'>
              <button onClick={toggleManageUsers} className={`px-6 py-2 rounded-lg transition ${
                isManaging ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
              {isManaging ? "Cancel" : "Manage Users"}
              </button>

              <button onClick={() => router.push('/create_users')} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                Create User
              </button>
              <button></button>
            </div>
            
          </div>
          
          {/* User List */}
          <div className="bg-white rounded-lg shadow-md">
            {/* Table Header */}
            <div className="flex font-semibold p-3 border-b text-center">
              <span className="flex-1">Name</span>
              <span className="flex-1">Permissions</span>
              <span className="flex-1">Flags</span>
            </div>
    
            {/* Table Rows */}
            {currentUsers.map((user, index) => (
              <div key={index} className="flex p-4 border-b items-center text-center">
                {/* Clickable username that navigates to user details page */}
                <span 
                  className={!isManaging? `flex-1 text-black`:`flex-1 text-blue-500 hover:underline cursor-pointer`}
                  onClick={() => isManaging && router.push(`/manage_users_details/${user.id}`)}
                >
                  {user.username}
                </span>
                
                <span className="flex-1">{user.role}</span>

                {/* Manage Mode: Show "X" delete button */}
                <div className="flex-1 flex justify-center">
                  <button className="bg-gray-200 p-3 rounded-lg">View Flags</button>
                </div>
                <button 
                  className={isManaging?`bg-red-500 text-white p-2 rounded-full hover:bg-red-600`:`hidden`}
                  onClick={() => deleteUser(user.id)}
                >
                  <FiX size={18} />
                </button>
              </div>
            ))}

          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 gap-4">
                <button 
                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`} 
                    disabled={currentPage === 1} 
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Previous
                </button>
                <span className="text-lg font-medium">Page {currentPage} of {totalPages}</span>
                <button 
                    className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"}`} 
                    disabled={currentPage === totalPages} 
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
      );
};

export default ManageUsers;