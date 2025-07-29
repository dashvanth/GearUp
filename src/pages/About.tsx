import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Users, Shield, Clock, Award, Zap } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Expert Team",
      description: "Our experienced professionals ensure top-quality equipment and service"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure & Insured",
      description: "All equipment is fully insured and undergoes regular safety inspections"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your rental needs"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Premium Quality",
      description: "Only professional-grade equipment from trusted brands"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Fast Delivery",
      description: "Quick pickup and delivery services across the city"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: "Easy Process",
      description: "Simple booking, transparent pricing, and hassle-free returns"
    }
  ];

  const stats = [
    { number: "500+", label: "Equipment Items" },
    { number: "1200+", label: "Happy Customers" },
    { number: "50+", label: "Equipment Categories" },
    { number: "24/7", label: "Customer Support" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About <span className="text-gradient">GearUp</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing equipment rental by making professional-grade tools 
            and equipment accessible to everyone. From photographers to contractors, 
            we provide the gear you need when you need it.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-surface/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Our <span className="text-gradient">Mission</span>
              </h2>
              <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                At GearUp, we believe that access to professional equipment shouldn't be 
                limited by budget constraints. Our mission is to democratize access to 
                high-quality tools and equipment, enabling creators, professionals, and 
                enthusiasts to bring their projects to life.
              </p>
              <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                Whether you're a weekend warrior tackling a home project, a professional 
                photographer on assignment, or a contractor needing specialized tools, 
                we've got you covered with our extensive inventory and exceptional service.
              </p>
              <Button variant="hero" size="lg">
                Start Renting Today
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-dark rounded-2xl p-8 shadow-glow">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-text-muted text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">GearUp</span>?
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              We're committed to providing the best rental experience with 
              top-quality equipment and exceptional service.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-surface border-border hover:shadow-glow hover:border-primary/30 transition-all duration-300 hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-surface/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Our <span className="text-gradient">Story</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Founded in 2020 by a team of industry professionals who understood the 
              challenges of accessing quality equipment, GearUp has grown from a local 
              startup to a trusted platform serving thousands of customers.
            </p>
          </div>

          <div className="bg-gradient-dark rounded-2xl p-8 md:p-12 shadow-glow">
            <div className="grid lg:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Founded</h3>
                <p className="text-4xl font-bold mb-2">2020</p>
                <p className="text-text-muted">Started with a vision to democratize equipment access</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Growth</h3>
                <p className="text-4xl font-bold mb-2">300%</p>
                <p className="text-text-muted">Year-over-year customer growth</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Satisfaction</h3>
                <p className="text-4xl font-bold mb-2">98%</p>
                <p className="text-text-muted">Customer satisfaction rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get <span className="text-gradient">Started</span>?
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust GearUp for their equipment needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl">
              Browse Equipment
            </Button>
            <Button variant="outline" size="xl">
              Contact Us
            </Button>
          </div>
          </div>
        </section>
      </div>
    </div>
  );
}