import React, {useEffect, useState} from "react";
import axios from "axios"

const UserReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null); // contains the full review object being edited
    const [editedContent, setEditedContent] = useState({rating:1, review_text:""});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const token = localStorage.getItem("accessToken");

    const fetchReviews = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/books/all_reviews/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReviews(response.data.results);  // Assuming paginated data
            console.log("data - ", response.data.results)
        } catch (err) {
            console.error("Error fetching reviews:", err);
            setError("Failed to load your reviews.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [token]);

    const getSentimentColor = (score) => {
        if (score > 0.3) return "text-green-600";
        if (score < -0.3) return "text-red-500";
        return "text-gray-600";
    };

    const handleEditClick = (review) => {
        setEditingReview(review);
        setEditedContent({ rating: review.rating, review_text: review.review_text });
        setShowModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedContent((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async () => {
        try {
            console.log("Book - ", editingReview.book," book id", editingReview.book.id)
            await axios.put(
                `http://127.0.0.1:8000/api/books/${editingReview.book.id}/reviews/my/`,
                editedContent,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setShowModal(false);
            setEditingReview(null);
            fetchReviews(); // Re-fetch all reviews
        } catch (err) {
            console.error("Failed to update review:", err);
            alert("Something went wrong while updating your review.");
        }
    };

    const handleDelete = async (bookId) => {
        const confirmed = window.confirm("Are you sure you want to delete this review?");
        if (!confirmed) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/reviews/my/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setReviews((prev) => prev.filter((review) => review.book.id !== bookId));
        } catch (err) {
            console.error("Failed to delete review:", err);
        }
    };

    if (loading) return <p className="text-center py-8">Loading your reviews...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gradient-to-tr from-orange-50 via-white to-yellow-50 px-6 py-12">
            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center drop-shadow">
                    Your Book Reviews
                </h2>

                {reviews.length === 0 ? (
                    <p className="text-gray-500 text-center">You haven't reviewed any books yet.</p>
                ) : (
                    <ul className="space-y-6">
                        {reviews.map((review) => (
                            <li key={review.id} className="bg-white shadow-md border-l-4 border-orange-400 rounded-md p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-bold text-orange-700">{review.book.title}</h3>
                                        <h4 className="text-sm text-gray-500 italic">by {review.book.author}</h4>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <span className="text-yellow-500 font-semibold">Rating: {review.rating}/5</span>
                                        <span className="text-yellow-500">★</span>
                                    </div>
                                </div>

                                <p className="mt-4 text-gray-700">{review.review_text}</p>

                                <p className={`mt-2 text-sm font-medium ${getSentimentColor(review.sentiment_score)}`}>
                                    AI Sentiment Score: {review.sentiment_score.toFixed(2)}
                                </p>
                                
                                <div className="mt-4 flex space-x-4">
                                    <button
                                        onClick={() => handleEditClick(review)}
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(review.book.id)}
                                        className="text-sm text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
                        <h3 className="text-xl font-semibold text-orange-600">Edit Review</h3>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Rating:</label>
                            <select
                                name="rating"
                                value={editedContent.rating}
                                onChange={handleEditChange}
                                className="w-full border rounded px-2 py-1"
                            >
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <option key={num} value={num}>{num} Stars</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Review Text:</label>
                            <textarea
                                name="review_text"
                                value={editedContent.review_text}
                                onChange={handleEditChange}
                                rows={4}
                                className="w-full border rounded px-2 py-1"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSubmit}
                                className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserReviews;

//     useEffect(() => {
//         const fetchReviews = async () => {
//             try {
//                 const response = await axios.get("http://127.0.0.1:8000/api/books/all_reviews/", {
//                     headers: {Authorization: `Bearer ${token}` },
//                 });
//                 console.log("Hello", response.data.results)
//                 // if (!response.data.ok) throw new Error("Failed to fetch reviews");
//                 // const data = await response.json();
//                 console.log(" reviews - ", response)
//                 setReviews(response.data.results);
//             }
//             catch (err) {
//                 if (err.response){
//                     console.error("Backend responded with error", err.response.status, err.response.data)
//                 } else if ( err.request) {
//                     console.error("Request made but no response received", err.request);
//                 } else {
//                     console.error("Error setting up request:", err.message);
//                 }
//                 setError("Failed to load your reviews.");
//                 console.error(err);
//             }
//             finally {
//                 setLoading(false);
//             }
//         };

//         fetchReviews();
//     }, [token]);

//     const handleEditClick = (review) => {
//         setEditingReviewId(review.id);
//         setEditedReview({rating: review.rating, review_text: review.review_text })
//     };

//     const handleCancelEdit = () => {
//         setEditingReviewId(null);
//         setEditedReview({rating:1, review_text:"" })
//     };
    
//     const handleEditChange = (e) => {
//         const { name, value } = e.target;
//         setEditedReview((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleEditSubmit = async (bookId) => {
//         try {
//             console.log("bookid: ",bookId)
//             await axios.put(`http://127.0.0.1:8000/api/books/${bookId}/reviews/my/`, editedReview, {
//                 headers: {Authorization: `Bearer ${token}` },
//             });
//             // Refresh reviews
//             const response = await axios.get(`http://127.0.0.1:8000/api/books/${bookId}/reviews/`, {
//                 headers: { Authorization: `Bearer ${token}`},
//             });
//             console.log("Edited response", response.data.results)
//             setReviews(response.data.results);
//             setEditingReviewId(null)
//         } catch (err) {
//             console.error("Failed to update review: ", err);
//         }
//     };

//     const handleDelete = async (bookId) => {
//         const confirmed = window.confirm(" Are you sure you want to delete this review? ");
//         if (!confirmed) return;

//         try {
//             await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/reviews/my/`, {
//                 headers:{ Authorization: `Bearer ${token}`},
//             });
//             // Remove from state without refetch
//             setReviews((prev) => prev.filter((review) => review.book !== bookId));
//         } catch (err) {
//             console.error(" Failed to delete review: ", err);
//         }
//     };

//     if (loading) return <p className="text-center py-8">Loading your reviews...</p>;
//     if (error) return <p className="text-center text-red-500">{error}</p>;

//     // const getSentimentColor = (score) => {
//     //     if (score > 0.3) return "text-green-600";
//     //     if (score < -0.3) return "text-red-500";
//     //     return "text-gray-600";
//     // };

//     return (
//         <div className="min-h screen bg-gradient-to-tr from-orange-50 via-white to-yellow-50 px-6 py-12">
//             <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
//                 <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center drop-shadow">
//                     Your Book Reviews
//                 </h2>
                
//                 {reviews.length === 0 ? (
//                     <p className="text-gray-500 text-center"> You haven't reviewed any books yet. </p>
//                 ) : ( 
//                     <ul className="space-y-6">
//                         {reviews.map((review) => (
//                             <li key={review.id} className="border border-orange-200 rounded-lg p-4 shadow-sm bg-white">
//                                 <h3 className="text-lg font-semibold text-orange-700"> {review.book.title} </h3>

//                                 {editingReviewId === review.id ? (
//                                     <>
//                                     <div className="mt-2 space-y-2">
//                                         <label className="block text-sm font-medium text-gray-600"> Rating:</label>
//                                         <select 
//                                         name="rating"
//                                         value={editedReview.rating}
//                                         onChange={handleEditChange}
//                                         className="border rounded px-2 py-1"
//                                         >
//                                             {[1,2,3,4,5].map((num) => (
//                                                 <option key={num} value={num}>{num} Stars</option>
//                                             ))}
//                                         </select>
//                                         <label className="block text-sm font-medium text-gray-600">Review:</label>
//                                         <textarea 
//                                         name="review_text"
//                                         value={editedReview.review_text}
//                                         onChange={handleEditChange}
//                                         rows={3}
//                                         className="w-full border rounded px-2 py-1"
//                                         />
//                                     </div>

//                                     <div className="mt-4 flex gap-3">
//                                         <button name= {(review.book.id)} value={(review.book.id)}
//                                         onClick={() => handleEditSubmit(review.book)}
//                                         className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600">
//                                             Save
//                                         </button>
//                                         <button 
//                                         onClick={handleCancelEdit}
//                                         className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
//                                         >Cancel 
//                                         </button>
//                                     </div>
//                                     </>
//                                 ): ( 
//                                     <>
//                                     <p className="text-sm text-gray-700 mt-1">
//                                         <strong>Rating:</strong> {review.rating} /5
//                                     </p>
//                                     <p className="text-sm text-gray-600 italic">
//                                         AI Sentiment Score: {review.sentiment_score.toFixed(2)}
//                                     </p>
//                                     <p className="text-gray-800 mt-2"> {review.review_text}</p>

//                                     <div className="mt-3 flex gap-3">
//                                         <button 
//                                         onClick={() => handleEditClick(review)} name={review.book}
//                                         className="text-sm text-orange-500 hover:underline">
//                                             Edit
//                                         </button>
//                                         <button 
//                                         onClick={() => handleDelete(review.book)}
//                                         className="text-sm text-red-500 hover:underline">
//                                             Delete
//                                         </button>
//                                     </div>
//                                     </>
//                                 )}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//         // <div 
//         // className="min-h-screen px-6 py-12 flex justify-center items-start bg-gradient-to-tr from-orange-100 via-white to-yellow-100"
//         // style={{
//         //     backgroundImage: "url('/Book stack.jpg')",
//         //     backgroundSize: "cover",
//         //     backgroundPosition: "center",
//         // }}
//         // >
//         //     <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-xl p-8 w-full max-w-5xl border border-orange-200">
//         //     <h2 className="text-3xl font-bold text-center mb-8 text-orange-700 drop-shadow">
//         //         What readers are Saying
//         //     </h2>
            
//         //     {loading ? ( 
//         //         <p className="text-center text-gray-600"> Loading reviews... </p>
//         //     ) : error ? (
//         //         <p className="text-center text-red-500 font-semibold">{error}</p>
//         //     ) : reviews.length > 0 ? (
//         //         <div className="space-y-6">
//         //             {reviews.map((review) => (
//         //                 <div 
//         //                 key={review.id}
//         //                 className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
//         //                 <div className=" flex justify-between items-center mb-2">
//         //                     <p className="font-semibold text-gray-800">{review.user} </p>
//         //                     <span className="text-yellow-500 font-bold">
//         //                         {review.rating} ★
//         //                     </span>
//         //                 </div>
//         //                 <p className="text-gray-700 italic mb-2">
//         //                     "{review.review_text}"
//         //                 </p>
//         //                 <p className="text-sm">
//         //                     AI Sentiment Score:
//         //                     <span 
//         //                     className={`ml-1 font-semibold ${getSentimentColor(review.sentiment_score)}`}>
//         //                         {review.sentiment_score.toFixed(2)}
//         //                     </span>
//         //                 </p>
//         //                 </div>
//         //             ))}
//         //             </div>
//         //     ) : ( 
//         //         <p className="text-center text-gray-500"> No reviews available.</p>
//         //     )}
//         //     </div>
//         // </div>
//     );
// };

// export default UserReviews;