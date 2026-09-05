import './App.css'
import { useState } from 'react'

function App() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [city, setCity] = useState('')
  const countriesCities = {
    USA: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
    France: ['Paris', 'Lyon', 'Marseille', 'Nice'],
    Japan: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama'],
    Brazil: ['Rio de Janeiro', 'Sao Paulo', 'Brasilia', 'Salvador'],
    // Add more countries and cities as needed
  }
  const cities = selectedCountry ? countriesCities[selectedCountry] || [] : []

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value)
    setCity('')
  }

  return (
    <div className="app-container">
      <header>
        <div className="container">
          <h1 className="logo">BookingService</h1>
          <nav>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="listing.html">Listings</a></li>
              <li><a href="login.html">Login</a></li>
              <li><a href="register.html">Register</a></li>
            </ul>
          </nav>
        </div>
      </header>

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
              <div className="listing-card">
                <img src="../assets/placeholder.svg" alt="Cozy Apartment" />
                <div className="listing-info">
                  <h3>Cozy Apartment in City Center</h3>
                  <p className="location">New York, USA</p>
                  <div className="rating">⭐⭐⭐⭐☆ (4.2)</div>
                  <p className="price">$120/night</p>
                </div>
                <a href="listing-details.html" className="btn-primary">View Details</a>
              </div>

              {/* Listing Card 2 */}
              <div className="listing-card">
                <img src="../assets/placeholder.svg" alt="Beach House" />
                <div className="listing-info">
                  <h3>Beach House with Ocean View</h3>
                  <p className="location">Malibu, USA</p>
                  <div className="rating">⭐⭐⭐⭐⭐ (5.0)</div>
                  <p className="price">$250/night</p>
                </div>
                <a href="listing-details.html" className="btn-primary">View Details</a>
              </div>

              {/* Listing Card 3 */}
              <div className="listing-card">
                <img src="../assets/placeholder.svg" alt="Mountain Cabin" />
                <div className="listing-info">
                  <h3>Mountain Cabin Retreat</h3>
                  <p className="location">Aspen, USA</p>
                  <div className="rating">⭐⭐⭐☆☆ (3.8)</div>
                  <p className="price">$180/night</p>
                </div>
                <a href="listing-details.html" className="btn-primary">View Details</a>
              </div>
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
  )
}

export default App