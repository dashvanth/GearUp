// src/pages/Equipment.tsx
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EquipmentItem } from "@/types";
import { mockEquipmentItems } from "@/data/mockData";
import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer"; // <-- REMOVED THIS LINE
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function Equipment() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, "equipment"),
      where("status", "==", "approved")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const firestoreItems: EquipmentItem[] = [];
      querySnapshot.forEach((doc) => {
        firestoreItems.push({ id: doc.id, ...doc.data() } as EquipmentItem);
      });

      const combinedItemsMap = new Map(
        mockEquipmentItems.map((item) => [item.id, item])
      );
      firestoreItems.forEach((firestoreItem) => {
        combinedItemsMap.set(firestoreItem.id, firestoreItem);
      });

      setEquipment(Array.from(combinedItemsMap.values()));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Our Equipment
          </h1>
          <p className="mt-6 text-lg leading-8 text-text-secondary">
            Find the perfect gear for your next project. High-quality equipment,
            ready when you are.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-primary">Loading equipment...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {equipment.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col overflow-hidden bg-surface/30 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
                  <CardHeader className="p-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg text-foreground truncate">
                        {item.name}
                      </h3>
                      <Badge variant="secondary">{item.category}</Badge>
                    </div>
                    <div className="flex items-center text-sm text-text-muted mt-2">
                      <Star className="w-4 h-4 mr-1 text-primary fill-primary" />
                      <span>
                        {item.rating} ({item.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-text-muted mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{item.location}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center">
                    <p className="font-bold text-primary text-lg">
                      ₹{item.price.toLocaleString("en-IN")}
                      <span className="text-sm font-normal text-text-muted">
                        /day
                      </span>
                    </p>
                    <Link to={`/equipment/${item.id}`}>
                      <Button variant="hero">View</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
      {/* <Footer /> */} {/* <-- REMOVED THIS LINE */}
    </div>
  );
}
