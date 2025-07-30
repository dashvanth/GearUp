// src/pages/Index.tsx
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  CalendarDays,
  Headphones,
  Camera,
  Zap,
  MicVocal,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

// New "Why Choose Us" Component
const WhyChooseUs = () => (
  <div className="py-24 bg-black">
    <div className="container mx-auto px-4 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-4"
      >
        Why Rent from <span className="text-gradient">GearUp</span>?
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-lg text-text-secondary max-w-3xl mx-auto mb-16"
      >
        We are committed to providing professionals and enthusiasts with
        reliable, top-tier equipment and unparalleled service.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            icon: <ShieldCheck size={40} className="text-primary" />,
            title: "Pro-Grade Quality",
            desc: "Every item is professionally maintained, inspected, and guaranteed to perform.",
          },
          {
            icon: <CalendarDays size={40} className="text-primary" />,
            title: "Flexible Rentals",
            desc: "Rent for a day, a week, or a month. We offer plans that fit your project's timeline.",
          },
          {
            icon: <Headphones size={40} className="text-primary" />,
            title: "24/7 Expert Support",
            desc: "Our experienced team is always available to help you with setup and troubleshooting.",
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <Card className="bg-surface/50 border-border h-full p-8 text-center hover-lift transition-all duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// New "Popular Categories" Component
const PopularCategories = () => (
  <div className="py-24">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-16"
      >
        Explore Popular Categories
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: <Camera size={32} />,
            title: "Cameras & Lenses",
            bgClass: "bg-category-camera",
          },
          {
            icon: <Zap size={32} />,
            title: "Lighting Kits",
            bgClass: "bg-category-lighting",
          },
          {
            icon: <MicVocal size={32} />,
            title: "Pro Audio",
            bgClass: "bg-category-audio",
          },
        ].map((cat, index) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link to="/equipment">
              <Card className="h-64 relative overflow-hidden rounded-xl group border-2 border-transparent hover:border-primary transition-all duration-300">
                <div
                  className={`absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110 ${cat.bgClass}`}
                ></div>
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition-all duration-300"></div>
                <CardContent className="relative z-10 flex flex-col items-center justify-center h-full text-white space-y-4">
                  {cat.icon}
                  <h3 className="text-3xl font-bold">{cat.title}</h3>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <WhyChooseUs />
        <PopularCategories />
        {/* We can add more sections like "How It Works" or "Featured Items" here later */}
      </main>
    </div>
  );
};

export default Index;
