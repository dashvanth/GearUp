// src/pages/ProductDetailPage.tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { EquipmentItem } from "@/types";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Star, MapPin, Wallet } from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays, format, differenceInCalendarDays } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import { mockEquipmentItems } from "@/data/mockData"; // <-- Import mock data

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, loading: userLoading } = useAuth();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState<EquipmentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const today = new Date();
  const [date, setDate] = useState<DateRange | undefined>({
    from: today,
    to: addDays(today, 4),
  });

  useEffect(() => {
    const fetchEquipment = async () => {
      if (!id) return;
      setLoading(true);

      // --- SMART DATA FETCHING LOGIC ---
      if (id.startsWith("mock-")) {
        // It's a mock item, find it in the local array
        const mockItem = mockEquipmentItems.find((item) => item.id === id);
        if (mockItem) {
          setEquipment(mockItem);
        } else {
          toast.error("Mock equipment not found.");
          navigate("/equipment");
        }
      } else {
        // It's a real item, fetch it from Firestore
        try {
          const docRef = doc(db, "equipment", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setEquipment({
              id: docSnap.id,
              ...docSnap.data(),
            } as EquipmentItem);
          } else {
            toast.error("Equipment not found.");
            navigate("/equipment");
          }
        } catch (error) {
          toast.error("Failed to fetch equipment details.");
        }
      }
      setLoading(false);
    };

    fetchEquipment();
  }, [id, navigate]);

  // The rest of the component (handleBooking, calculatePrice, JSX) remains the same
  // ...

  const handleBooking = async () => {
    if (!user) {
      toast.error("You must be logged in to book an item.", {
        action: {
          label: "Login",
          onClick: () => navigate("/login"),
        },
      });
      return;
    }

    if (!date?.from || !date?.to || !equipment) {
      toast.error("Please select a valid date range.");
      return;
    }

    setBookingLoading(true);
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user.id,
        equipmentId: equipment.id,
        equipmentName: equipment.name,
        startDate: date.from,
        endDate: date.to,
        totalPrice: calculatePrice(),
        status: "confirmed",
        bookedAt: serverTimestamp(),
      });
      toast.success("Booking successful!", {
        description: `You have rented ${equipment.name} from ${format(
          date.from,
          "PPP"
        )} to ${format(date.to, "PPP")}.`,
      });
      navigate("/dashboard");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error("Booking failed", { description: errorMessage });
    } finally {
      setBookingLoading(false);
    }
  };

  const calculatePrice = () => {
    if (date?.from && date?.to && equipment) {
      const days = differenceInCalendarDays(date.to, date.from) + 1;
      return days * equipment.price;
    }
    return 0;
  };

  if (loading || userLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!equipment) {
    return null; // Should be handled by the redirect logic above
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <img
                src={equipment.image}
                alt={equipment.name}
                className="w-full h-auto max-h-[500px] object-cover rounded-2xl border border-border shadow-lg"
              />
              <div className="mt-8">
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {equipment.name}
                </h1>
                <div className="flex items-center gap-6 mb-4 text-text-secondary">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-primary text-primary" />{" "}
                    <span className="font-medium">{equipment.rating}</span>{" "}
                    <span>({equipment.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-5 h-5" />{" "}
                    <span>{equipment.location}</span>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  {equipment.description}
                </p>
              </div>
            </div>
            <div>
              <Card className="bg-surface border-border shadow-glow sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-primary">
                      ₹{equipment.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-text-muted">/day</span>
                  </div>
                  <div className="flex justify-center">
                    <Calendar
                      mode="range"
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={1}
                      disabled={{ before: today }}
                    />
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">
                        Selected Dates
                      </span>
                      <span className="font-medium text-foreground">
                        {date?.from ? format(date.from, "dd LLL") : ""} -{" "}
                        {date?.to ? format(date.to, "dd LLL y") : ""}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-lg">
                      <span className="font-semibold text-text-secondary">
                        Total Price
                      </span>
                      <span className="font-bold text-primary">
                        ₹{calculatePrice().toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={handleBooking}
                    disabled={bookingLoading}
                    size="lg"
                    className="w-full mt-6"
                    variant="hero"
                  >
                    {bookingLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Book Now"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
