'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserService } from '@/service/user';

const CreateUser = () => {
    const [user, setUser] = useState({
        name: '',
        username: '',
        password: '',
        role: 'Officer'
    });
    const router = useRouter();
    const [image, setImage] = useState<string | null>(null);
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string); // Store image as base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
    
    const handleCreateUser = async() => {
        if (!user.name || !user.username || !user.password || !user.role) {
            alert("Please fill in all fields and upload an image.");
            return;
        }
        try {
            const response = await UserService.createUser(user)
            router.push("/manage_users")
        } catch (error) {
            console.error("Create user error:", error);
            alert("Failed to create user.");
        }
        
    };

    return (
        <div className="flex rounded-lg h-screen">
            {/* Main Content */}
            <div className="flex-1 flex justify-center items-center bg-[#CFE4F0]">
                <div className="bg-white p-8 rounded-lg shadow-lg border w-3/4">
                    <h1 className="text-4xl font-bold text-center text-[#153A75] mb-6">Create New User</h1>

                    {/* User Image & Form */}
                    <div className="flex">
                        <div className="w-1/3 flex flex-col items-center">
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

                        <div className="w-2/3 flex flex-col gap-4">
                            <div className="flex items-center">
                                <label className="w-24 text-lg font-semibold">Name:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={user.name} 
                                    onChange={handleChange} 
                                    className="flex-1 px-4 py-2 border rounded-lg shadow-sm" 
                                    placeholder="Full Name"
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="w-24 text-lg font-semibold">Username:</label>
                                <input 
                                    type="text" 
                                    name="username" 
                                    value={user.username} 
                                    onChange={handleChange} 
                                    className="flex-1 px-4 py-2 border rounded-lg shadow-sm" 
                                    placeholder="Username"
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="w-24 text-lg font-semibold">Password:</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={user.password} 
                                    onChange={handleChange} 
                                    className="flex-1 px-4 py-2 border rounded-lg shadow-sm" 
                                    placeholder="Password"
                                />
                            </div>
                            <div className="flex items-center">
                                <label className="w-24 text-lg font-semibold">Role:</label>
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
                        </div>
                    </div>

                    {/* Create User Button */}
                    <div className="mt-6 text-center">
                        <button onClick={handleCreateUser} 
                            disabled={!user.name || !user.username || !user.password}
                            className={`px-6 py-2 rounded-lg text-lg transition ${
                                !user.name || !user.username || !user.password
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-green-600 text-white hover:bg-green-800'
                            }`}
                        >
                            Create User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
