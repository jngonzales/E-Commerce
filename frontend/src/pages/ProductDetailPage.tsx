import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuthStore, useCartStore } from '../store';
import api from '../lib/api';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import { ShoppingCart, Heart, Share2, Star, Minus, Plus, Package, Truck, Shield } from 'lucide-react';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addToCart } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      toast.error('Failed to load product');
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (!product) return;

    setAddingToCart(true);
    try {
      await addToCart(product._id, quantity);
      toast.success('Added to cart successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && product && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-[600px] w-full" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage] || 'https://via.placeholder.com/800'}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.compareAtPrice && (
              <Badge className="absolute top-4 right-4 text-lg px-3 py-1" variant="destructive">
                {discount}% OFF
              </Badge>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.featured && <Badge>Featured</Badge>}
              {typeof product.category !== 'string' && (
                <Badge variant="outline">{product.category.name}</Badge>
              )}
            </div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.numReviews} reviews)
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    {product.stock} in stock
                  </span>
                ) : (
                  <span className="text-destructive font-medium">Out of stock</span>
                )}
              </span>
            </div>
          </div>

          <Separator />

          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <Separator />

          {/* Quantity and Add to Cart */}
          {product.stock > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 text-lg"
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {addingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Features */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    On orders over $100
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Secure Payment</p>
                  <p className="text-sm text-muted-foreground">
                    100% secure transactions
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">
                    30-day return policy
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({product.numReviews})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Specifications</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">SKU</span>
                  <span className="text-muted-foreground">{product._id.slice(-8)}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Category</span>
                  <span className="text-muted-foreground">
                    {typeof product.category === 'string' 
                      ? product.category 
                      : product.category.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Stock Status</span>
                  <span className="text-muted-foreground">
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Rating</span>
                  <span className="text-muted-foreground">
                    {product.rating.toFixed(1)} / 5.0
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              <div className="text-center py-8 text-muted-foreground">
                <p>No reviews yet. Be the first to review this product!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
