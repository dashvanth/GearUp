// src/components/auth/AuthButton.tsx
import React from "react";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

export const AuthButton: React.FC = () => {
  const { user, signOut, loading } = useAuth(); // Destructure the loading state
  const navigate = useNavigate();

  // While checking the auth state, show a placeholder
  if (loading) {
    return <Skeleton className="h-9 w-24" />;
  }

  // If a user is logged in, show the user menu
  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <User size={16} />
            <span className="hidden md:inline">{user.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-surface border-border">
          <DropdownMenuItem
            onClick={() => navigate("/dashboard")}
            className="text-foreground hover:bg-surface-secondary cursor-pointer"
          >
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={signOut}
            className="text-destructive hover:bg-surface-secondary cursor-pointer"
          >
            <LogOut size={16} className="mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // If no user is logged in, show the Login and Sign Up buttons
  return (
    <div className="flex items-center space-x-3">
      <Button
        asChild
        variant="ghost"
        className="text-foreground hover:text-primary"
      >
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild variant="hero" size="sm">
        <Link to="/signup">Sign Up</Link>
      </Button>
    </div>
  );
};
