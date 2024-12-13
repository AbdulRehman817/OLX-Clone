import React, { useState, useEffect } from "react";
import {
  auth,
  db,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  onAuthStateChanged,
} from "../../../FirebaseConfig/Firebase.js";

const Cards = (props) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const [userId, setUserId] = useState(null);

  // Fetch the authenticated user's UID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const toggleFavourite = async () => {
    if (!userId) {
      console.log("User not authenticated");
      return;
    }

    setIsFavourite(!isFavourite);

    if (!isFavourite) {
      try {
        const docRef = await addDoc(collection(db, "favourites"), {
          productId: userId,
          title: props.title,
          price: props.price,
          image: props.image,
        });
        console.log("Item added to favourites with ID: ", docRef.id);
      } catch (error) {
        console.error("Error adding to favourites: ", error);
      }
    } else {
      try {
        const favoritesRef = collection(db, "favourites");
        const q = query(favoritesRef, where("productId", "==", userId));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          console.log("No matching documents found to delete.");
          return;
        }
      } catch (error) {
        console.error("Error removing from favourites: ", error);
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={props.image}
          alt="Product"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{props.price}</h3>
          <button
            className={`rounded-full p-2 transition-colors ${
              isFavourite ? "bg-red-500 text-white" : "bg-gray-200 text-red-500"
            }`}
            onClick={toggleFavourite}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 mb-4">{props.title}</p>
      </div>
    </div>
  );
};

export default Cards;
