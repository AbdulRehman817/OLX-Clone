// import React, { useState, useEffect } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth, db } from "../../../FirebaseConfig/Firebase.js";
// import { collection, getDocs, query, where } from "firebase/firestore";
// import Cards from "../Cards/Cards";

// const Favourites = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isFavourite, setIsFavourite] = useState(true);

//   useEffect(() => {
//     console.log("Checking user authentication...");
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user) {
//         console.log("User logged in:", user.uid);
//         fetchFavourites(user.uid);
//       } else {
//         console.log("No user logged in.");
//         setProducts([]);
//         setLoading(false);
//       }
//     });

//     return () => unsubscribe();
//   }, []);

//   const toggleFavourite = async (productId) => {
//     try {
//       console.log("Toggling favourite for product:", productId);

//       // Remove the favourite from Firestore
//       const favouriteDocRef = doc(db, "favourites", productId);
//       await deleteDoc(favouriteDocRef);

//       // Update the UI state
//       setProducts((prevProducts) =>
//         prevProducts.filter((product) => product.id !== productId)
//       );

//       console.log("Favourite removed successfully.");
//     } catch (error) {
//       console.error("Error removing favourite:", error);
//     }
//   };
//   const fetchFavourites = async (userId) => {
//     console.log("Fetching favourites for user:", userId);
//     setLoading(true);
//     try {
//       const favouritesRef = collection(db, "favourites");
//       const q = query(favouritesRef);
//       const querySnapshot = await getDocs(q);

//       const productsArray = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       console.log("Fetched favourites:", productsArray);
//       setProducts(productsArray);
//     } catch (error) {
//       console.error("Error fetching favourites:", error);
//     } finally {
//       setLoading(false);
//       console.log("Finished fetching favourites.");
//     }
//   };

//   return (
//     <div className="bg-white">
//       {loading ? (
//         <p className="text-center text-xl">Loading...</p>
//       ) : products.length > 0 ? (
//         <div className="flex flex-wrap gap-10">
//           {products.map((item) => (
//             <div className="max-w-sm mx-auto mt-10 shadow-lg rounded-lg overflow-hidden">
//               <div className="relative">
//                 <img
//                   src={item.image}
//                   alt="Product"
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
//               </div>
//               <div className="p-4">
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="text-lg font-semibold text-gray-800">
//                     {item.price}
//                   </h3>
//                   <button
//                     className={`rounded-full p-2 transition-colors ${
//                       isFavourite
//                         ? "bg-red-500 text-white"
//                         : "bg-gray-200 text-red-500"
//                     }`}
//                     onClick={() => toggleFavourite(item.id)}
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                     >
//                       <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
//                     </svg>
//                   </button>
//                 </div>
//                 <p className="text-gray-600 mb-4">{item.title}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-xl">No favourites found.</p>
//       )}
//     </div>
//   );
// };

// export default Favourites;

import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../FirebaseConfig/Firebase.js";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Cards from "../Cards/Cards";

const Favourites = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(true);

  useEffect(() => {
    console.log("Checking user authentication...");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in:", user.uid);
        fetchFavourites(user.uid);
      } else {
        console.log("No user logged in.");
        setProducts([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchFavourites = async (userId) => {
    console.log("Fetching favourites for user:", userId);
    setLoading(true);
    try {
      const favouritesRef = collection(db, "favourites");
      const q = query(favouritesRef);
      const querySnapshot = await getDocs(q);

      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched favourites:", productsArray);
      setProducts(productsArray);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    } finally {
      setLoading(false);
      console.log("Finished fetching favourites.");
    }
  };

  const toggleFavourite = async (productId) => {
    try {
      await deleteDoc(doc(db, "favourites", productId));
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner text-info w-28"></span>
        </div>
      ) : products.length > 0 ? (
        <div className="flex flex-wrap gap-10">
          {products.map((item) => (
            <div
              key={item.id}
              className="max-w-sm mx-auto mt-10 shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt="Product"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.price}
                  </h3>
                  <button
                    className={`rounded-full p-2 transition-colors ${
                      isFavourite
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-red-500"
                    }`}
                    onClick={() => toggleFavourite(item.id)}
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
                <p className="text-gray-600 mb-4">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl">No favourites found.</p>
      )}
    </div>
  );
};

export default Favourites;
