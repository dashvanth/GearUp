// src/data/mockData.ts
import { EquipmentItem } from "@/types";
import tripodImage from "@/assets/equipment-tripod.jpg";
import droneImage from "@/assets/equipment-drone.jpg";
import drillImage from "@/assets/equipment-drill.jpg";
import cameraImage from "@/assets/equipment-camera.jpg";
import generatorImage from "@/assets/equipment-generator.jpg";
import lightingImage from "@/assets/equipment-lighting.jpg";

// A generic, consistent ID for all mock items
const MOCK_OWNER_ID = "mock_owner_placeholder_id";

export const mockEquipmentItems: EquipmentItem[] = [
  {
    id: "mock-tripod-123",
    name: "Professional Camera Tripod",
    image: tripodImage,
    price: 1500,
    category: "Photography",
    rating: 4.8,
    reviews: 124,
    location: "Jayanagar",
    availability: "Available",
    description:
      "A heavy-duty carbon fiber tripod for professional photographers.",
    ownerId: MOCK_OWNER_ID, // Assigning the generic owner
    status: "approved",
  },
  {
    id: "mock-drone-456",
    name: "Professional Drone 4K",
    image: droneImage,
    price: 5000,
    category: "Aerial",
    rating: 4.9,
    reviews: 89,
    location: "Koramangala",
    availability: "Available",
    description:
      "High-performance drone with a 4K camera and gimbal stabilization.",
    ownerId: MOCK_OWNER_ID, // Assigning the generic owner
    status: "approved",
  },
  // ... (the rest of your mock items will also have the MOCK_OWNER_ID)
  {
    id: "mock-drill-789",
    name: "Cordless Power Drill",
    image: drillImage,
    price: 800,
    category: "Tools",
    rating: 4.7,
    reviews: 156,
    location: "Indiranagar",
    availability: "Rented",
    description: "Professional-grade cordless drill with a brushless motor.",
    ownerId: MOCK_OWNER_ID,
    status: "approved",
  },
  {
    id: "mock-camera-101",
    name: "DSLR Camera Kit",
    image: cameraImage,
    price: 3500,
    category: "Photography",
    rating: 4.9,
    reviews: 203,
    location: "HSR Layout",
    availability: "Available",
    description:
      "A complete full-frame DSLR camera kit, including a 24-70mm f/2.8 lens.",
    ownerId: MOCK_OWNER_ID,
    status: "approved",
  },
  {
    id: "mock-generator-112",
    name: "Portable Power Generator",
    image: generatorImage,
    price: 4000,
    category: "Power",
    rating: 4.6,
    reviews: 67,
    location: "Whitefield",
    availability: "Available",
    description: "A quiet-running portable generator with a 3000W output.",
    ownerId: MOCK_OWNER_ID,
    status: "approved",
  },
  {
    id: "mock-lighting-131",
    name: "Professional Stage Lighting",
    image: lightingImage,
    price: 2500,
    category: "Lighting",
    rating: 4.8,
    reviews: 94,
    location: "MG Road",
    availability: "Available",
    description:
      "A set of four high-power LED stage lights with full DMX control.",
    ownerId: MOCK_OWNER_ID,
    status: "approved",
  },
];
