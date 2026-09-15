import { Header } from "../../Components/Common/Header";
import { useEffect, useState } from "react";
import "./RoomsPageStyle.css";
import { useParams } from "react-router-dom";
import type { RoomInterface } from "../../Interfaces/RoomInterface";
import axios from "axios";
import { NotFoundPage } from "../ErrorsPages/NotFoundPage";
import  ServerErrorPage  from "../ErrorsPages/ServerErrorPage";
import { AmenitiesSection } from "../../Components/ListingDetails/AmenitiesSection";
import { StartRatingComponent } from "../../Components/Common/StarsRatingComponent";

const RoomsPage = () => {
  const { listingId } = useParams<{ listingId: string }>();
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorStatus, setErrorStatus] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchRooms = async () => {
      try {
        const result = await axios.get<RoomInterface[]>(`/room/listingId/${listingId}`);
        if (!cancelled) {
          setRooms(result.data);
        }
      } catch (err) {
        console.error("Error loading rooms:", err);
        if (!cancelled) {
          if (axios.isAxiosError(err) && err.response) {
            setErrorStatus(err.response.status);
          } else {
            setErrorStatus(500);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchRooms();

    return () => {
      cancelled = true;
    };
  }, [listingId]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="container">
          <p>Loading rooms...</p>
        </main>
      </>
    );
  }

  if (errorStatus !== null) {
    if (errorStatus === 404) {
      return <NotFoundPage />;
    } else {
      return <ServerErrorPage />;
    }
  }

  return (
    <>
      <title>Rooms</title>
      <Header />
      <main>
        <div className="container">
          <h1>Available Rooms</h1>
          {rooms.length === 0 ? (
            <p>No rooms available for this listing.</p>
          ) : (
            <div className="rooms-grid">
  {rooms.map((room) => (
    <div key={room.id} className="room-card">
      <div className="room-image-container">
        <img
          src="/Images/room-placeholder.jpg"
          alt={room.title}
          className="room-image"
        />
      </div>

      <div className="room-info">
        <h2>{room.title}</h2>
        <p className="room-type">{room.type}</p>
        <p className="room-description">{room.description}</p>
        <div className="room-details">
          <span className="price">${room.pricePerNight}/night</span>
          <span className="capacity">
            {room.adultsCapacity} adults + {room.childrenCapacity} children
          </span>
        </div>
        <div className="room-rating">
          <StartRatingComponent
            averageRating={room.averageRating}
            reviewsCount={room.reviewsCount}
          />
        </div>
        <button
          className="btn-primary btn-block"
          onClick={() => {}}
        >
          Discover
        </button>
      </div>
    </div>
  ))}
</div>
          )}
        </div>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2026 BookingService. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default RoomsPage;