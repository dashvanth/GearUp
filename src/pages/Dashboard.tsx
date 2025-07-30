// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Edit, Trash2 } from "lucide-react";
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
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Booking, EquipmentItem } from "@/types";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
  const { user, loading: userLoading } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [ownerListings, setOwnerListings] = useState<EquipmentItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setDataLoading(false);
        return;
      }
      try {
        if (user.role === "renter") {
          const q = query(
            collection(db, "bookings"),
            where("userId", "==", user.id)
          );
          const snapshot = await getDocs(q);
          setBookings(
            snapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as Booking)
            )
          );
        } else if (user.role === "owner") {
          const q = query(
            collection(db, "equipment"),
            where("ownerId", "==", user.id)
          );
          const snapshot = await getDocs(q);
          setOwnerListings(
            snapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as EquipmentItem)
            )
          );
        }
      } catch (error) {
        toast.error("Failed to load dashboard data.");
      } finally {
        setDataLoading(false);
      }
    };
    if (!userLoading) {
      fetchData();
    }
  }, [user, userLoading]);

  const handleListingDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "equipment", id));
      setOwnerListings((prev) => prev.filter((item) => item.id !== id));
      toast.success("Listing deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete listing.");
    }
  };

  if (userLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center">
        <div>
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

  const dashboardDetails = {
    owner: {
      title: "Owner Dashboard",
      description: "Manage your equipment and rentals.",
    },
    renter: {
      title: "Renter Dashboard",
      description: "Track your bookings and find gear.",
    },
  };

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
              {dashboardDetails[user.role].title}
            </h1>
            <p className="text-text-secondary">
              {dashboardDetails[user.role].description}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {user.role === "renter" && (
              <Card className="bg-surface/30 border-border">
                <CardHeader>
                  <CardTitle>My Rentals</CardTitle>
                  <CardDescription>
                    Your active and past equipment rentals.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div
                          key={booking.id}
                          className="flex justify-between items-center p-4 rounded-lg bg-surface/50 border border-border"
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
                          <div className="text-right">
                            <p className="font-bold text-primary">
                              ₹{booking.totalPrice.toLocaleString("en-IN")}
                            </p>
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "default"
                                  : booking.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                              }
                              className="capitalize"
                            >
                              {booking.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-text-muted py-4">
                      You have no rentals yet.
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
            {user.role === "owner" && (
              <Card className="bg-surface/30 border-border">
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <CardTitle>My Equipment Listings</CardTitle>
                      <CardDescription>
                        Manage your equipment for rent.
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => navigate("/owner/requests")}
                      >
                        Manage Requests
                      </Button>
                      <Button
                        variant="hero"
                        onClick={() => navigate("/equipment/new")}
                      >
                        Add New Equipment
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {ownerListings.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Price/Day</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ownerListings.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {item.name}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  item.availability === "Available"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {item.availability}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              ₹{item.price.toLocaleString("en-IN")}
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  navigate(`/owner/listings/edit/${item.id}`)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="icon">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will permanently delete your "
                                      {item.name}" listing.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() =>
                                        handleListingDelete(item.id)
                                      }
                                    >
                                      Continue
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-text-muted mb-4">
                        You haven't listed any equipment yet.
                      </p>
                      <Button
                        variant="hero"
                        onClick={() => navigate("/equipment/new")}
                      >
                        List Your First Item
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
