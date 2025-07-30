// src/types/index.ts

export type UserRole = "admin" | "owner" | "renter";

export interface EquipmentItem {
  id: string;
  name: string;
  image: string;
  price: number;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  availability: "Available" | "Rented";
  description: string;
  ownerId?: string;
  status?: "pending" | "approved" | "rejected"; // <-- Ensure this line is present
}

export interface Booking {
  id: string;
  userId: string;
  equipmentId: string;
  equipmentName: string;
  startDate: { seconds: number; nanoseconds: number };
  endDate: { seconds: number; nanoseconds: number };
  totalPrice: number;
  status: string;
}

export interface PlatformUser {
  id: string;
  email: string;
  role: UserRole;
}
