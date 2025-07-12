import React from "react";

const BookCard = ({ book }) => {
    const fallbackImage = "/fallback-cover.jpg";

    return (
        <div className="w-full bg-gray-100 rounded-lg overflow-hidden shadow-sm flex flex-col">
            {/* Image section with fixed aspect ratio */}
            <div className="aspect-[2/3] w-full overflow-hidden">
                <img
                    src={book.cover_image || fallbackImage}
                    alt={book.title}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => {
                        if (e.target.src !== fallbackImage) e.target.src = fallbackImage;
                    }}
                />
            </div>

            {/* Info section */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <h3 className="text-lg font-bold line-clamp-2">{book.title}</h3>
                <p className="text-md font-medium text-black-600">{book.author}</p>
                {/* <p className="text-sm text-gray-500">Genre: {book.genre}</p> */}
                <div className="text-sm text-gray-600 mt-2">
                    Genres:  {book.genre.map((genre,index) => (
                        <span key={genre.id} className="bg-orange-100 text-orange-700 px-2 py-1 mr-2 mb-4 rounded-full text-xs font-medium">
                            {genre.name} {index < book.genre.length -1 ? '':''}
                        </span>
                    ))}
                </div>
                <p className="text-sm text-yellow-500">Rating: {book.rating}⭐</p>
            </div>
        </div>
    );
};


export default BookCard;