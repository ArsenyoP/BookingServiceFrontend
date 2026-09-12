import { Header } from "../../Components/Common/Header";
import { useEffect, useRef, useState } from "react";
import "./ListingDetailsPageStyle.css";
import "../../Components/ListingDetails/ListingGallery.css"; // FIX: підключає стилі .lightbox-overlay/.lightbox-content/..., яких бракувало
import { useParams } from "react-router-dom";
import type { ListingResponseInterface } from "../../Interfaces/ListingInterfaces";
import axios from "axios";
import { formatLocation } from "../../Utils/LocationUtils";
import { StartRatingComponent } from "../../Components/Common/StarsRatingComponent";
import ServerErrorPage from "../ServerErrorPage/ServerErrorPage";
import type { ReviewInterface } from "../../Interfaces/ReviewsInterfaces/ReviewInterface";
import { AmenitiesSection } from "../../Components/ListingDetails/AmenitiesSection";
import { ReviewsSection } from "../../Components/ListingDetails/ReviewsSection";

// FIX: винесено за межі компонента - масив більше не перестворюється на кожен рендер
const IMAGES = [
  "/Images/2-slot-toaster-white.jpg", // FIX: абсолютний шлях від кореня public/, а не "../../public/..."
  "/Images/3-piece-cooking-set.jpg",
  "/Images/bathroom-mat.jpg",
];

// Мінімальний інтервал (мс) між перемиканнями картинки - захист від спаму кліками
const SWITCH_THROTTLE_MS = 150;

const ListingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<ListingResponseInterface>();
  const [reviews, setReviews] = useState<ReviewInterface[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // FIX: guard проти спаму кліками - поки триває "перемикання", нові кліки ігноруються
  const isSwitching = useRef(false);

  useEffect(() => {
    let cancelled = false; // FIX: захист від setState після розмонтування / зміни id

    const fetchListing = async () => {
      try {
        const result = await axios.get(`listing/${id}`);
        if (!cancelled) {
          setListing(result.data);
        }
      } catch (err) {
        console.error("Error loading listing:", err);
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const result = await axios.get<ReviewInterface[]>(`reviews/${id}`);
        if (!cancelled) setReviews(result.data);
      } catch (err) {
        console.error("Error loading reviews:", err);
      }
    };

    fetchListing();
    fetchReviews();

    return () => {
      cancelled = true;
    };
  }, [id]); // FIX: перезавантажує дані при зміні id (раніше було [] - працювало тільки один раз)

  const runThrottled = (action: () => void) => {
    if (isSwitching.current) return;
    isSwitching.current = true;
    action();
    requestAnimationFrame(() => {
      isSwitching.current = false;
    });
  };

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrev = () => {
    runThrottled(() => {
      setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
    });
  };

  const goToNext = () => {
    runThrottled(() => {
      setCurrentIndex((next) => (next + 1) % IMAGES.length);
    });
  };

  const selectThumbnail = (idx: number) => {
    runThrottled(() => {
      setCurrentIndex(idx);
    });
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

  if (error || !listing) {
    return <ServerErrorPage />;
  }

  return (
    <>
      <title>Details</title>
      <Header />

      <main>
        <div className="container">
          <div className="listing-detail">
            <div className="listing-gallery">
              <img
                src={IMAGES[currentIndex]}
                alt="Main image"
                onClick={() => openLightbox(currentIndex)}
                style={{ cursor: "pointer" }}
                draggable={false} // FIX: вимикає нативний HTML5 drag, який і "вішав" браузер при швидких кліках
              />
              <div className="thumbnails">
                {IMAGES.map((img, idx) => (
                  <img
                    key={img}
                    src={img}
                    alt={`Thumb ${idx + 1}`}
                    onClick={() => selectThumbnail(idx)}
                    className={currentIndex === idx ? "active" : ""}
                    draggable={false} // FIX: те саме для мініатюр
                  />
                ))}
              </div>
            </div>

            <div className="listing-info">
              <h1>{listing.title}</h1>
              <p className="location">
                {formatLocation(
                  listing.country,
                  listing.city,
                  listing.street ?? "",
                  listing.houseNumber ?? ""
                )}
              </p>
              <div className="product-rating-container">
                <StartRatingComponent
                  averageRating={listing.averageRating}
                  reviewsCount={listing.reviewsCount}
                />
              </div>
              <p className="price"></p>
              <button className="btn-primary btn-block">Look for rooms</button>
            </div>
          </div>

          <section className="description">
            <h2>About this hotel</h2>
            <p>{listing.description}</p>
          </section>

          <AmenitiesSection amenities={listing.amenities} />

          <ReviewsSection reviews={reviews} />
        </div>
      </main>

      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              &times;
            </button>
            <img src={IMAGES[currentIndex]} alt="Enlarged" draggable={false} />
            <div className="lightbox-nav">
              <button
                className="lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
              >
                &#9664;
              </button>
              <button
                className="lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
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
    </>
  );
};

export default ListingDetailsPage;
