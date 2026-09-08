import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from '../../Components/Header';
import type { ListingResponseInterface } from '../../Interfaces/ListingInterfaces';
import { formatLocation } from '../../Utils/LocationUtils';
import { HomeSearchBar } from '../../Components/HomePage/HomeSearchBar';
// import './HomePageStyle.css';

const HomePage = () => {

  

  const [lisitngs, setListings] = useState<ListingResponseInterface[]>([])
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
          <div className="container">
            <h2>Featured Listings</h2>
            <div className="listing-grid">
              {/* Listing Card 1 */}
              {lisitngs.map( (listing) => {
                return <div className="listing-card" key={listing.id}>
                <img src="/Images/hotel.jpg" alt={listing.title} className="listing-image" />
                
                <div className="listing-info">
                  <h3>{listing.title}</h3>
                  <p className="location">{formatLocation(listing.country, listing.city)}</p>
                  
                  <div className="product-rating-container">
                    <img
                      className="product-rating-stars"
                      src={`/Images/Rating/rating-${Math.round((listing.averageRating || 0) * 2) * 5}.png`}
                      alt={`Rating: ${listing.averageRating}`}
                    />
                    <div className="product-rating-count link-primary">{listing.reviewsCount || 0}</div>
                  </div>
                </div>
                
                <a href="listing-details.html" className="btn-primary">View Details</a>
              </div>
              } )}
              
            </div>
          </div>
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