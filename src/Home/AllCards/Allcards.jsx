// import React from "react";
// import { useState, useEffect } from "react";
// import Cards from "../Cards/Cards";
// import axios from "axios";

// const Allcards = () => {
//   const [data, setData] = useState();

//   useEffect(() => {
//     axios
//       .get("https://fakestoreapi.com/products")
//       .then((res) => {
//         console.log(res.data);
//         setData(res.data); // Access the `data` property of the response
//       })
//       .catch((error) => console.log(error));
//   }, []);
//   return (
//     <div className="flex ml-10 flex-wrap gap-20 mt-10">
//       {data ? (
//         data.map((item, index) => (
//           <Cards
//             key={index} // Add a unique key for each item in the list src=
//             image={item.image}
//             title={item.title}
//             description={item.description}
//             price={item.price}
//             category={item.category}
//             // price={item.price}
//             // id={item.id}
//           ></Cards>
//         ))
//       ) : (
//         <p>loading</p>
//       )}
//     </div>
//   );
// };

// export default Allcards;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cards from "../Cards/Cards";
import axios from "axios";

const Allcards = () => {
  const [data, setData] = useState([]);
  const [visibleItems, setVisibleItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        const groupedData = res.data.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {});
        setData(groupedData);
        const initialVisibleItems = Object.keys(groupedData).reduce(
          (acc, category) => {
            acc[category] = 3;
            return acc;
          },
          {}
        );
        setVisibleItems(initialVisibleItems);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleViewMore = (category) => {
    navigate(`/category/${encodeURIComponent(category)}`); // Navigate to the category page
  };

  return (
    <div className="flex flex-col ml-10 mt-10 gap-20">
      {Object.keys(data).length > 0 ? (
        Object.entries(data).map(([category, items]) => (
          <div key={category} className="mb-10">
            <h2 className="text-xl font-bold mb-5">{category}</h2>
            <div className="flex flex-wrap gap-10">
              {items.slice(0, visibleItems[category]).map((item) => (
                <Cards
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  category={item.category}
                />
              ))}
            </div>
            <button
              className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => handleViewMore(category)}
            >
              View More
            </button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Allcards;
