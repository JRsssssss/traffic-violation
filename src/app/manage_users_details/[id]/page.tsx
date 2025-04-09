'use client';

import RequireAuth from '@/Components/RequireAuth';
import { UserService } from '@/service/user';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ManageUserDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [image, setImage] = useState<string>('');
  const [editableUser, setEditableUser] = useState<any>(null);
  
  useEffect(() => {
      const fetchUser = async () => {
        const id = params?.id;
  
        if (id) {
          const userId = parseInt(id);
          const response = await UserService.getUserById(userId);
  
          if (response) {
            setUser(response.user);
            setEditableUser({...response})
            console.log(editableUser);
          } else {
            console.error("Violation not found:", response?.error || "Unknown error");
          }
        } else {
          console.error("Violation ID is invalid.");
        }
      };
  
      fetchUser();
    }, [params]);
  useEffect(() => {
    console.log("Editable User:", editableUser);
  }, [editableUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditableUser((prev: any) => ({
      ...prev,
      user: {
        ...prev.user,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSave = async () => {
    if (editableUser && editableUser?.user.id) {
      try {
        const updatedUser = await UserService.updateUser({
          id: editableUser.user.id,
          name: editableUser.user.name,
          username: editableUser.user.username,
          password: editableUser.user.password,
          role: editableUser.user.role,
        });

        console.log("Updated User:", updatedUser);
        router.push("/manage_users");
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  if (!user) {
    return (
      <div className="p-6">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <RequireAuth>
      <div className="flex flex-col justify-center items-center p-6 bg-[#CFE4F0] rounded-lg h-screen w-full">
        <div className="bg-white p-8 rounded-lg shadow-lg border w-1/2">
          <h1 className="text-4xl font-bold text-center text-[#153A75] mb-6">Manage User: {user.name}</h1>
          <div className='flex items-center justify-center gap-5'>
              {/* User Details Form */}
              <div className='flex-col'>
                <div className="flex items-center">
                  <label className="w-24 font-semibold text-lg">Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={editableUser.user.username}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border rounded-lg shadow-sm"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-24 font-semibold text-lg">Full Name:</label>
                  <input
                    type="text"
                    name='name'
                    value={editableUser.user.name}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border rounded-lg shadow-sm"
                  />
                </div>

                <div className="flex items-center">
                  <label className="w-24 font-semibold text-lg">Role:</label>
                  <select 
                    name="role" 
                    value={editableUser.user.role}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border rounded-lg shadow-sm bg-white cursor-pointer"
                  >
                      <option value="Administrator">Administrator</option>
                      <option value="Officer">Officer</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="w-24 font-semibold text-lg">Password:</label>
                  <input
                    name='password'
                    value={editableUser.user.password}
                    onChange={handleChange}
                    className="flex-1 px-4 py-2 border rounded-lg shadow-sm"
                  />
                </div>
              </div>
              
          </div>
          {/* Buttons */}
          <div className='flex justify-between'>
            <div></div>
            <div className="flex gap-4 mt-6">
                <button
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                  onClick={() => router.push('/manage_users')}
                >
                  Cancel
                </button>
                <button
                  disabled={
                    !editableUser?.user?.name ||
                    !editableUser?.user?.username ||
                    !editableUser?.user?.password ||
                    !editableUser?.user?.role
                  }
                  className={`px-6 py-2 rounded-lg text-lg transition ${
                    !editableUser?.user?.name ||
                    !editableUser?.user?.username ||
                    !editableUser?.user?.password ||
                    !editableUser?.user?.role
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-800'
                  }`}
                  onClick={handleSave}
                >
                  Save
                </button>
            </div>
          </div>
          
        </div>
        
      </div>
    </RequireAuth>

  );
};

export default ManageUserDetails;
