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
import { ListingGallery } from "../../Components/ListingDetails/ListingGallery";
import { AmenitiesSection } from "../../Components/ListingDetails/AmenitiesSection";
import { ReviewsSection } from "../../Components/ListingDetails/ReviewsSection";

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
            <ListingGallery images={images} />
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

          <AmenitiesSection amenities={listing?.amenities || []} />

          <ReviewsSection reviews={reviews} />
            
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
          <section/>
        <div/>
      <main>

      <footer>
        <div className="container">
          <p>&copy; 2026 BookingService. All rights reserved.</p>
        </div>
      </footer>

      <script src="../js/main.js"></script>
    </main>
  );
};

export default ListingDetailsPage;