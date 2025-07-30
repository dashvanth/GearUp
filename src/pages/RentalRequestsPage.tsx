// src/pages/RentalRequestsPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, CalendarCheck, HelpCircle } from "lucide-react";
import { Booking } from "@/types";
import { format } from "date-fns";

export default function RentalRequestsPage() {
  const { user, loading: userLoading } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLoading) {
      if (user && user.role === "owner") {
        const fetchRequests = async () => {
          setLoading(true);
          try {
            const q = query(
              collection(db, "bookings"),
              where("ownerId", "==", user.id),
              where("status", "==", "pending")
            );
            const querySnapshot = await getDocs(q);
            const rentalRequests = querySnapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as Booking)
            );
            setRequests(rentalRequests);
          } catch (error) {
            toast.error("Failed to fetch your rental requests.");
          } finally {
            setLoading(false);
          }
        };
        fetchRequests();
      } else {
        toast.error("You must be an owner to view this page.");
        setLoading(false);
        navigate("/dashboard");
      }
    }
  }, [user, userLoading, navigate]);

  const handleRequestUpdate = async (
    booking: Booking,
    newStatus: "confirmed" | "rejected"
  ) => {
    try {
      const docRef = doc(db, "bookings", booking.id);
      await updateDoc(docRef, { status: newStatus });
      await addDoc(collection(db, "notifications"), {
        userId: booking.userId,
        message: `Your request for ${booking.equipmentName} was ${newStatus}.`,
        link: "/dashboard",
        isRead: false,
        createdAt: serverTimestamp(),
      });
      setRequests((prev) => prev.filter((req) => req.id !== booking.id));
      toast.success(`Request has been ${newStatus}.`);
    } catch (error) {
      toast.error("Failed to update the request.");
    }
  };

  if (loading || userLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-surface/30 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <CalendarCheck /> My Rental Requests
              </CardTitle>
              <CardDescription>
                Approve or reject incoming rental requests for your equipment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {requests.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Equipment</TableHead>
                      <TableHead>Renter Email</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((req) => (
                      <TableRow key={req.id}>
                        <TableCell className="font-medium">
                          {req.equipmentName}
                        </TableCell>
                        <TableCell>{req.renterEmail}</TableCell>
                        <TableCell>
                          {format(
                            new Date(req.startDate.seconds * 1000),
                            "dd LLL"
                          )}{" "}
                          -{" "}
                          {format(
                            new Date(req.endDate.seconds * 1000),
                            "dd LLL"
                          )}
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleRequestUpdate(req, "confirmed")
                            }
                          >
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRequestUpdate(req, "rejected")}
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto h-12 w-12 text-text-muted" />
                  <h3 className="mt-4 text-lg font-medium text-foreground">
                    No Pending Requests
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    You currently have no pending rental requests for your
                    items.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
