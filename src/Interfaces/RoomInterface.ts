import type { AmenityInterface } from "./AmenitiesInterfaces/AmenityInterface";

export interface RoomInterface {
    id: string;
    title: string;
    description: string;
    type: string;
    pricePerNight: number;
    adultsCapacity: number;
    childrenCapacity: number;
    listingTitle: string;
    listingId: string;
    averageRating: number;
    reviewsCount: number;
    amenities: AmenityInterface[];
}