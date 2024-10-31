'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: '',
    adminEmail: '',
    maintenanceMode: false
  });
  const [loading, setLoading] = useState(false);
  const [updatedSettings, setUpdatedSettings] = useState({
    siteName: '',
    adminEmail: '',
    maintenanceMode: false
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/getSetting'); // API endpoint to get current settings
        setSettings(response.data);
        setUpdatedSettings(response.data);
      } catch (error) {
        toast.error('Error fetching settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/updateSettings', updatedSettings); // API endpoint to update settings
      if (response.status === 200) {
        setSettings(updatedSettings);
        toast.success('Settings updated successfully');
      } else {
        toast.error('Failed to update settings');
      }
    } catch (error) {
      toast.error('Error updating settings');
    } finally {
      setLoading(false);
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
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Admin Settings</h1>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Site Name</label>
            <input
              type="text"
              name="siteName"
              value={updatedSettings.siteName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Admin Email</label>
            <input
              type="email"
              name="adminEmail"
              value={updatedSettings.adminEmail}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="inline-flex items-center text-gray-700 text-sm font-bold">
              <input
                type="checkbox"
                name="maintenanceMode"
                checked={updatedSettings.maintenanceMode}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2">Maintenance Mode</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
