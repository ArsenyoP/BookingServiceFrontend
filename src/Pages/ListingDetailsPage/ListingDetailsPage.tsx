
const ListingDetailsPage = () => {
  
  return (
    <>
    <title>Details</title>
      <header>
        <div className="container">
          <h1 className="logo">BookingService</h1>
          <nav>
            <ul>
              <li><a href="">Home</a></li>
              <li><a href="">Listings</a></li>
              <li><a href="">Login</a></li>
              <li><a href="">Register</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="listing-detail">
            <div className="listing-gallery">
              <img src="../../public/Images/2-slot-toaster-white.jpg" alt="Main image" />
              <div className="thumbnails">
                <img src="../../public/Images/2-slot-toaster-white.jpg" alt="Thumb 1" />
                <img src="../../public/Images/3-piece-cooking-set.jpg" alt="Thumb 2" />
                <img src="../../public\Images\bathroom-mat.jpg" alt="Thumb 3" />
              </div>
            </div>
            <div className="listing-info">
              <h1>Cozy Apartment in City Center</h1>
              <p className="location">New York, USA</p>
              <div className="rating">
                ⭐⭐⭐⭐☆ (4.2) <span>(128 reviews)</span>
              </div>
              <p className="price">$120/night</p>
              <button className="btn-primary btn-block">Reserve Now</button>
            </div>
          </div>

          <section className="description">
            <h2>About this space</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          <section className="amenities">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              <div className="amenity-item">
                <i className="icon wifi"></i>
                <span>WiFi</span>
              </div>
              <div className="amenity-item">
                <i className="icon kitchen"></i>
                <span>Kitchen</span>
              </div>
              <div className="amenity-item">
                <i className="icon ac"></i>
                <span>Air Conditioning</span>
              </div>
              <div className="amenity-item">
                <i className="icon parking"></i>
                <span>Free Parking</span>
              </div>
              <div className="amenity-item">
                <i className="icon washer"></i>
                <span>Washer</span>
              </div>
              <div className="amenity-item">
                <i className="icon elevator"></i>
                <span>Elevator</span>
              </div>
            </div>
          </section>

          <section className="host">
            <h2>About the Host</h2>
            <div className="host-info">
              <img src="../assets/placeholder.svg" alt="Host avatar" className="host-avatar" />
              <div>
                <h3>John Doe</h3>
                <p>Superhost • Member since 2020</p>
              </div>
            </div>
          </section>

          <section className="reviews">
            <h2>
              Reviews (<span id="review-count">128</span>)
            </h2>
            <div className="review-form">
              <h3>Leave a review</h3>
              <form id="reviewForm">
                <div className="rating-input">
                  <label>Rating:</label>
                  <div className="stars">
                    <span className="star" data-value="1">☆</span>
                    <span className="star" data-value="2">☆</span>
                    <span className="star" data-value="3">☆</span>
                    <span className="star" data-value="4">☆</span>
                    <span className="star" data-value="5">☆</span>
                  </div>
                  <input type="hidden" id="ratingValue" name="rating" value="0" />
                </div>
                <textarea placeholder="What did you love (or not) about your stay?" required></textarea>
                <button type="submit" className="btn-primary">Submit Review</button>
              </form>
            </div>
            <div className="review-list">
              {/* Review cards would go here */}
              <div className="review-card">
                <div className="review-header">
                  <h4>Emily R.</h4>
                  <div className="review-rating">⭐⭐⭐⭐☆</div>
                  <time dateTime="2024-05-12">May 12, 2024</time>
                </div>
                <p>Great location and very clean! The host was responsive and helpful.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2026 BookingService. All rights reserved.</p>
        </div>
      </footer>

      <script src="../js/main.js"></script>
    </>
  );
};

export default ListingDetailsPage;