// src/pages/Equipment.tsx
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Star, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { EquipmentItem } from "@/types";
import { mockEquipmentItems } from "@/data/mockData"; // <-- Import from new location

const categories = [
  "All",
  "Photography",
  "Tools",
  "Aerial",
  "Power",
  "Lighting",
];

export default function Equipment() {
  const [equipmentItems] = useState<EquipmentItem[]>(mockEquipmentItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const filteredItems = equipmentItems
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedCategory === "All" || item.category === selectedCategory)
    )
    .sort((a, b) => {
      // Sorting logic remains the same...
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Available <span className="text-gradient">Equipment</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Browse our extensive collection of professional-grade equipment
              for rent
            </p>
          </div>

          {/* Filters (remain the same) */}
          <div className="bg-surface border border-border rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
                <Input
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface border border-border rounded-lg px-4 py-2 text-foreground"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>

          {/* Grid (remains the same) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="bg-surface border-border hover:shadow-glow hover:border-primary/30 transition-all duration-300 hover-lift group"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={
                          item.availability === "Available"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {item.availability}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 text-foreground">
                    {item.name}
                  </CardTitle>
                  <p className="text-text-muted text-sm mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />{" "}
                      <span className="text-sm font-medium">{item.rating}</span>{" "}
                      <span className="text-text-muted text-sm">
                        ({item.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-text-muted text-sm">
                      <MapPin className="w-4 h-4" /> {item.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">
                      ₹{item.price.toLocaleString("en-IN")}
                      <span className="text-sm text-text-muted">/day</span>
                    </div>
                    <div className="flex items-center gap-1 text-text-muted text-sm">
                      <Clock className="w-4 h-4" /> Quick pickup
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    asChild
                    className="w-full"
                    variant={
                      item.availability === "Available" ? "hero" : "outline"
                    }
                    disabled={item.availability !== "Available"}
                  >
                    <Link to={`/equipment/${item.id}`}>
                      {item.availability === "Available"
                        ? "View & Rent"
                        : "Currently Rented"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
