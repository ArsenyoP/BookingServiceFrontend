import { Header } from "../../Components/Common/Header";
import { useEffect, useState } from "react";
import "./ListingDetailsPageStyle.css";
import { useParams } from "react-router-dom";
import type { ListingResponseInterface } from "../../Interfaces/ListingInterfaces";
import axios from "axios";
import { formatLocation } from "../../Utils/LocationUtils";
import { StartRatingComponent } from "../../Components/Common/StarsRatingComponent";
import ServerErrorPage from "../ServerErrorPage/ServerErrorPage";
import type { ReviewInterface } from "../../Interfaces/ReviewsInterfaces/ReviewInterface";
import { formatDate } from "../../Utils/DateUtils";

const ListingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<ListingResponseInterface>();
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const[error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        let result = await axios.get(`listing/${id}`);
        setListing(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("Error loading listing:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try{
        let result = await axios.get<ReviewInterface[]>(`reviews/${id}`)
        setReviews(result.data);
        console.log("Reviews:", result.data)
      } catch(error){
        console.error("Error loading listing:", error);
      }
    }

    fetchListing();
    fetchReviews();
  }, []);

  const images = [
    "../../public/Images/2-slot-toaster-white.jpg",
    "../../public/Images/3-piece-cooking-set.jpg",
    "../../public/Images/bathroom-mat.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((next) => (next + 1) % images.length);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container">
          <p>Loading details...</p>
        </main>
      </>
    );
  }

  if(error){
    return <ServerErrorPage/>
  }

  return (
    <>
    <title>Details</title>
      <Header/>

      <main>
        <div className="container">
          <div className="listing-detail">
            <div className="listing-gallery">
              <img
                src={images[currentIndex]}
                alt="Main image"
                onClick={() => openLightbox(currentIndex)}
                style={{ cursor: 'pointer' }}
              />
              <div className="thumbnails">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={currentIndex === idx ? "active" : ""}
                  />
                ))}
              </div>
            </div>
            <div className="listing-info">
              <h1>{listing.title}</h1>
              <p className="location">{formatLocation(listing.country,
                 listing.city,
                  listing.street ?? "",
                   listing.houseNumber ?? "")}</p>
              <div className="product-rating-container">
                <StartRatingComponent
                averageRating={listing.averageRating}
                reviewsCount={listing.reviewsCount}/>
              </div>
              <p className="price"></p>
              <button className="btn-primary btn-block">Look for rooms</button>
            </div>
          </div>

          <section className="description">
            <h2>About this hotel</h2>
            <p>
              {listing.description}
            </p>
          </section>

          <section className="amenities">
            <h2>Amenities</h2>
            {listing?.amenities && listing.amenities.length > 0 ? (
              <div className="amenities-scrollable">
                {listing.amenities.map((amenity) => (
                  <div key={amenity.amenityId} className="amenity-item">
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-amenities">No amenities information available.</p>
            )}
          </section>

          <section className="reviews">
            <h2>
              Reviews (<span id="review-count">{listing.reviewsCount}</span>)
            </h2>
            
            <div className="review-list">
              {reviews.map((review) => {
                return <div className="review-card">
                <div className="review-header">
                  <h4>{review.userName}</h4>
                  <div className="review-rating">
                    <StartRatingComponent reviewsCount={1} averageRating={review.score}/>
                  </div>
                  <time dateTime="2024-05-12">{formatDate(review.createdAt)}</time>
                </div>
                <p>{review.text}</p>
              </div>
              })}
            </div>
          </section>
        </div>
      </main>

      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              &times;
            </button>
            <img src={images[currentIndex]} alt="Enlarged" />
            <div className="lightbox-nav">
              <button className="lightbox-prev" onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}>
                &#9664;
              </button>
              <button className="lightbox-next" onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}>
                &#9654;
              </button>
            </div>
          </div>
        </div>
      )}

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