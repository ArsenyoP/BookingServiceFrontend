import type { AmenityInterface } from "../../Interfaces/AmenitiesInterfaces/AmenityInterface";

interface AmenitiesSectionProps {
  amenities: AmenityInterface[];
}

export const AmenitiesSection = ({ amenities }: AmenitiesSectionProps) => {
  return (
    <section className="amenities">
      <h2>Amenities</h2>
      {amenities && amenities.length > 0 ? (
        <div className="amenities-scrollable">
          {amenities.map((amenity) => (
            <div key={amenity.amenityId} className="amenity-item">
              <span>{amenity.name}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-amenities">No amenities information available.</p>
      )}
    </section>
  );
};