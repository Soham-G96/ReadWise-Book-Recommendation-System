


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImage from '../assets/images/hero-img final.png'; // adjust path if needed
import './Landingpage.css'; // OPTIONAL: only if you still want custom tweaks

const LandingPage = () => {
  const navigate = useNavigate();

  const handleSignup = () => navigate('/signup');
  const handleLogin = () => navigate('/login');

  return (
    <div
      className="min-h-screen flex items-center justify-between px-10 md:px-20 bg-[#fdfcf9] transition-all duration-700 ease-in"
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor:"#fefef9",
      }}
    >
      {/* Text Section */}
      <motion.div
        className="flex-1 max-w-xl px-4 md:px-0 mb-12 md:mb-0"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
      <div className="flex-1 max-w-xl animate-fadeIn">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight drop-shadow-sm">
          Discover Your Next Favorite Book 📚
        </h1>
        <p className="text-lg text-gray-600 mb-8">
            Personalized AI-powered recommendations just for you. Find books based on your mood, preferences and past reads.
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleSignup}
            className="bg-orange-500 text-white py-2 px-6 rounded-md hover:bg-orange-600 transition-all duration-300"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogin}
            className="border border-orange-500 text-orange-500 py-2 px-6 rounded-md hover:bg-orange-50 transition-all duration-300"
          >
            Log In
          </button>
        </div>
      </div>
      </motion.div>

      {/* Hero Image Section */}
      <div className="flex-1 hidden md:flex justify-end animate-fadeInSlow">
        <img
          src={heroImage}
          alt="Book recommendation illustration"
          className="w-full max-w-[900px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default LandingPage;









// // LandingPage.js
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import heroIllustration from "../assets/images/hero-img final.png"; // update the path if needed

// const LandingPage = () => {
//     return (
//         <div className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-tr from-purple-100 via-white to-blue-100 px-6 md:px-20 py-12">

//             {/* Left Side: Text & CTA */}
//             <motion.div
//                 className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//             >
//                 <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6 drop-shadow-md">
//                     Discover Books You’ll <span className="text-indigo-600">Love</span>
//                 </h1>
//                 <p className="text-lg text-gray-600 mb-8 max-w-md">
//                     Get smart, personalized book recommendations powered by AI. Rate, review, and build your ideal reading list.
//                 </p>

//                 <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//                     <Link to="/signup">
//                         <button className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 shadow-md transition duration-300">
//                             Get Started
//                         </button>
//                     </Link>
//                     <Link to="/login">
//                         <button className="px-6 py-3 rounded-lg border border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-50 shadow-md transition duration-300">
//                             Log In
//                         </button>
//                     </Link>
//                 </div>
//             </motion.div>

//             {/* Right Side: Hero Image */}
//             <motion.div
//                 className="md:w-1/2 flex justify-center"
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//             >
//                 <img
//                     src={heroIllustration}
//                     alt="Book recommendation landing illustration"
//                     className="w-full max-w-md md:max-w-lg rounded-xl shadow-xl"
//                 />
//             </motion.div>
//         </div>
//     );
// };

// export default LandingPage;



















// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import heroImg from "../assets/images/hero-img final.png"; // adjust if placed differently

// const LandingPage = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center px-4" >
//       <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
//         {/* Left: Illustration */}
//         <motion.img
//           src={heroImg}
//           alt="Reading books"
//           className="w-full h-auto"
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//         />

//         {/* Right: Content Card */}
//         <motion.div
//           className="backdrop-blur-xl bg-white/20 border border-white/10 rounded-3xl shadow-xl p-8 md:p-12 text-center md:text-left"
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
//             Discover Your Next Favorite Book
//           </h1>
//           <p className="text-gray-700 text-base md:text-lg mb-6">
//             Get personalized book recommendations powered by AI. Rate books, explore genres, and build your own reading journey.
//           </p>
//           <div className="flex justify-center md:justify-start gap-4">
//             <Link to="/signup">
//               <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-md transition">
//                 Sign Up
//               </button>
//             </Link>
//             <Link to="/login">
//               <button className="px-6 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full transition">
//                 Log In
//               </button>
//             </Link>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;









// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import heroImg from "../assets/images/hero-img.png";

// const LandingPage = () => {
//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-800">
//             <div className="w-full max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//                 <motion.div
//                 className="flex justify-center"
//                 initial={{ opacity:0, x: -50}}
//                 animate={{ opacity:1, x:0 }}
//                 transition={{ duration:0.6 }}
//                 >
//                     <img 
//                     src={heroImg}
//                     alt="Book Recommendation Illustration"
//                     className="w-full max-w-md md:max-w-full drop-shadow-xl"
//                     />
//                 </motion.div>
//                 <motion.div 
//                 className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-center md:text-left"
//                 initial={{ opacity:0, x:50 }}
//                 animate={{ opacity:1, x:0 }}
//                 transition={{ duration:0.6 }}
//                 >
//                     <h1 className="text-4xl font-extrabold leading-tight mb-4">
//                         Discover your Next Favorite Book
//                     </h1>
//                     <p className="text-gray-600 text-lg mb-6">
//                         Get personalized book recommendations powered by AI. Rate books, explore genres, and build your own reading journey.
//                         Personalized AI-powered recommendations just for you. Find books based on your mood, preferences and past reads.
//                     </p>

//                     <div className="flex flex-col md:flex-row items-center gap-4">
//                         <Link 
//                         to="/signup"
//                         className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-all"
//                         >
//                             Log In
//                         </Link>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default LandingPage;






// theme: {
//     extend: {
//       colors: {
//         brand: {
//           primary: "#7C3AED", // Indigo
//           accent: "#F472B6",  // Pink
//           background: "#F9FAFB",
//         },
//       },
//     },
//   },
  
