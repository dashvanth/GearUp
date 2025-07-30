// src/types/index.ts

export type UserRole = "owner" | "renter";

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
  status?: "approved" | "rejected";
}

export interface Booking {
  id: string;
  userId: string;
  equipmentId: string;
  equipmentName: string;
  startDate: { seconds: number; nanoseconds: number };
  endDate: { seconds: number; nanoseconds: number };
  totalPrice: number;
  status: "pending" | "confirmed" | "rejected";
  ownerId?: string;
  renterEmail?: string;
}

export interface PlatformUser {
  id: string;
  email: string;
  role: UserRole;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: { seconds: number; nanoseconds: number };
}
