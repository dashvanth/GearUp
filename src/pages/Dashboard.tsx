// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Calendar,
  User,
  Settings,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Booking, PlatformUser, EquipmentItem } from "@/types";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// --- Helper Component for Renter's View ---
const RenterView = ({
  bookings,
  isLoading,
}: {
  bookings: Booking[];
  isLoading: boolean;
}) => (
  <Card className="bg-surface/30 border-border">
    <CardHeader>
      <CardTitle>My Rentals</CardTitle>
      <CardDescription>
        A list of all your active and past equipment rentals.
      </CardDescription>
    </CardHeader>
    <CardContent>
      {isLoading ? (
        <div className="flex justify-center py-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg bg-surface/50 border border-border"
            >
              <div>
                <p className="font-semibold text-foreground">
                  {booking.equipmentName}
                </p>
                <p className="text-sm text-text-muted">
                  {format(
                    new Date(booking.startDate.seconds * 1000),
                    "dd LLL, yyyy"
                  )}{" "}
                  -{" "}
                  {format(
                    new Date(booking.endDate.seconds * 1000),
                    "dd LLL, yyyy"
                  )}
                </p>
              </div>
              <div className="mt-2 md:mt-0 text-right">
                <p className="font-bold text-primary">
                  ₹{booking.totalPrice.toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-text-secondary capitalize">
                  {booking.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-text-muted py-4">
          You have no rentals yet. Start by Browse our equipment!
        </p>
      )}
    </CardContent>
  </Card>
);

// --- Helper Component for Owner's View ---
const OwnerView = () => {
  const navigate = useNavigate();
  return (
    <Card className="bg-surface/30 border-border">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common tasks for your owner account.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <Button variant="hero" onClick={() => navigate("/equipment/new")}>
          Add New Equipment
        </Button>
        <Button variant="outline" onClick={() => navigate("/owner/listings")}>
          Manage Listings
        </Button>
      </CardContent>
    </Card>
  );
};

// --- Helper Component for Admin's View ---
const AdminView = ({
  pendingEquipment,
  onUpdate,
  isLoading,
}: {
  pendingEquipment: EquipmentItem[];
  onUpdate: () => void;
  isLoading: boolean;
}) => {
  const handleApproval = async (
    id: string,
    newStatus: "approved" | "rejected"
  ) => {
    try {
      if (newStatus === "approved") {
        const docRef = doc(db, "equipment", id);
        await updateDoc(docRef, { status: "approved" });
        toast.success("Equipment approved and is now live.");
      } else {
        await deleteDoc(doc(db, "equipment", id));
        toast.success("Equipment rejected and has been removed.");
      }
      onUpdate(); // Refresh the list
    } catch (error) {
      toast.error("An error occurred while updating the status.");
    }
  };

  return (
    <Card className="bg-surface/30 border-border">
      <CardHeader>
        <CardTitle>Pending Equipment Approvals</CardTitle>
        <CardDescription>
          Review and approve new equipment listings from owners.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : pendingEquipment.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingEquipment.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>₹{item.price.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="text-green-500"
                      onClick={() => handleApproval(item.id, "approved")}
                    >
                      <CheckCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleApproval(item.id, "rejected")}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-text-muted py-4">
            No equipment pending approval.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

// --- Main Dashboard Component ---
const Dashboard = () => {
  const { user, loading: userLoading } = useAuth();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [allUsers, setAllUsers] = useState<PlatformUser[]>([]);
  const [allEquipment, setAllEquipment] = useState<EquipmentItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const fetchData = async () => {
    if (!user) return;
    setDataLoading(true);
    try {
      if (user.role === "renter") {
        const q = query(
          collection(db, "bookings"),
          where("userId", "==", user.id)
        );
        const snapshot = await getDocs(q);
        setBookings(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Booking))
        );
      } else if (user.role === "admin") {
        const usersSnapshot = await getDocs(collection(db, "users"));
        setAllUsers(
          usersSnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as PlatformUser)
          )
        );

        const equipmentSnapshot = await getDocs(collection(db, "equipment"));
        setAllEquipment(
          equipmentSnapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as EquipmentItem)
          )
        );
      }
    } catch (error) {
      toast.error("Failed to load dashboard data.");
      console.error("Failed to fetch data:", error);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  if (userLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Access Denied
          </h1>
          <p className="text-text-secondary mb-6">
            Please log in to access your dashboard.
          </p>
          <Button variant="hero" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const pendingEquipment = allEquipment.filter(
    (item) => item.status === "pending"
  );

  const getDashboardCards = () => {
    switch (user.role) {
      case "admin":
        return [
          {
            title: "Total Users",
            value: allUsers.length.toString(),
            icon: User,
            description: "All registered users",
          },
          {
            title: "Total Equipment",
            value: allEquipment.length.toString(),
            icon: Package,
            description: "All listed items",
          },
          {
            title: "Pending Approvals",
            value: pendingEquipment.length.toString(),
            icon: Settings,
            description: "Items needing review",
          },
          {
            title: "Total Bookings",
            value: "0",
            icon: Calendar,
            description: "Platform-wide bookings",
          },
        ];
      case "owner":
        return [
          {
            title: "My Equipment",
            value: "0",
            icon: Package,
            description: "Your active listings",
          },
          {
            title: "Bookings",
            value: "0",
            icon: Calendar,
            description: "Current rentals",
          },
          {
            title: "Revenue",
            value: "₹0",
            icon: User,
            description: "This month",
          },
          {
            title: "Reviews",
            value: "N/A",
            icon: Settings,
            description: "Average rating",
          },
        ];
      default: // Renter
        return [
          {
            title: "Active Rentals",
            value: bookings.length.toString(),
            icon: Package,
            description: "Currently rented",
          },
          {
            title: "Upcoming",
            value: "0",
            icon: Calendar,
            description: "Future bookings",
          },
          {
            title: "Completed",
            value: "0",
            icon: User,
            description: "Past rentals",
          },
          {
            title: "Favorites",
            value: "0",
            icon: Settings,
            description: "Saved equipment",
          },
        ];
    }
  };

  const dashboardDetails = {
    admin: {
      title: "Admin Dashboard",
      description: "Oversee all platform activity, users, and equipment.",
    },
    owner: {
      title: "Owner Dashboard",
      description: "Manage your equipment listings and rental requests.",
    },
    renter: {
      title: "Renter Dashboard",
      description: "Track your bookings and explore new equipment.",
    },
  };

  const cards = getDashboardCards();
  const details = dashboardDetails[user.role];

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {details.title}
            </h1>
            <p className="text-text-secondary">{details.description}</p>
            <p className="text-sm text-text-muted mt-2">
              Welcome back, {user.email}!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {cards.map((card, index) => (
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
                    <div className="text-2xl font-bold text-foreground">
                      {card.value}
                    </div>
                    <p className="text-xs text-text-muted">
                      {card.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {user.role === "renter" && (
              <RenterView bookings={bookings} isLoading={dataLoading} />
            )}
            {user.role === "owner" && <OwnerView />}
            {user.role === "admin" && (
              <AdminView
                pendingEquipment={pendingEquipment}
                onUpdate={fetchData}
                isLoading={dataLoading}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
