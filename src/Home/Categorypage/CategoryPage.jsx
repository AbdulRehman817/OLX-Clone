// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Cards from "../Cards/Cards";

// const CategoryPage = () => {
//   const { category } = useParams(); // Get category from route
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://fakestoreapi.com/products")
//       .then((res) => {
//         // Filter products of the specific category
//         const filteredProducts = res.data.filter(
//           (item) => item.category === category
//         );
//         setProducts(filteredProducts);
//       })
//       .catch((error) => console.log(error));
//   }, [category]);

//   return (
//     <div className="flex flex-wrap gap-10 ml-10 mt-10">
//       <h1 className="text-2xl font-bold mb-5">Products in "{category}"</h1>
//       {products.length > 0 ? (
//         products.map((item) => (
//           <Cards
//             key={item.id}
//             image={item.image}
//             title={item.title}
//             description={item.description}
//             price={item.price}
//             category={item.category}
//           />
//         ))
//       ) : (
//         <p>No products found in this category.</p>
//       )}
//     </div>
//   );
// };

// export default CategoryPage;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const CategoryPage = () => {
  const { category } = useParams(); // Get category from route
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        // Filter products of the specific category
        const filteredProducts = res.data.filter(
          (item) => item.category === category
        );
        setProducts(filteredProducts);
      })
      .catch((error) => console.log(error));
  }, [category]);

  const handleCall = () => {
    alert("Call button clicked!");
  };

  const handleChat = () => {
    alert("Chat button clicked!");
  };

  return (
    <div className="flex flex-col flex-wrap gap-10 ml-10 mt-10 bg-white">
      <h1 className="text-2xl font-bold mb-5">Products in "{category}"</h1>
      {products.length > 0 ? (
        products.map((item) => (
          <ProductCard
            key={item.id}
            image={item.image}
            price={`$${item.price}`}
            title={item.title}
            location="Unknown Location" // Replace with real data if available
            time="Just now" // Replace with real data if available
            onCall={handleCall}
            onChat={handleChat}
          />
        ))
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
