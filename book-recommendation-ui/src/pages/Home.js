import React, {useEffect, useState} from "react";
import axios from "axios";
import Bookcard from "../components/BookCard"; 
import {Link} from "react-router-dom";

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [trendingGenres, setTrendingGenres] = useState([]);
  
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    // Fetch all sections 
    fetchFeaturedBooks();
    fetchRecommendedBooks();
    fetchTrendingGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFeaturedBooks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/books/featured/", {
        headers: {Authorization:`Bearer ${token}`},
      });
      setFeaturedBooks(res.data);
    } catch (err) {
      console.error("Error fetching featured books:", err);
    }
  };

  const fetchRecommendedBooks = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/recommendations/", {
        headers: {Authorization:`Bearer ${token}`},
      });
      console.log("recommended API response:", res.data.results)
      const booksArray = Array.isArray(res.data.results)
            ? res.data.results
            : res.data;
      setRecommendedBooks(booksArray);
    } catch (err) {
      console.error("Error fetching recommended books:", err);
    }
  };

  const fetchTrendingGenres = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/genres/trending/", {
        headers: {Authorization:`Bearer ${token}`},
      });
      setTrendingGenres(res.data);
    } catch (err) {
      console.error("Error fetching trending genres:", err);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 text-gray-800">
      
      {/* 🎯 Hero Section */}
      <div className="text-center py-16 bg-orange-100 shadow-inner">
        <h1 className="text-4xl font-bold text-orange-600 drop-shadow">
          Find Your Next Favorite Book 📚
        </h1>
        <p className="mt-2 text-lg text-gray-700">
          Smart recommendations tailored to your taste.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Link to="/books" className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600">
            Start Exploring
          </Link>
          <Link to="/setup-preferences" className="bg-white border border-orange-500 text-orange-500 px-5 py-2 rounded hover:bg-orange-100">
            Set Preferences
          </Link>
        </div>
      </div>

      {/* ✨ Featured Books */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">🌟 Featured Books</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {featuredBooks.map((book) => (
            <Bookcard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 📖 Recommended for You */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">📖 Recommended for You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recommendedBooks.map((book) => (
            <Bookcard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 🔥 Trending Genres */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">🔥 Trending Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingGenres.map((genre) => (
            <Link
              to={`/books/?genre=${encodeURIComponent(genre.name)}`}
              key={genre.id}
              className="bg-orange-100 rounded-lg p-4 text-center hover:bg-orange-200 transition-all"
            >
              <p className="font-semibold text-orange-700">{genre.name}</p>
              <p className="text-sm text-gray-600">{genre.review_count} books</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer CTA Cards */}
      <section className="bg-white py-12 border-t border-orange-200">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
          <Link to="/write-review" className="bg-orange-50 hover:bg-orange-100 p-4 rounded shadow text-center">
            ✍️ <p className="font-semibold mt-2">Write a Review</p>
          </Link>
          <Link to="/books" className="bg-orange-50 hover:bg-orange-100 p-4 rounded shadow text-center">
            🔍 <p className="font-semibold mt-2">Explore Genres</p>
          </Link>
          <Link to="/user-reviews" className="bg-orange-50 hover:bg-orange-100 p-4 rounded shadow text-center">
            🧠 <p className="font-semibold mt-2">See What Others Think</p>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
