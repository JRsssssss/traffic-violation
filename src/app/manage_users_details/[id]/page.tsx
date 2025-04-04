'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const users = [
    { id: 1,username: 'Music', password: '1234' ,name: 'Music Auyeung', role: 'Officer', image:'/car.jpg'},
    { id: 2,username: 'Miki', password: '1234' ,name: 'Miki Ajiki', role: 'Administrator', image:'/car.jpg' },
    { id: 3,username: 'Kawin', password: '1234',name: 'Kawin Thimayom', role: 'Officer', image:'/car.jpg' },
    { id: 4,username: 'Prem', password: '1234',name: 'Jirapat Ruetrakul', role: 'Officer', image:'/car.jpg' },
    { id: 5,username: 'Music1', password: '1234',name: 'Music Auyeung', role: 'Officer', image:'/car.jpg' },
    { id: 6,username: 'Miki1', password: '1234',name: 'Miki Ajiki', role: 'Administrator', image:'/car.jpg' },
    { id: 7,username: 'Kawin1', password: '1234',name: 'Kawin Thimayom', role: 'Officer', image:'/car.jpg' },
    { id: 8,username: 'Prem1', password: '1234',name: 'Jirapat Ruetrakul', role: 'Officer', image:'/car.jpg' },
    { id: 9,username: 'Music2', password: '1234',name: 'Music Auyeung', role: 'Officer', image:'/car.jpg' },
    { id: 10,username: 'Miki2', password: '1234',name: 'Miki Ajiki', role: 'Administrator', image:'/car.jpg' },
    { id: 11,username: 'Kawin2', password: '1234',name: 'Kawin Thimayom', role: 'Officer', image:'/car.jpg' },
    { id: 12,username: 'Prem2', password: '1234',name: 'Jirapat Ruetrakul', role: 'Officer', image:'/car.jpg' },
];

const ManageUserDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [image, setImage] = useState<string>('');

  useEffect(() => {
    const userId = params.id ? parseInt(params.id as string) : null;
    const selectedUser = users.find((u) => u.id === userId);
    if (selectedUser) {
        setUser(selectedUser);
        setImage(selectedUser.image);
    }
}, [params.id]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
};

  if (!user) {
    return (
      <div className="p-6">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center p-6 bg-[#CFE4F0] rounded-lg h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg border w-3/4">
        <h1 className="text-4xl font-bold text-center text-[#153A75] mb-6">Manage User: {user.name}</h1>
        <div className='flex items-center justify-center gap-5'>
            {/* User Details Form */}
            <div className="w-1/3 flex flex-col items-center justify-center">
                                        <div className="w-48 h-48 border shadow-lg rounded-lg overflow-hidden">
                                            {image ? (
                                                <img src={image} alt="User Preview" className="w-full h-full object-cover"/>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                    <span className="text-gray-500">Upload Image</span>
                                                </div>
                                            )}
                                        </div>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleImageUpload} 
                                            className="mt-2 text-sm"
                                        />
            </div>
            <div className='flex-col'>
              <div className="flex items-center">
                <label className="w-24 font-semibold text-lg">Username:</label>
                <input
                  type="text"
                  value={user.username}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border rounded-lg shadow-sm"
                />
              </div>

              <div className="flex items-center">
                <label className="w-24 font-semibold text-lg">Full Name:</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border rounded-lg shadow-sm"
                />
              </div>

              <div className="flex items-center">
                <label className="w-24 font-semibold text-lg">Role:</label>
                <select 
                  name="role" 
                  value={user.role}
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
                  value={user.password}
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
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
                onClick={() => alert('Edit User functionality here')}
              >
                Edit User
              </button>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default ManageUserDetails;
