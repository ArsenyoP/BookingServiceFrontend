import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from '../../Components/Header';
import type { ListingResponseInterface } from '../../Interfaces/ListingInterfaces';
import { formatLocation } from '../../Utils/LocationUtils';
import { HomeSearchBar } from '../../Components/HomePage/HomeSearchBar';
import { ListingGrid } from '../../Components/HomePage/ListingsGrid';
// import './HomePageStyle.css';

const HomePage = () => {

  

  const [listings, setListings] = useState<ListingResponseInterface[]>([])
  //create interface for listings
  //map listings 
  
  useEffect( () => {
    const fetchPoducts  = async () =>{
      try {
        let result = await axios.get("/listing");
        
        console.log("Отримані дані з API:", result.data, result.data.type);
  
        setListings(result.data);
      } catch (error) {
        console.error("Помилка під час завантаження даних:", error);
      }
    }

    fetchPoducts();
  }, [])

  
  return (
      <div className="app-container home-page">      <title>BookingService - Find Your Stay</title>

      <Header/>

      <main>
        <section className="hero">
          <HomeSearchBar/>
        </section>

        <section className="listings">
          <ListingGrid listings={listings}/>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2026 BookingService. All rights reserved.</p>
          <nav>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Terms</a></li>
              <li><a href="#">Privacy</a></li>
            </ul>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;