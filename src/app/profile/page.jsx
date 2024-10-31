    'use client'
    import { useEffect, useState } from 'react';
    import axios from 'axios';
    import { useSession } from 'next-auth/react';
    import toast from 'react-hot-toast';
    import { useRouter } from 'next/navigation';
    const UserProfile = () => {
        const { data: session } = useSession();
        const router = useRouter();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (session?.user) {
        fetchUserData();
        }
    }, [session]);
    const fetchUserData = async () => {
        setLoading(true);
        try {
            const response = session;
        setUser(response.user);
        setFormData({
            id:response.user._id || '',
            name: response.user.name || '',
            email: response.user.email || '',
            password: '', // Don't prefill password
        });
        } catch (error) {
        toast.error('Error fetching user data');
        } finally {
        setLoading(false);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        setLoading(true);
        try {
        const response = await axios.post('/api/updateUserProfile', formData);
        setUser(response.data);
        toast.success('Profile updated successfully');
        router.push('/');
        } catch (error) {
        toast.error('Error updating profile');
        } finally {
        setLoading(false);
        }
    };
    if (loading) {
        return <div className="flex justify-center mt-10"><span className="loading loading-spinner loading-lg"></span></div>;
    }
    return (
        <div className="container mx-auto mt-10 max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
        {user && (
            <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md h-[523px] mb-3 ">
            <div className="mt-10">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-black text-sm font-bold mb-2">Name</label>
                <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mt-2"
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-black text-sm font-bold mb-2">Email</label>
                <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mt-2"
                required
                disabled={true}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-black text-sm font-bold mb-2">Password</label>
                <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline mt-2"
                />
            </div>
            <div className='flex justify-center text-center '>
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
            >
                Update Profile
            </button>
            </div>
            </div>
            </form>
        )}
        </div>
    );
    };

    export default UserProfile;
