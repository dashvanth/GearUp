// src/data/mockData.ts
import { EquipmentItem } from "@/types";

// Image Imports
import tripodImage from "@/assets/equipment-tripod.jpg";
import droneImage from "@/assets/equipment-drone.jpg";
import drillImage from "@/assets/equipment-drill.jpg";
import cameraImage from "@/assets/equipment-camera.jpg";
import generatorImage from "@/assets/equipment-generator.jpg";
import lightingImage from "@/assets/equipment-lighting.jpg";

// Hardcoded Mock Data for Showcase
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
      "This heavy-duty carbon fiber tripod offers exceptional stability for professional photographers and videographers. It features smooth pan and tilt controls, a quick-release plate, and adjustable leg locks for setting up on any terrain.",
    ownerId: "mock-owner-_photography-pro", // Added ownerId
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
      "Capture stunning aerial footage with this high-performance drone. Equipped with a 4K camera, 3-axis gimbal stabilization, and advanced flight controls including obstacle avoidance and automated flight paths.",
    ownerId: "mock-owner-aerial-visions", // Added ownerId
  },
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
    description:
      "A professional-grade cordless drill with a brushless motor for maximum power and efficiency. Features multiple speed settings, a built-in LED light, and a long-lasting lithium-ion battery pack.",
    ownerId: "mock-owner-build-it-right", // Added ownerId
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
      "A complete full-frame DSLR camera kit, including a 24-70mm f/2.8 lens, multiple batteries, and a carrying case. Perfect for weddings, events, and professional portrait photography.",
    ownerId: "mock-owner-photo-gear", // Added ownerId
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
    description:
      "A quiet-running portable generator with a 3000W output. Ideal for outdoor events, film sets, and construction sites where reliable power is essential. Features multiple outlets and a digital display.",
    ownerId: "mock-owner-power-solutions", // Added ownerId
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
      "A set of four high-power LED stage lights with full DMX control, color mixing capabilities, and various built-in programs. Perfect for concerts, theater productions, and corporate events.",
    ownerId: "mock-owner-event-lights", // Added ownerId
  },
];
