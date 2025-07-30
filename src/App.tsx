// src/App.tsx
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar

// Page Imports
import Index from "./pages/Index";
import Equipment from "./pages/Equipment";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AddEquipmentPage from "./pages/AddEquipmentPage";
import EditEquipmentPage from "./pages/EditEquipmentPage";
import RentalRequestsPage from "./pages/RentalRequestsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Navbar /> {/* The Navbar is rendered here, outside the Routes */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/equipment/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/equipment/new" element={<AddEquipmentPage />} />
          <Route
            path="/owner/listings/edit/:id"
            element={<EditEquipmentPage />}
          />
          <Route path="/owner/requests" element={<RentalRequestsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />{" "}
        {/* This is required for sonner toasts/notifications to show */}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
