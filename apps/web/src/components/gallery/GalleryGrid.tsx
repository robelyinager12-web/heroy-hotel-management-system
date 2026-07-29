"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: string;
  url: string;
  category: string;
  alt: string;
}

// Placeholder imagery — replace each url with real Heroy Hotel photography when available.
const GALLERY_IMAGES: GalleryImage[] = [
  { id: "1", url: "https://picsum.photos/id/1058/800/600", category: "Rooms", alt: "Deluxe room interior" },
  { id: "2", url: "https://picsum.photos/id/1060/800/600", category: "Restaurant", alt: "Hotel restaurant dining area" },
  { id: "3", url: "https://picsum.photos/id/1061/800/600", category: "Pool", alt: "Outdoor swimming pool" },
  { id: "4", url: "https://picsum.photos/id/1040/800/600", category: "Lobby", alt: "Hotel lobby entrance" },
  { id: "5", url: "https://picsum.photos/id/1039/800/600", category: "Rooms", alt: "Suite bedroom view" },
  { id: "6", url: "https://picsum.photos/id/1035/800/600", category: "Spa", alt: "Spa treatment room" },
  { id: "7", url: "https://picsum.photos/id/1031/800/600", category: "Exterior", alt: "Hotel exterior at night" },
  { id: "8", url: "https://picsum.photos/id/1024/800/600", category: "Gym", alt: "Fitness center" },
  { id: "9", url: "https://picsum.photos/id/1015/800/600", category: "Rooms", alt: "Bathroom with rain shower" },
];

const CATEGORIES = ["All", "Rooms", "Restaurant", "Pool", "Lobby", "Spa", "Exterior", "Gym"];

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "All"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  function openLightbox(index: number) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function showNext() {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }

  function showPrev() {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              activeCategory === category
                ? "bg-champagne-400 text-navy-950"
                : "border border-platinum-100/15 text-platinum-300 hover:bg-platinum-100/5"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3">
        {filtered.map((image, index) => (
          <button
            key={image.id}
            onClick={() => openLightbox(index)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-950/70 via-transparent to-transparent p-3 opacity-0 transition group-hover:opacity-100">
              <span className="text-xs font-medium text-platinum-100">{image.category}</span>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 p-6"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-6 top-6 text-platinum-300 hover:text-platinum-100"
            aria-label="Close"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 text-platinum-300 hover:text-platinum-100 sm:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={filtered[lightboxIndex].url}
            alt={filtered[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-full rounded-xl object-contain"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 text-platinum-300 hover:text-platinum-100 sm:right-8"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  );
}