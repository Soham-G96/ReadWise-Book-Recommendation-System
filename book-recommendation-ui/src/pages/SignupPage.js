import React, {useEffect,  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import illustration from "../assets/images/hero-img final 3.png";
import { motion } from 'framer-motion';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', 
    email: '',
    password: '',
    confirm_password: ''
  });

  useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        navigate("/home"); // or wherever you want to redirect logged-in users
      }
    }, [navigate]);

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirm_password } = formData;

    if (!username || !email || !password || !confirm_password) {
      setError('All fields are required!');
      return;
    }

    if (password !== confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/users/register/', {
        username,
        email,
        password,
        confirm_password
      });

      if (response.status === 201 || response.status === 200) {
        setSuccessMessage('Account created successfully! Redirecting...');
        setError('');
        setTimeout(() => navigate('/login'), 1500);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12"
      style={{
        background: 'linear-gradient(90deg, #f87b3f -62%, #fffff8 54%)',
        fontFamily: "'Poppins', sans-serif"
      }}
    >
      {/* Animated Left Section - Form */}
      <motion.div
        className="w-full md:w-1/2 max-w-lg"
        initial={{ opacity:0, x:-50 }}
        animate={{ opacity:1, x:0 }}
        transition={{ duration:0.8, ease:'easeOut'}}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Create Your Account</h2>

        {error && <p className="text-red-500 text-md mb-4 font-bold">{error}</p>}
        {successMessage && <p className="text-green-600 text-md mb-4 font-bold">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        </motion.div>

      {/* Right Section - Illustration */}
      <div className="hidden md:flex w-full md:w-1/2 justify-center items-center h-full mt-10 md:mt-0">
        <img src={illustration} alt="Signup Illustration" className="w-[80%] max-w-[600px]" />
      </div>
    </div>
  );
};

export default SignupPage;















// import React,{ useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import illustration from "../assets/images/hero-img final 3.png";

// const SignupPage = () => {
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         username:'',
//         email:'',
//         password:'',
//         confirm_password:''
//     });

//     const [error, setError] = useState('');
//     const[successMessage, setSuccessMessage] = useState('');

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]:e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const { username, email, password, confirm_password} = formData;

//         //Basic client side validation
//         if (!username || !email || !password || !confirm_password) {
//             setError('All fields are required! ');
//             return;
//         }

//         if (password !== confirm_password) {
//             setError('Passwords do not match.');
//             return;
//         }

//         try {
//             const response = await axios.post('http://localhost:8000/api/users/register/', {
//                 username,
//                 email,
//                 password,
//                 confirm_password
//             });

//             if (response.status === 201 || response.status === 200){
//                 setSuccessMessage('Account created successfully! Redirecting...');
//                 setError('');
//                 setTimeout(() => navigate('/login'), 1500) // Redirect after 1.5 seconds
//             }
//         } catch (err) {
//             setError(err.response?.data?.error || 'Something went wrong. Please try again.');
//             setSuccessMessage('');
//         }
//     };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-purple-100 via-white to-blue-100 px-4">
//         <div className='bg-white shadow-xl rounded-lg p-8 w-full max-w-md'>
//             <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'> Create Your Acccount</h2>

//             {error && <p className='text-red-500 text-lg mb-4'>{error}</p>}
//             {successMessage && <p className='text-green-600 text-lg mb-4'>{successMessage}</p>}

//             <form onSubmit={handleSubmit} className='space-y-4'>
//                 <input type='text' 
//                        name='username'
//                        placeholder='Username'
//                        value={formData.username}
//                        onChange={handleChange}
//                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
//                 <input type='email'
//                        name='email'
//                        placeholder='Email'
//                        value={formData.email}
//                        onChange={handleChange}
//                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
//                 <input type='password'
//                        name='password'
//                        placeholder='Password'
//                        value={formData.password}
//                        onChange={handleChange}
//                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
//                 <input type='password'
//                        name='confirm_password'
//                        placeholder='Confirm Password'
//                        value={formData.confirm_password}
//                        onChange={handleChange}
//                        className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
                
//                 <button type='submit'
//                         className='w-full py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-all' >
//                         Sign Up
//                 </button>

//             </form>
//         </div>
        
//     </div>
//   );
// };

// export default SignupPage