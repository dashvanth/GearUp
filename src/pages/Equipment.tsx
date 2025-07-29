import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Star, Clock, MapPin } from 'lucide-react';
import tripodImage from '@/assets/equipment-tripod.jpg';
import droneImage from '@/assets/equipment-drone.jpg';
import drillImage from '@/assets/equipment-drill.jpg';
import cameraImage from '@/assets/equipment-camera.jpg';
import generatorImage from '@/assets/equipment-generator.jpg';
import lightingImage from '@/assets/equipment-lighting.jpg';

const equipmentItems = [
  {
    id: 1,
    name: "Professional Camera Tripod",
    image: tripodImage,
    price: 25,
    category: "Photography",
    rating: 4.8,
    reviews: 124,
    location: "Downtown",
    availability: "Available",
    description: "Heavy-duty carbon fiber tripod with smooth pan and tilt controls."
  },
  {
    id: 2,
    name: "Professional Drone 4K",
    image: droneImage,
    price: 150,
    category: "Aerial",
    rating: 4.9,
    reviews: 89,
    location: "Tech District",
    availability: "Available",
    description: "High-performance drone with 4K camera and advanced flight controls."
  },
  {
    id: 3,
    name: "Cordless Power Drill",
    image: drillImage,
    price: 30,
    category: "Tools",
    rating: 4.7,
    reviews: 156,
    location: "Industrial Zone",
    availability: "Rented",
    description: "Professional-grade cordless drill with multiple speed settings."
  },
  {
    id: 4,
    name: "DSLR Camera Kit",
    image: cameraImage,
    price: 80,
    category: "Photography",
    rating: 4.9,
    reviews: 203,
    location: "Creative Quarter",
    availability: "Available",
    description: "Full-frame DSLR with multiple lenses and accessories."
  },
  {
    id: 5,
    name: "Portable Power Generator",
    image: generatorImage,
    price: 120,
    category: "Power",
    rating: 4.6,
    reviews: 67,
    location: "Construction Hub",
    availability: "Available",
    description: "Quiet-running generator perfect for outdoor events and construction."
  },
  {
    id: 6,
    name: "Professional Stage Lighting",
    image: lightingImage,
    price: 90,
    category: "Lighting",
    rating: 4.8,
    reviews: 94,
    location: "Entertainment District",
    availability: "Available",
    description: "LED stage lighting with DMX control and color mixing."
  }
];

const categories = ["All", "Photography", "Tools", "Aerial", "Power", "Lighting"];

export default function Equipment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const filteredItems = equipmentItems
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || item.category === selectedCategory)
    )
    .sort((a, b) => {
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
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Available <span className="text-gradient">Equipment</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Browse our extensive collection of professional-grade equipment for rent
          </p>
        </div>

        {/* Filters */}
        <div className="bg-surface border border-border rounded-xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted w-5 h-5" />
              <Input
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort */}
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

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="bg-surface border-border hover:shadow-glow hover:border-primary/30 transition-all duration-300 hover-lift group">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={item.availability === "Available" ? "default" : "secondary"}>
                      {item.availability}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline">{item.category}</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 text-foreground">{item.name}</CardTitle>
                <p className="text-text-muted text-sm mb-3 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">{item.rating}</span>
                    <span className="text-text-muted text-sm">({item.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-text-muted text-sm">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-primary">
                    ${item.price}<span className="text-sm text-text-muted">/day</span>
                  </div>
                  <div className="flex items-center gap-1 text-text-muted text-sm">
                    <Clock className="w-4 h-4" />
                    Quick pickup
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button 
                  className="w-full" 
                  variant={item.availability === "Available" ? "hero" : "outline"}
                  disabled={item.availability !== "Available"}
                >
                  {item.availability === "Available" ? "Rent Now" : "Currently Rented"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Equipment
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}