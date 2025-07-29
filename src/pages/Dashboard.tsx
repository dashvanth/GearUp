import React from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar, User, Settings } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-text-secondary mb-6">Please log in to access your dashboard.</p>
          <Button variant="hero" onClick={() => window.location.href = '/'}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  const getDashboardContent = () => {
    switch (user.role) {
      case 'admin':
        return {
          title: 'Admin Dashboard',
          description: 'Manage users, equipment, and site settings',
          cards: [
            { title: 'Users', value: '1,234', icon: User, description: 'Total registered users' },
            { title: 'Equipment', value: '567', icon: Package, description: 'Total equipment listings' },
            { title: 'Bookings', value: '89', icon: Calendar, description: 'Active bookings' },
            { title: 'Settings', value: 'Configure', icon: Settings, description: 'Site configuration' }
          ]
        };
      case 'owner':
        return {
          title: 'Owner Dashboard',
          description: 'Manage your equipment listings and rental requests',
          cards: [
            { title: 'My Equipment', value: '12', icon: Package, description: 'Your active listings' },
            { title: 'Bookings', value: '5', icon: Calendar, description: 'Current rentals' },
            { title: 'Revenue', value: '$2,340', icon: User, description: 'This month' },
            { title: 'Reviews', value: '4.8', icon: Settings, description: 'Average rating' }
          ]
        };
      case 'renter':
      default:
        return {
          title: 'Renter Dashboard',
          description: 'Track your bookings and explore new equipment',
          cards: [
            { title: 'Active Rentals', value: '3', icon: Package, description: 'Currently rented' },
            { title: 'Upcoming', value: '2', icon: Calendar, description: 'Future bookings' },
            { title: 'Completed', value: '15', icon: User, description: 'Past rentals' },
            { title: 'Favorites', value: '8', icon: Settings, description: 'Saved equipment' }
          ]
        };
    }
  };

  const content = getDashboardContent();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">{content.title}</h1>
            <p className="text-text-secondary">{content.description}</p>
            <p className="text-sm text-text-muted mt-2">Welcome back, {user.email}!</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {content.cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-surface/50 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow-red/20">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-foreground/80">
                      {card.title}
                    </CardTitle>
                    <card.icon className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{card.value}</div>
                    <p className="text-xs text-text-muted">{card.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-surface/30 border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks for your role as {user.role}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                {user.role === 'renter' && (
                  <>
                    <Button variant="hero">Browse Equipment</Button>
                    <Button variant="outline">View My Rentals</Button>
                    <Button variant="ghost">Update Profile</Button>
                  </>
                )}
                {user.role === 'owner' && (
                  <>
                    <Button variant="hero">Add New Equipment</Button>
                    <Button variant="outline">Manage Listings</Button>
                    <Button variant="ghost">View Analytics</Button>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <Button variant="hero">Approve Equipment</Button>
                    <Button variant="outline">Manage Users</Button>
                    <Button variant="ghost">Site Settings</Button>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;