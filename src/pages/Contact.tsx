import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, MessageSquare, HeadphonesIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    issueType: 'general',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', issueType: 'general', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Call us for immediate assistance"
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      details: ["support@gearup.com", "rentals@gearup.com"],
      description: "Send us your inquiries"
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Office",
      details: ["123 Tech Street", "Innovation District, NY 10001"],
      description: "Visit our headquarters"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Business Hours",
      details: ["Mon - Fri: 8:00 AM - 8:00 PM", "Sat - Sun: 10:00 AM - 6:00 PM"],
      description: "We're here when you need us"
    }
  ];

  const faqItems = [
    {
      question: "How far in advance should I book equipment?",
      answer: "We recommend booking at least 24-48 hours in advance, especially for popular items. However, we often have equipment available for same-day rental."
    },
    {
      question: "What happens if equipment gets damaged?",
      answer: "All rentals include basic damage protection. For accidental damage, you'll only pay a small deductible. We also offer additional insurance options."
    },
    {
      question: "Do you offer delivery and pickup?",
      answer: "Yes! We provide delivery and pickup services within a 25-mile radius of our locations. Delivery fees vary based on distance and equipment size."
    },
    {
      question: "Can I extend my rental period?",
      answer: "Absolutely! You can extend your rental through our website or by calling us, subject to equipment availability."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Have questions? Need support? We're here to help you get the equipment you need.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-surface border-border shadow-glow">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Your Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Issue Type
                    </label>
                    <select
                      name="issueType"
                      value={formData.issueType}
                      onChange={handleChange}
                      className="w-full bg-input border border-border rounded-lg px-3 py-2 text-foreground"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="rental">Rental Question</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing Issue</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your inquiry in detail..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-surface border-border hover:shadow-glow hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-text-secondary text-sm mb-1">{detail}</p>
                      ))}
                      <p className="text-text-muted text-xs mt-2">{info.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Quick Support */}
            <Card className="bg-gradient-dark border-primary/30 shadow-glow">
              <CardContent className="p-6 text-center">
                <HeadphonesIcon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Need Immediate Help?</h3>
                <p className="text-text-secondary mb-4">
                  Our support team is available 24/7 for urgent rental needs and technical issues.
                </p>
                <Button variant="hero" size="sm" className="w-full">
                  Call Now: (555) 123-4567
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-xl text-text-secondary">
              Quick answers to common questions about our rental services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqItems.map((item, index) => (
              <Card key={index} className="bg-surface border-border hover:shadow-glow hover:border-primary/30 transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">{item.question}</h3>
                  <p className="text-text-secondary leading-relaxed">{item.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          </section>
        </div>
      </div>
    </div>
  );
}