// src/components/Navbar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings, Bell } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Notification } from "@/types";
import { formatDistanceToNow } from "date-fns";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { user, loading, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "notifications"),
        where("userId", "==", user.id),
        orderBy("createdAt", "desc"),
        limit(10)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const notifs = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Notification)
        );
        setNotifications(notifs);
        setUnreadCount(notifs.filter((n) => !n.isRead).length);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      await updateDoc(doc(db, "notifications", notification.id), {
        isRead: true,
      });
    }
    navigate(notification.link);
  };

  const AuthContent = () => {
    if (loading) {
      return <Skeleton className="h-10 w-48" />;
    }
    if (user) {
      return (
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 mr-4">
              <div className="p-2">
                <h4 className="font-medium leading-none px-2">Notifications</h4>
                <div className="mt-2 space-y-1">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif)}
                        className={`p-2 rounded-md cursor-pointer hover:bg-muted/50 ${
                          !notif.isRead
                            ? "bg-muted font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        <p className="text-sm">{notif.message}</p>
                        <p className="text-xs mt-1">
                          {formatDistanceToNow(
                            new Date(notif.createdAt.seconds * 1000),
                            { addSuffix: true }
                          )}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-center text-muted-foreground py-4">
                      No new notifications.
                    </p>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
          <Button variant="destructive" onClick={signOut}>
            Logout
          </Button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button variant="hero" onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
      </div>
    );
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Equipment", href: "/equipment" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        hasScrolled
          ? "bg-black/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <Settings className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold text-gradient">GearUp</span>
          </Link>
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                asChild
                variant="ghost"
                className={`text-lg font-medium relative group px-4 py-2 transition-all duration-300 ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-text-secondary hover:text-primary"
                }`}
              >
                <Link to={link.href}>
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-primary blur-md rounded-full transition-opacity duration-300 ${
                      location.pathname === link.href
                        ? "opacity-75"
                        : "opacity-0 group-hover:opacity-50"
                    }`}
                  />
                </Link>
              </Button>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <AuthContent />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-black/95 backdrop-blur-lg border-t border-border p-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Button
                key={link.name}
                asChild
                variant="ghost"
                size="lg"
                className="justify-start text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to={link.href}>{link.name}</Link>
              </Button>
            ))}
            <div className="border-t border-border pt-4">
              <AuthContent />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
