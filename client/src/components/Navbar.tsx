import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, ShoppingCart, User, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/_core/hooks/useAuth';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'AI Solutions', href: '/ai-solutions' },
  { name: 'Community', href: '/community' },
  { name: 'Marketplace', href: '/marketplace' },
  { name: 'Learn', href: '/learning' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  // Get cart item count
  const { data: cartItems } = trpc.ecommerce.cart.get.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const cartItemCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.info("Coming Soon! Account creation is currently disabled.", {
      duration: 3000,
    });
  };

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-white/70 border-b border-white/20 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight text-slate-900">
              AfriAgroCore
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link, index) => (
              <div key={link.name} className="flex items-center">
                <Link 
                  href={link.href}
                  className={`font-medium transition-colors relative group px-3 py-2 rounded-md whitespace-nowrap ${
                    location === link.href 
                      ? 'text-emerald-600' 
                      : 'text-slate-600 hover:text-emerald-600'
                  }`}
                >
                  {link.name}
                  <span className={`absolute left-3 bottom-0 h-0.5 bg-emerald-600 transition-all ${
                    location === link.href
                      ? 'w-[calc(100%-24px)]'
                      : 'w-0 group-hover:w-[calc(100%-24px)]'
                  }`}></span>
                </Link>
                {index < navLinks.length - 1 && <div className="h-5 w-px bg-slate-300 mx-1"></div>}
              </div>
            ))}

            {/* Cart Icon */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative ml-2">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-emerald-600">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg ml-2">
                    <User className="h-4 w-4 mr-2" />
                    Dashboard
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email || ""}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/seller" className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Seller Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders" className="cursor-pointer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      <span>My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                className="font-semibold px-6 py-2.5 rounded-lg ml-2"
                onClick={handleLoginClick}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Cart Icon */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-emerald-600">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium hover:text-emerald-600 hover:bg-emerald-50 ${
                  location === link.href
                    ? 'text-emerald-600 bg-emerald-50 font-semibold'
                    : 'text-slate-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                {user && (
                  <div className="px-3 py-2 text-sm text-slate-600 border-b">
                    <p className="font-medium">{user.name || "User"}</p>
                    <p className="text-xs text-slate-500">{user.email || ""}</p>
                  </div>
                )}
                <Link
                  href="/dashboard/seller"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-emerald-50"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard className="inline mr-2 h-4 w-4" />
                  Seller Dashboard
                </Link>
                <Link
                  href="/orders"
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-emerald-50"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingCart className="inline mr-2 h-4 w-4" />
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="inline mr-2 h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <Button
                variant="outline"
                className="w-full mx-3 my-1 border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                onClick={(e) => {
                  handleLoginClick(e);
                  setIsOpen(false);
                }}
              >
                Login
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
