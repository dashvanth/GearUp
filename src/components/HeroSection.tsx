import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import EquipmentCarousel3D from './EquipmentCarousel3D';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-surface border border-primary/30 rounded-full text-sm text-primary">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-glow-pulse"></span>
            Equipment Rental Platform
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-gradient">Rent</span> Equipment
              <br />
              <span className="text-foreground">Store</span>
            </h1>
            
            <p className="text-xl text-text-secondary max-w-lg leading-relaxed">
              We rent equipment for days, weeks, or even months based on your need. 
              Register, login, and view the equipment available.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="group">
              See Available Equipment
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="glow" size="xl" className="group">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 pt-8">
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-text-muted text-sm">Equipment Items</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">1200+</div>
              <div className="text-text-muted text-sm">Happy Customers</div>
            </div>
            <div className="space-y-1">
              <div className="text-3xl font-bold text-primary">24/7</div>
              <div className="text-text-muted text-sm">Support</div>
            </div>
          </div>
        </div>

        {/* Right Content - 3D Carousel */}
        <div className="relative animate-slide-up">
          <EquipmentCarousel3D />
          
          {/* Floating Cards */}
          <div className="absolute -top-4 -left-4 bg-surface border border-primary/30 rounded-lg p-4 shadow-glow animate-float">
            <div className="text-sm text-primary font-semibold">Premium Quality</div>
            <div className="text-xs text-text-muted">Professional Grade Equipment</div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 bg-surface border border-primary/30 rounded-lg p-4 shadow-glow animate-float" style={{animationDelay: '1s'}}>
            <div className="text-sm text-primary font-semibold">Fast Delivery</div>
            <div className="text-xs text-text-muted">Same Day Pickup Available</div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}