//TODO Import necessary modules and components
import React, { useEffect, useState } from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
import Images from "./Images";
import Loader from "./Loader";

// Main functional component
const Main = () => {

  //TODO State hooks for managing text input, data, loading status, and pagination
  const [textInput, setTextInput] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  //TODO Function to fetch data from the Unsplash API
  const fetchData = async () => {
    const apiKey = "h74iSP-AtXI8T48VyMvIp895uR4mB48TA8PD5FeKzPo";
    const url = `https://api.unsplash.com/photos/?page=${page}&per_page=30&client_id=${apiKey}`;

    try {
      // Show loader while fetching data
      setLoading(true);

      // Fetch data from the API
      let response = await axios.get(url);

      // Update state with the fetched data
      setData((prev) => {
        let newData = [...prev, ...response.data];
        return newData;
      });
    } catch (error) {
      console.log("Fetch failure with", error);
    } finally {
      // Hide loader whether data is successfully fetched or not
      setLoading(false);
    }
  };

  //TODO Function to handle the scroll event and trigger pagination
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // User has scrolled to the bottom, fetch more data
      setPage((prevPage) => prevPage + 1);
    }
  };

  //TODO Effect hook to add and remove the scroll event listener
  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Remove event listener when the component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //TODO Effect hook to fetch data whenever the page changes
  useEffect(() => {
    fetchData();
  }, [page]);

  // JSX rendering of the main component
  return (
    <main>
      {/* Search bar component */}
      <Searchbar
        textInput={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />

      {/* Conditional rendering based on loading status */}
      {isLoading ? <Loader /> : <Images data={data} />}
    </main>
  );
};

// Export the Main component as the default export
export default Main;
