import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from '../../Components/Common/Header';
import type { ListingResponseInterface } from '../../Interfaces/ListingInterfaces';
import { HomeSearchBar } from '../../Components/HomePage/HomeSearchBar';
import { ListingGrid } from '../../Components/HomePage/ListingsGrid';
import { Footer } from '../../Components/Footer/Footer';
import './HomePageStyle.css';

const HomePage = () => {

  const [listings, setListings] = useState<ListingResponseInterface[]>([])
   
  
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

      <Footer/>
    </div>
  );
};

export default HomePage;