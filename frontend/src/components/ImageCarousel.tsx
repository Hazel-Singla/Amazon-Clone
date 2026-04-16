'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  productName: string;
}

export default function ImageCarousel({ images, productName }: ImageCarouselProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-96 bg-gray-100 rounded-lg">
        <div className="flex items-center justify-center h-full text-gray-400">
          No image available
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {/* Thumbnail Images */}
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative w-16 h-16 border-2 rounded ${
              selectedImage === index
                ? 'border-amazon-orange ring-2 ring-amazon-orange'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Image
              src={image}
              alt={`${productName} - Image ${index + 1}`}
              fill
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative h-96 bg-gray-50 rounded-lg">
        <Image
          src={images[selectedImage]}
          alt={`${productName} - Main Image`}
          fill
          className="object-contain p-4"
          priority
        />
      </div>
    </div>
  );
}
