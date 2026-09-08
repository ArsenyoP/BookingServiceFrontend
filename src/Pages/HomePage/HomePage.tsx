import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from '../../Components/Header';
import type { ListingResponseInterface } from '../../Interfaces/ListingInterfaces';
import { formatLocation } from '../../Utils/LocationUtils';

const HomePage = () => {

  const [selectedCountry, setSelectedCountry] = useState('')
  const [city, setCity] = useState('')
  const countriesCities = {
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    France: ['Paris', 'Lyon', 'Marseille', 'Nice'],
    Japan: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama'],
    Brazil: ['Rio de Janeiro', 'Sao Paulo', 'Brasilia', 'Salvador'],
  }
  const cities = selectedCountry ? countriesCities[selectedCountry] || [] : []

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value)
    setCity('')
  }

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
          <div className="container">
            <h2>Find your perfect stay</h2>
            <form className="search-form" onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label>Country</label>
                <select value={selectedCountry} onChange={handleCountryChange}>
                  <option value="">Select Country</option>
                  {Object.keys(countriesCities).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>City</label>
                <input
                  list="city-list"
                  placeholder="Type or select city"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
                <datalist id="city-list">
                  {cities.map(c => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
              <div className="field">
                <label>Guests</label>
                <select>
                  <option>1 guest</option>
                  <option>2 guests</option>
                  <option>3 guests</option>
                  <option>4+ guests</option>
                </select>
              </div>
              <button type="submit">Search</button>
            </form>
          </div>
        </section>

        <section className="listings">
          <div className="container">
            <h2>Featured Listings</h2>
            <div className="listing-grid">
              {/* Listing Card 1 */}
              {lisitngs.map( (listing) => {
                return <div className="listing-card" key={listing.id}>
                {/* Шлях без 'public' та зворотних слешів */}
                <img src="/Images/test.png" alt={listing.title} className="listing-image" />
                
                <div className="listing-info">
                  <h3>{listing.title}</h3>
                  <p className="location">{formatLocation(listing.country, listing.city)}</p>
                  
                  <div className="product-rating-container">
                    <img
                      className="product-rating-stars"
                      src={`/Images/Rating/rating-${Math.round((listing.averageRating || 0) * 10)}.png`}
                      alt={`Rating: ${listing.averageRating}`}
                    />
                    <div className="product-rating-count link-primary">87</div>
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