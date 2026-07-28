export interface RoomType {
  id: string;
  name: string;
  description: string | null;
  basePrice: string;
  maxOccupancy: number;
  amenities: string[];
  imageUrls: string[];
}

export interface AvailabilityRoom {
  id: string;
  number: string;
  floor: number | null;
  status: string;
  roomType: RoomType;
  branch: {
    id: string;
    name: string;
    city: string;
  };
}