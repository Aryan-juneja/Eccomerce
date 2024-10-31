'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [role, setRole] = useState('user');
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState(null);
  const router = useRouter();

  const handleUpdate = (id) => {
    setOpenPopup(true);
    setId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/deleteUser/${id}`);
      toast.success("User deleted successfully");
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/updateRole/${id}`, { role });
      if (response.status !== 200) {
        return toast.error("Update unsuccessful");
      }
      toast.success("Update successful");
      setOpenPopup(false);
      const updatedUsers = users.map((user) =>
        user._id === id ? { ...user, role } : user
      );
      setUsers(updatedUsers);
      setId(null);
      router.refresh();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/getAllUsers");
        setUsers(response.data);
      } catch (error) {
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <div>
      <div className='bg-white h-[calc(100vh-96px)] rounded-lg p-4'>
        <div className='flex flex-row justify-center items-center'>
          <h2 className='text-3xl'>Users</h2>
        </div>
        <div className='mt-4 h-[calc(100vh-180px)] overflow-y-auto'>
        {loading ? (
              <div className="flex justify-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
          ) : (
            <table className='w-full'>
              <thead>
                <tr className='text-gray-500 border-t border-[#ececec]'>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className='border-b border-[#ececec] hover:bg-[#f5f5f5]'>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className='flex gap-2 items-center'>
                      <button className='bg-[#f5f5f5] text-[#000] rounded-md px-2 py-1 hover:bg-[#000] hover:text-white' onClick={() => handleUpdate(user._id)}>Edit</button>
                      <button className='bg-[#f5f5f5] text-[#000] rounded-md px-2 py-1 hover:bg-[#000] hover:text-white' onClick={() => handleDelete(user._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {openPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-lg z-10 max-w-md w-full">
            <span className="close cursor-pointer text-2xl text-red-700 flex justify-end" onClick={() => setOpenPopup(false)}>&times;</span>
            <h2 className='text-xl mb-4'>Update Status</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="banned">Banned</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
