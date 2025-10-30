import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, Package } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';
import { useAuthStore, useCartStore } from '../store';
import { AuthDialog } from './AuthDialog';
import { CartSheet } from './CartSheet';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

export function Header() {
  const { user, logout } = useAuthStore();
  const { cart, fetchCart } = useCartStore();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showCartSheet, setShowCartSheet] = useState(false);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]); // Remove fetchCart from dependencies

  const cartItemsCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2 hover-lift">
          <Package className="h-6 w-6" />
          <span className="text-xl font-bold">BikeHub</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          
          {/* Shop Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1">
                Shop
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/products" className="cursor-pointer">All Bikes</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/products?category=mountain-bikes" className="cursor-pointer">Mountain Bikes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=road-bikes" className="cursor-pointer">Road Bikes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=electric-bikes" className="cursor-pointer">Electric Bikes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=bmx-bikes" className="cursor-pointer">BMX Bikes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=hybrid-bikes" className="cursor-pointer">Hybrid Bikes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=gravel-bikes" className="cursor-pointer">Gravel Bikes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=cruiser-bikes" className="cursor-pointer">Cruiser Bikes</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/products?category=kids-bikes" className="cursor-pointer">Kids Bikes</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {user?.role === 'admin' && (
            <Link to="/admin" className="text-sm font-medium transition-colors hover:text-primary">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setShowCartSheet(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/orders">Orders</Link>
                </DropdownMenuItem>
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">Admin Panel</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setShowAuthDialog(true)}>
              <User className="h-5 w-5" />
            </Button>
          )}

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
      <CartSheet open={showCartSheet} onOpenChange={setShowCartSheet} />
    </header>
  );
}
