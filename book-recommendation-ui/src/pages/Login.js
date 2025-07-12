import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import illustration from "../assets/images/hero-img final 3.png"; 
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/home"); // or wherever you want to redirect logged-in users
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Invalid credentials.");
      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      console.log("accessToken: ",data.access)
      navigate("/setup-preferences");
    } catch (err) {
      setError(err.message);
    }
  };
//   (50deg, rgb(253, 252, 249) 60%, rgb(119, 160, 237) 101%)
// Roseann style linear-gradient(to top, #ffafbd, #ffc3a0);
// Linear Venice -background: linear-gradient(to top, #6190e8, #a7bfe8); 
  return (
    <div
  className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-[#fdfcf9] px-6 md:px-16 py-12"
  style={{
    background: 'linear-gradient(90deg, #f87b3f -62%, #fffff7 54%)',
    fontFamily: "'Poppins', sans-serif",
  }}
>
  {/* Left Section - Form */}
  <motion.div
   initial={{ opacity:0, x: -50}}
   animate={{ opacity:1, x:0 }}
   transition={{ duration:0.6, ease: "easeOut"}}
   className="w-full md:w-1/2 max-w-lg text-center md:text-left">
  
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Welcome! 👋</h2>
    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="text"
        placeholder="Username"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
      >
        Log In
      </button>
    </form>
  
  </motion.div>

  {/* Right Section - Illustration */}
  <div className="flex w-full md:w-1/2 justify-center items-center mt-4 md:mt-0">
    <img
      src={illustration}
      alt="Login Illustration"
      className="w-[80%] max-w-[600px] md:max-w-[600px] object-contain "
    />
  </div>
</div>
// xxxxxxxxxxxxxxxxxxxxxxxxxx
    // <div className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-[#fdfcf9] px-6 md:px-16 py-12"
    // style={{
    //     background: 'linear-gradient(90deg, #f87b3f -62%, #fffff8 54%)',
    //     fontFamily: "'Poppins', sans-serif",
    //   }}
    // >
    //   {/* Left Section - Form */}
    //   <div className="w-full md:w-1/2 max-w-lg">
    //     <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Welcome Back 👋</h2>
    //     {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    //     <form onSubmit={handleLogin} className="space-y-4">
    //       <input
    //         type="text"
    //         placeholder="Username"
    //         className="w-full px-4 py-2 border border-gray-300 rounded-md"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         className="w-full px-4 py-2 border border-gray-300 rounded-md"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //       <button
    //         type="submit"
    //         className="w-full py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300"
    //       >
    //         Log In
    //       </button>
    //     </form>
    //   </div>

    //   {/* Right Section - Illustration */}
    //   <div className="hidden md:flex w-full md:w-1/2 justify-center items-center h-full">
    //     <img src={illustration} alt="Login Illustration" className="w-[80%] max-w-[600px]" />
    //   </div>
    // </div>
  );
};

export default Login;








// import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://127.0.0.1:8000/api/users/login/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body:JSON.stringify({username, password})
//             });

//             if (!response.ok) {
//                 throw new Error("Invalid credentials. Please try again");
//             }

//             const data = await response.json()
//             localStorage.setItem("accessToken", data.access); // Store token
//             localStorage.setItem("refreshToken", data.refresh);
            
//             navigate("/"); // Redirect to homepage or recommendations page
//         } catch (err) {
//             setError(err.message);
//         }
//         };

//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//                 <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                     <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
//                     {error && <p className="text-red-500 text-sm mb-3 mt-2">{error}!</p>}
//                     <form onSubmit={handleLogin}>
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             className="w-full p-2 mb-3 border rounded"
//                             required
//                         />
//                         <input
//                              type="password"
//                              placeholder="Password"
//                              value={password}
//                              onChange={(e) => setPassword(e.target.value)}
//                              className="w-full p-2 mb-3 border rounded"
//                              required
//                         />
//                         <button
//                             type="submit"
//                             className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
//                         >
//                             Login                            
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         );
//     };

//     export default Login;