'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('pending');
  const [openPopup, setOpenPopup] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchOrders();
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [status]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/getAllOrders');
      setOrders(response.data);
    } catch (error) {
      toast.error('Error fetching orders');
    }
  };

  const handleUpdate = (id) => {
    setOpenPopup(true);
    setId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/orderStatusToggle/${id}`, { status });
      if (response.status !== 200) {
        return toast.error("Update unsuccessful");
      }
      toast.success("Update successful");
      setOpenPopup(false);
      const updatedOrders = orders.map((order) =>
        order._id === id ? { ...order, status } : order
      );
      setOrders(updatedOrders);
      setId(null);
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mt-4 h-[calc(100vh-180px)] overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <div className="overflow-x-auto">
      
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200 text-left">
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map(order => (
                  <tr key={order._id}>
                    <td className="py-2 px-4 text-sm font-medium text-gray-900 truncate">{order._id}</td>
                    <td className="py-2 px-4 text-sm text-gray-500 truncate">{order.user}</td>
                    <td className="py-2 px-4 text-sm text-gray-500">
                      {order.orderItems.map(item => (
                        <div key={item._id} className="truncate">
                          {item.name} (x{item.quantity})
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-4 text-sm text-gray-500">${order.totalPrice}</td>
                    <td className="py-2 px-4 text-sm text-gray-500">{new Date(order.dateOrdered).toLocaleString()}</td>
                    <td className="py-2 px-4 text-sm text-gray-500">{order.status}</td>
                    <td className="py-2 px-4 text-sm text-gray-500">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleUpdate(order._id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          
      </div>
      {openPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setOpenPopup(false)}></div>
          <div className="bg-white p-4 rounded-lg z-10 max-w-md w-full">
            <span
              className="close cursor-pointer text-2xl text-red-700 flex justify-end"
              onClick={() => setOpenPopup(false)}
            >
              &times;
            </span>
            <h2 className="text-xl mb-4">Update Status</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="fulfilled">Fulfilled</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
