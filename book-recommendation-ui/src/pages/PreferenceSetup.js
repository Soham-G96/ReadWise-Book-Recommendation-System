import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const PreferenceSetup = () => {
    const navigate = useNavigate();
    const [tokenValid, setTokenValid] = useState(false);
    const token = localStorage.getItem('accessToken');
    const[genres, setGenres] = useState([]);
    const[selectedGenres, setSelectedGenres] = useState([]);
    const[loading, setLoading] = useState(true);

    // Step 1: Validate token
    useEffect (() => {
        if (!token) {
            navigate('/login');
            return;
        }

        axios.get('http://127.0.0.1:8000/api/users/auth/', {
            headers: {Authorization: `Bearer ${token}`},
        })
        .then(() => setTokenValid(true))
        .catch(()=> navigate('/login'));
    },[token, navigate]);

    // Step 2: Check if preferences already exist
    useEffect(() => {
        if (!tokenValid) return;

        axios.get('http://127.0.0.1:8000/api/preferences/', {
            headers:{Authorization:`Bearer ${token}`},
        })
        .then((res) => {
            console.log("Res- ", res.data.preferred_genres)
            if(res.data.preferred_genres && res.data.preferred_genres.length > 0) {
                // User already has preferences -> Then redirect
                navigate('/home');
            } else {
                // User has no preferences -> Then fetch genres for setup
                axios.get('http://127.0.0.1:8000/api/genres/', {
                    headers:{ Authorization:`Bearer ${token}`},
                })
                .then(res => {
                    console.log("Genres map shape:",res.data)
                    setGenres(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Genre fetch error: ", err);
                });
            }
        })
        .catch((err) => {
            console.error("Error checking perferences: ", err);
        });
    },[tokenValid,token, navigate]);


    const handleGenreClick = (genreId) => {
        if (selectedGenres.includes(genreId)) {
            setSelectedGenres(selectedGenres.filter(id => id !== genreId));
        } else {
            setSelectedGenres([...selectedGenres, genreId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting", selectedGenres);
        console.log("Payload: ", {preferred_genres_ids: selectedGenres});
        axios.put('http://127.0.0.1:8000/api/preferences/', {
            preferred_genres_ids: selectedGenres,
            read_books: []
        }, {
            headers:{Authorization:`Bearer ${token}`},
        })
        .then(() => {
            navigate('/home');
        })
        .catch(err => {
            console.error(" Error saving preferences: ", err);
        });
    };

    if (loading) return <div className="text-center py-10"> Loading....</div>;

    return (
    <div className="bg-origin-padding p-10 relative bg-cover bg-center bg-no-repeat min-h-screen flex items-center justify-center px-4"
         style={{
            backgroundImage: "url('/Book-stack.jpg')",
         }}
    >
        {/* <div className="absolute inset-0 bg-black/5 backdrop-blur-sm z-0" /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 via-white/5 to-yellow-100/30 backdrop-blur-sm z-0" />

        {/* <div className="absolute inset-0 bg-gradient-radial from-orange-100 via-transparent to-white opacity-40 pointer-events-none" /> */}
        {/* <div className="bg-transparent backdrop-blur-md shadow-2xl rounded-xl p-10 w-full max-w-4xl border border-orange-200 relative"> */}
        <div className="relative z-10 bg-transparent backdrop-blur-md shadow-2xl rounded-xl p-10 w-full max-w-4xl border border-orange-200">
        <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 rounded-t-xl" />
        <h2 className="text-3xl font-extrabold text-center mb-8 text-orange-700 drop-shadow">
            Genres
        </h2>
        <p className="text-xl text-center text-gray-600 mb-6 max-w-md mx-auto">
        Select a few genres you love so we can recommend books you'll actually enjoy 📖✨
        </p>
        {/* <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-0"></div> */}
        <form onSubmit={handleSubmit} className='space-y-8'>
            <div className='flex flex-wrap gap-4 mb-8 justify-center'>
                {genres.map((genre) => (
                    <button type='button'
                            key={genre.id}
                            onClick={() => handleGenreClick(Number(genre.id))}
                            className={`px-4 py-2 rounded-full border font-medium shadow-sm transform transition-all duration-200 ${
                                selectedGenres.includes(genre.id)
                                ? 'bg-orange-500 text-white border-orange-600 scale-105 shadow-md'
                                : 'bg-white text-gray-800 border-gray-300 hover:bg-orange-100 hover:scale-105'
                            }`}
                            >
                            {genre.name}
                    </button>

                ))}
            </div>
            <button type='submit'
                    className='w-full bg-orange-400 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-orange-600 transition-all shadow-md'>
                        Save Preferences
            </button>
        </form>
        
        </div>
    </div>
  );
};

export default PreferenceSetup