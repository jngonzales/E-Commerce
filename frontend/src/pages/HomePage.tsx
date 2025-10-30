import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import api from '../lib/api';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import { ArrowRight } from 'lucide-react';

export function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await api.get('/products?featured=true&limit=6');
        setFeaturedProducts(data.products);
      } catch (error) {
        console.error('Failed to fetch featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section with Bike Theme */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20 overflow-hidden">
        {/* Bike-themed background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-in-up text-white">
            Welcome to BikeHub
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-slide-in-up" style={{animationDelay: '0.1s'}}>
            Discover premium bikes for every adventure. From mountain trails to city streets, find your perfect ride.
          </p>
          <Link to="/products">
            <Button size="lg" className="text-lg px-8 hover-lift animate-slide-in-up bg-blue-600 hover:bg-blue-700" style={{animationDelay: '0.2s'}}>
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Bikes</h2>
            <Link to="/products">
              <Button variant="ghost" className="hover-lift">View All</Button>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="h-96 animate-pulse bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product._id} to={`/products/${product._id}`}>
                  <Card className="overflow-hidden hover-lift animate-scale-in">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.images[0] || 'https://via.placeholder.com/400'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      {product.compareAtPrice && (
                        <Badge className="absolute top-2 right-2 animate-fade-in" variant="destructive">
                          Sale
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">
                          {formatPrice(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Button className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
