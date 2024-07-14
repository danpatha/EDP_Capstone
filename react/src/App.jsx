import React, { useState, useEffect } from "react";
import Sock from "./components/Sock";
import sock_data from './assets/sock.json';
import promo_data from './assets/promo.json';
import categories_data from './assets/categories.json'
import Footer from "./components/Footer";
import Search from "./components/Search";
import Promotion from "./components/Promotion";
import Categories from "./components/Categories";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import About from "./components/About";
import Featured from "./components/Featured";
import AddSock from "./components/AddSock";
import ProductsList from "./components/ProductsList";
import ProductPage from "./components/ProductPage";

const initialCart = {
items:[], 
total:0
}

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState(initialCart);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // State to store the current page number

  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState();

  const [featuredData, setfeaturedData] = useState([]);
  const [featured, setFeatured] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}/featured/5`);
        if (!response.ok) {
          throw new Error('featured data could not be fetched!');
        }
        const json_response = await response.json();
        setfeaturedData(json_response);
      } catch (error) {
        console.error('Error fetching featured:', error);
      }
    };

    fetchData();
  }, [featured]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}/categories`);
        if (!response.ok) {
          throw new Error('category data could not be fetched!');
        }
        const json_response = await response.json();
        setCategoryData(json_response);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, [category]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}/${page}/10`);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setData(json_response);
      } catch (error) {
        console.error('Error fetching socks:', error);
      }
    };

    fetchData();
  }, [page]);

 console.log(cart)
 
  const handleDelete = async (sockId) => {
    try {
      // Make an API request to delete the sock with the given sockId
      const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}/${sockId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Sock could not be deleted!');
      }
      // Update the state or fetch the updated data from the server
      const updatedData = data.filter(sock => sock._id !== sockId); // Remove the deleted sock from the data array
      setData(updatedData); // Update the state with the updated data
    } catch (error) {
      console.error('Error deleting sock:', error);
    }
  };

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">The Sports Supply</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Search setData={setData} setSearchTerm = {setSearchTerm} searchTerm={searchTerm} />
                  {/* <Link className="nav-link" to="/">
                    Home
                  </Link> */}
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link className="nav-link" to="/add">
                  Cart 
                  </Link>
                </li>
              </ul>
             
            </div>
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">

          <div className="container-fluid">
            <div className="row">
            
              <Featured data={featuredData} featured = {featured} setFeatured = {setFeatured}/>
              
              <hr />
              <Categories data={categoryData}/>
              <Routes>
                <Route exact path="/" element={<Home data={data} searchTerm={searchTerm} handleDelete={handleDelete} page={page} setPage={setPage} />} />
                <Route path="/about" element={<About />} />
                <Route path="/add" element={<AddSock />} />
                <Route path="/products/:category" element={<ProductsList/>}/>
                <Route path="/product/:id" element={<ProductPage cart={cart} setCart={setCart}/>}/>
              </Routes>
              <footer className={import.meta.env.VITE_ENVIRONMENT === "development" ? "bg-yellow" : import.meta.env.VITE_ENVIRONMENT === "production" ? "bg-green" : ""}>
                {/* <div><strong>{import.meta.env.VITE_ENVIRONMENT.toUpperCase()}</strong></div>  */}
              </footer>
            </div>
          </div>
        </main>
      </Router>
    </>
  )
}

export default App
