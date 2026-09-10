import type { ListingResponseInterface } from "../../Interfaces/ListingInterfaces"
import { formatLocation } from "../../Utils/LocationUtils"
import { StartRatingComponent } from "../Common/StarsRatingComponent"

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
          
          <StartRatingComponent
           averageRating={listing.averageRating}
           reviewsCount={listing.reviewsCount}/>
        </div>
        
        <a href={`/listing-details/${listing.id}`} className="btn-primary">View Details</a>
      </div>
      } )}
      
    </div>
  </div>
}