// src/pages/EditEquipmentPage.tsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Edit } from "lucide-react";
import { EquipmentItem } from "@/types";

export default function EditEquipmentPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth(); // We'll use the user object for the ownership check
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<EquipmentItem>>({});

  useEffect(() => {
    const fetchEquipment = async () => {
      // Return early if we don't have the necessary info
      if (!id || !user) return;

      const docRef = doc(db, "equipment", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const equipmentData = docSnap.data() as EquipmentItem;

        // --- SECURITY CHECK ---
        // Verify that the logged-in user is the owner of this equipment
        if (equipmentData.ownerId !== user.id) {
          toast.error("Access Denied", {
            description: "You are not authorized to edit this listing.",
          });
          navigate("/dashboard"); // Redirect unauthorized users
          return;
        }

        setFormData(equipmentData);
      } else {
        toast.error("Equipment not found.");
        navigate("/owner/listings");
      }
    };

    // We add 'user' to the dependency array to ensure this runs after the user is loaded
    fetchEquipment();
  }, [id, navigate, user]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsLoading(true);
    try {
      const docRef = doc(db, "equipment", id);
      // The updateDoc will now only be called if the ownership check passed in useEffect
      await updateDoc(docRef, {
        ...formData,
        price: Number(formData.price), // Ensure price is a number
      });
      toast.success("Listing updated successfully!");
      navigate("/owner/listings");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error("Failed to update listing", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <Card className="bg-surface/30 border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Edit /> Edit Equipment Listing
              </CardTitle>
              <CardDescription>
                Update the details for your equipment listing below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Equipment Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Day (₹)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      name="category"
                      value={formData.category || ""}
                      onValueChange={(value) =>
                        handleSelectChange("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Photography">Photography</SelectItem>
                        <SelectItem value="Tools">Tools</SelectItem>
                        <SelectItem value="Aerial">Aerial</SelectItem>
                        <SelectItem value="Power">Power</SelectItem>
                        <SelectItem value="Lighting">Lighting</SelectItem>
                        <SelectItem value="Audio">Audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                  variant="hero"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
