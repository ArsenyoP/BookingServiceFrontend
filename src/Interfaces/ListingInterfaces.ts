export interface ListingResponseInterface{
    id: string;
    title: string;
    description: string;
    address: string;
    city: string;
    country: string;
    street: string;
    houseNumber: string;
    pricePerNight: number;
    maxGuests: number;
    averageRating: number;
    reviewsCount: number;
}