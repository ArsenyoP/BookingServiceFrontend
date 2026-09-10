interface StartRatingComponentProps {
    averageRating: number,
    reviewsCount?: number
}

export const StartRatingComponent = (
    {averageRating, reviewsCount} : StartRatingComponentProps
) => {
    return <div className="product-rating-container">
    <img
      className="product-rating-stars"
      src={`/Images/Rating/rating-${Math.round((averageRating || 0) * 2) * 5}.png`}
      alt={`Rating: ${averageRating}`}
    />
    <div className="product-rating-count link-primary">{reviewsCount || 0}</div>
  </div>
}