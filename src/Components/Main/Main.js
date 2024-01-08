//TODO Import necessary modules and components
import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const apiKey = "l7kTxXTSka2MaaMbu5pxJEXd81sho8CYoCCZFRXTCFE";

  //TODO Function to fetch data from the Unsplash API
  const fetchData = async () => {
    const url = `https://api.unsplash.com/photos/?page=${page}&per_page=30&client_id=${apiKey}`;

    try {
      // Show loader while fetching data
      setLoading(true);

      // Fetch data from the API
      let response = await axios.get(url);
      console.log(response);

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

  //Todo Function to fetch data using search query
  const fetchSearchData = async (query) => {
    // const searchUrl = `https://api.unsplash.com/search/collections?page=1&per_page=20&query=${query}&client_id=${apiKey}`;
    const searchUrl = `https://api.unsplash.com/search/photos/?page=1&query=${query}&client_id=${apiKey}&per_page=30`

    try {
      setLoading(true);
      let response = await axios.get(searchUrl);
      setData(response.data.results);
    } catch (error) {
      console.log("Search failure with", error);
    } finally {
      setLoading(false);
    }
  };

  //TODO Effect hook to fetch data whenever the page changes
  useEffect(() => {
      fetchData();
  }, [page]);

  //TODO Function to handle search
  const handleSearch = () => {
    // Reset page when searching
    console.log(textInput);
    setPage(1);
    fetchSearchData(textInput.trim());
  };

  // JSX rendering of the main component
  return (
    <main>
      {/* Search bar component */}
      <Searchbar
        textInput={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        onClick={handleSearch}
      />
      {/* Conditional rendering based on loading status */}
      <InfiniteScroll
        dataLength={data.length}
        next={() => setPage(page + 1)}
        hasMore={true} // Adjust this based on your logic for determining if there's more data
        loader={isLoading && <Loader />}
        scrollThreshold={"10px"}
      >
        <Images data={data} />
      </InfiniteScroll>
    </main>
  );
};

// Export the Main component as the default export
export default Main;







  //TODO Function to handle the scroll event and trigger pagination
  // const handleScroll = () => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop + 10 >=
  //     document.documentElement.scrollHeight
  //   ) {
  //     // User has scrolled to the bottom, fetch more data
  //     // console.log("scroll");
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  // //TODO Effect hook to add and remove the scroll event listener
  // useEffect(() => {
  //   // Add event listener when the component mounts
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     // Remove event listener when the component unmounts
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);