import React from "react";

const ProductCard = ({
  image,
  price,
  title,
  location,
  time,
  onCall,
  onChat,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4 flex items-center space-x-4">
      {/* Product Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-24 h-24 object-cover rounded-md"
        />
        <span className="absolute top-2 left-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">
          Featured
        </span>
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{price}</h2>
        <p className="text-sm text-gray-600 truncate">{title}</p>
        <p className="text-sm text-gray-500">
          {location} • {time}
        </p>
        <div className="mt-2 flex space-x-2">
          {/* Call Button */}
          <button
            onClick={onCall}
            className="flex items-center space-x-1 px-4 py-2 text-[#002f34] bg-white border-2 border-[#002f34] border-solid rounded hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10l1.342 3.806a1 1 0 00.858.642L9.8 15.2a1 1 0 01.7.96v4.72a1 1 0 001 1h4a1 1 0 001-1v-4.72a1 1 0 01.7-.96l4.6-.752a1 1 0 00.858-.642L21 10"
              />
            </svg>
            <span>Call</span>
          </button>
          {/* Chat Button */}
          <button
            onClick={onChat}
            className="flex items-center space-x-1 px-4 py-2 bg-[#002f34] text-white rounded hover:bg-green-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h8m-8 4h5m-5-8h8a2 2 0 012 2v10l-4-3H8a2 2 0 01-2-2V8a2 2 0 012-2z"
              />
            </svg>
            <span>Chat</span>
          </button>
        </div>
      </div>

      {/* Favorite Icon */}
      <div>
        <button className="text-gray-400 hover:text-red-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.121 21a3 3 0 01-2.12-.879L2 20m3.121 1a5 5 0 01-.672-.778A5 5 0 012 18.658M19 10.2A5 5 0 0120 15.2c0 2.172-.894 3.982-2.537 5.446m.978-11.006L17 7m2 3.4l-5 5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
