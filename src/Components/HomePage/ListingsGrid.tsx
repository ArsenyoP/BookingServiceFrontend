import type { ListingResponseInterface } from "../../Interfaces/ListingInterfaces"
import { formatLocation } from "../../Utils/LocationUtils"

interface ListingsGridProps{
    listings: ListingResponseInterface[]
}

export const ListingGrid = ({listings}: ListingsGridProps) => {
    return <div className="container">
    <h2>Featured Listings</h2>
    <div className="listing-grid">
      {listings.map( (listing) => {
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
}