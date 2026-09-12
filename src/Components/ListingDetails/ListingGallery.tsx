import { useState } from 'react';

interface ListingGalleryProps {
  images: string[];
}

export const ListingGallery = ({ images }: ListingGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((next) => (next + 1) % images.length);
  };

  return (
    <>
      <div className="listing-gallery">
        <img
          src={images[currentIndex]}
          alt="Main image"
          onClick={() => openLightbox(currentIndex)}
          style={{ cursor: 'pointer' }}
        />
        <div className="thumbnails">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumb ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={currentIndex === idx ? "active" : ""}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>
              &times;
            </button>
            <img src={images[currentIndex]} alt="Enlarged" />
            <div className="lightbox-nav">
              <button className="lightbox-prev" onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}>
                &#9664;
              </button>
              <button className="lightbox-next" onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}>
                &#9654;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};