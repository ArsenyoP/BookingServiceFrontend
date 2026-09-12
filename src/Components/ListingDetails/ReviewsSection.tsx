import type { ReviewInterface } from "../../Interfaces/ReviewsInterfaces/ReviewInterface";
import { StartRatingComponent } from "../../Components/Common/StarsRatingComponent";
import { formatDate } from "../../Utils/DateUtils";

interface ReviewsSectionProps {
  reviews: ReviewInterface[];
}

export const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  return (
    <section className="reviews">
      <h2>
        Reviews (<span id="review-count">{reviews.length}</span>)
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
  );
};