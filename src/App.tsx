// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ManageListingsPage from "./pages/ManageListingsPage";
import EditEquipmentPage from "./pages/EditEquipmentPage";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/equipment/:id" element={<ProductDetailPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/equipment/new" element={<AddEquipmentPage />} />
          <Route path="/owner/listings" element={<ManageListingsPage />} />
          <Route
            path="/owner/listings/edit/:id"
            element={<EditEquipmentPage />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
