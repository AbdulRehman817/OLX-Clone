import React from "react";
import { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import axios from "axios";

const Allcards = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        console.log(res.data);
        setData(res.data); // Access the `data` property of the response
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex ml-10 flex-wrap gap-20 mt-10">
      {data ? (
        data.map((item, index) => (
          <Cards
            key={index} // Add a unique key for each item in the list src=
            image={item.image}
            title={item.title}
            description={item.description}
            price={item.price}
            category={item.category}
            // price={item.price}
            // id={item.id}
          ></Cards>
        ))
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default Allcards;
