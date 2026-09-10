export function formatLocation(country: string, city: string): string;
export function formatLocation(country: string, city: string, street: string, houseNumber: string | number): string;

export function formatLocation(
  country: string, 
  city: string, 
  street?: string, 
  houseNumber?: string | number
): string {
  if (street && houseNumber) {
    return `${country}, ${city}, вул. ${street} ${houseNumber}`;
  }
  return `${country}, ${city}`;
}