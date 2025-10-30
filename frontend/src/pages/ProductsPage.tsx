import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Skeleton } from '../components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import api from '../lib/api';
import { Product, Category } from '../types';
import { formatPrice } from '../lib/utils';
import { Search } from 'lucide-react';

export function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '-createdAt');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCategories();
    // Read category from URL on mount
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, selectedCategory, sortBy, page]);

  const fetchCategories = async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      params.append('page', page.toString());
      params.append('limit', '12');
      params.append('sort', sortBy);

      const { data } = await api.get(`/products?${params.toString()}`);
      setProducts(data.products);
      setTotalPages(data.pages);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    updateURLParams();
  };

  const updateURLParams = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (sortBy !== '-createdAt') params.set('sort', sortBy);
    setSearchParams(params);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setPage(1);
    updateURLParams();
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setPage(1);
    updateURLParams();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">Discover our amazing collection</p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat._id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-createdAt">Newest First</SelectItem>
              <SelectItem value="price">Price: Low to High</SelectItem>
              <SelectItem value="-price">Price: High to Low</SelectItem>
              <SelectItem value="name">Name: A to Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Active Filters */}
        {(search || selectedCategory !== 'all') && (
          <div className="flex gap-2 items-center flex-wrap">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            {search && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => {
                setSearch('');
                setPage(1);
              }}>
                Search: {search}
              </Badge>
            )}
            {selectedCategory !== 'all' && (
              <Badge variant="secondary" className="cursor-pointer" onClick={() => {
                setSelectedCategory('all');
                setPage(1);
              }}>
                {categories.find(c => c.slug === selectedCategory)?.name || selectedCategory}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setSortBy('-createdAt');
                setPage(1);
                setSearchParams(new URLSearchParams());
              }}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters
          </p>
          <Button onClick={() => {
            setSearch('');
            setSelectedCategory('all');
            setSortBy('-createdAt');
            setPage(1);
            setSearchParams(new URLSearchParams());
          }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product._id} to={`/products/${product._id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.images[0] || 'https://via.placeholder.com/400'}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform hover:scale-110"
                    />
                    {product.compareAtPrice && (
                      <Badge className="absolute top-2 right-2" variant="destructive">
                        Sale
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge className="absolute top-2 left-2" variant="default">
                        Featured
                      </Badge>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Badge variant="secondary">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 flex-1">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-xl font-bold">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                    {product.rating > 0 && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">
                          ({product.numReviews})
                        </span>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" disabled={product.stock === 0}>
                      {product.stock === 0 ? 'Out of Stock' : 'View Details'}
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Button
                    key={p}
                    variant={p === page ? 'default' : 'outline'}
                    onClick={() => setPage(p)}
                    className="w-10"
                  >
                    {p}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
