import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios';


const Booklist = () => {
  const [books, setBooks] = useState([]);
  const[nextPage, setNextPage] = useState(null);
  const[prevPage, setPrevPage] = useState(null);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const genre = searchParams.get("genre");

  const fetchBooks = async (url = "http://127.0.0.1:8000/api/books/") => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(url,{
        headers: {Authorization: `Bearer ${token}`},
        params: genre ? {genre} : {},
      });

      console.log("response object:", response)
      console.log("response.ok:", response.ok)

      const data = await response.data;
      setBooks(data.results);           // Use paginated results
      setNextPage(data.next);           // Set next and previous URLs
      setPrevPage(data.previous);
      setError(null);
      console.log("Fetched books: " ,data.results)
      console.log("Genre param: ", genre)

    } catch (error) {
      console.error("Error fetching books: ", error);
      setError("Failed to load books. Please try again.");
    }
  };
  
  useEffect(() => {
    fetchBooks();  // initial fetch
    // eslint-disable-next-line
  }, [genre]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-white to-yellow-50 px-4 py-12 flex justify-center items-center">
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-2xl p-8 w-full max-w-6xl border border-orange-200">
        <h2 className="text-3xl font-semibold text-orange-500 text-center mb-6 drop-shadow">
          All Books in Our Library
        </h2>

        {genre && (
          <div className="flex justify-end mb-4">
            <button 
            onClick={() => navigate("/books")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-medium shadow-sm"
            >
              Clear Filter
            </button>
          </div>
        )}

        {error ? (
          <p className="text-red-500 font-semibold text-center">{error}</p>
        ) : (
          <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {books.length > 0 ? (
              books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No books available right now.
              </p>
            )}
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button 
            onClick={() => fetchBooks(prevPage)}
            disabled={!prevPage}
            className={`px-4 py-2 rounded text-white font-semibold ${
              prevPage ? 'bg-orange-400 hover:bg-orange-500' : 'bg-gray-300 cursor-not-allowed'
            }`}>
              Previous
            </button>
            <button 
              onClick= {() => fetchBooks(nextPage)}
              disabled={!nextPage}
              className={`px-4 py-2 rounded text-white font-semibold ${ 
                nextPage ? 'bg-orange-400 hover:bg-orange-500' : 'bg-gray-300 cursor-not-allowed'
              }`}>
                Next
              </button>
          </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Booklist;
