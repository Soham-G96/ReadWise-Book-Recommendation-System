import React, { useEffect, useState, useMemo } from "react";
import BookCard from "../components/BookCard";


const Recommendations = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const randomCatchphrase = useMemo(() => {
    const catchphrases = [
      {
        title: "Even the best libraries start with an empty shelf.",
        subtext: "Pick a few genres to help us build your reading journey.",
      },
      {
        title: "No matches yet – maybe it’s time to try something new?",
        subtext: "Tweak your preferences and discover hidden gems.",
      },
      {
        title: "Your next great read is still out there!",
        subtext: "Help us narrow it down by selecting your favorite genres.",
      },
      {
        title: "No recommendations... but the story isn’t over!",
        subtext: "Refine your preferences to turn the page.",
      },
      {
        title: "A blank page today, a bestseller tomorrow!",
        subtext: "Start by telling us what you love to read.",
      },
      {
        title: "Our book elves found nothing.",
        subtext: "Add more genres to wake up their magic!",
      },
      {
        title: "Your bookshelf is feeling shy.",
        subtext: "Pick some genres to break the ice.",
      },
      {
        title: "No stories to tell... yet.",
        subtext: "Share your reading taste to get personalized picks.",
      },
      {
        title: "Our AI librarian needs more clues.",
        subtext: "Tell us what genres you enjoy and we’ll do the rest.",
      },
      {
        title: "We’re all out of book magic for now...",
        subtext: "Fuel the algorithm with your favorite themes.",
      },
      {
        title: "Plot twist! We couldn’t find a match.",
        subtext: "Try expanding or tweaking your genre list.",
      },
      {
        title: "Our shelves are full...",
        subtext: "...but we need *you* to guide the curation.",
      },
      {
        title: "No book sparks flying just yet.",
        subtext: "Choose your genres and let the romance begin!",
      },
    
    ];
  return catchphrases[Math.floor(Math.random() * catchphrases.length)];
  }, []);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // Retrieve the auth token
        const response = await fetch("http://127.0.0.1:8000/api/recommendations/", {
          headers: { "Authorization": `Bearer ${token}`},
        });
        if (response.ok){
          const data = await response.json();
          setBooks(data);
          setError(null); // Reset error if successful
        } else {
          throw new Error(`Error:${response.status}  ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Failed to load recommendations. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-orange-100 via-white to-yellow-50 px-4 py-12 flex justify-center items-center"
    >
    <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-2xl p-8 w-full max-w-6xl border border-orange-200 bg-gradient-to-tr from-orange-100 via-white to-yellow-50">
      <h2 className="text-3xl font-semibold text-orange-500 text-center mb-6 drop-shadow">
        Recommended Books
      </h2>
      {error ? (
        <p className="text-2xl text-red-500 font-semibold text-center">{error}</p>
      ) :loading ? (
        <p className="text-center text-gray-600">Loading recommendations...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.length > 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <div className="text-center col-span-full mt-6 ">
              <h2 className="text-2xl font-semibold text-orange-500 mb-2 text-center">
              {randomCatchphrase.title}
              </h2>
              <p className="text-gray-600 text-center max-w-md mx-auto">
                {randomCatchphrase.subtext}
              </p>
              {/* Add a "Go to Preferences" button here later */} 
            </div>           
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default Recommendations;
