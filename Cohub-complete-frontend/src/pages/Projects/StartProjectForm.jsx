import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getBearerToken from '../../Helper/getBearerToken';
import { useAuth } from '../../Contexts/AuthContext';
import userApiService from '../../../apiServices/user.apiService'; // Import the userApiService object

const StartProjectForm = () => {

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: ''
    });
    const { loggedIn } = useAuth();
    const [error, setError] = useState(null);
    const [success,setSuccess]=useState(Boolean);

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }
    }, [loggedIn, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            const bearerToken = getBearerToken();
            console.log(bearerToken);
            const response = await axios.post(`${userApiService.api}/startProject`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${bearerToken}`
                    }
                }
            );
            setSuccess(true);
            console.log(response.data);
            setFormData({
                name: '',
                type: '',
                description: '',
            });
            setTimeout(()=>{
                navigate('/dashboard');
            },2000);
        } catch (error) {
            console.error('Error in start project:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            {loggedIn ? (
                <div className="bg-gray-800 shadow-md rounded-lg px-10 py-8 mb-4 w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-4 text-gray-200">Start a New Project</h2>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {success && <div className="text-green-500 mb-4">Project add successFully!!</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-300 text-sm font-bold mb-2">Project Name:</label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="type" className="block text-gray-300 text-sm font-bold mb-2">Type:</label>
                            <input
                                id="type"
                                type="text"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 h-32"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                    </form>
                </div>
            ) : null}
        </div>
    );
};

export default StartProjectForm;
