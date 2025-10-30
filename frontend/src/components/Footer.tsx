import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6" />
              <span className="text-xl font-bold">BikeHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your premier destination for quality bikes. From mountain trails to city streets.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/products" className="hover:text-primary transition-colors">All Bikes</Link></li>
              <li><Link to="/products?category=mountain-bikes" className="hover:text-primary transition-colors">Mountain Bikes</Link></li>
              <li><Link to="/products?category=road-bikes" className="hover:text-primary transition-colors">Road Bikes</Link></li>
              <li><Link to="/products?category=electric-bikes" className="hover:text-primary transition-colors">Electric Bikes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/orders" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">Returns</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">About</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BikeHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
