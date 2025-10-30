import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { useAuthStore } from '../store';
import api from '../lib/api';
import { Order } from '../types';
import { formatPrice, formatDate } from '../lib/utils';
import { Package, Eye } from 'lucide-react';

export function OrdersPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view orders');
      navigate('/');
      return;
    }

    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (error) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">View and track your orders</p>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your orders here
            </p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order._id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      Order #{order._id.slice(-8).toUpperCase()}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items Preview */}
                  <div className="flex gap-4 flex-wrap">
                    {order.orderItems.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex gap-3">
                        <img
                          src={item.image || 'https://via.placeholder.com/100'}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                        </div>
                      </div>
                    ))}
                    {order.orderItems.length > 3 && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        +{order.orderItems.length - 3} more items
                      </div>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="flex justify-between items-center pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-2xl font-bold">{formatPrice(order.totalPrice)}</p>
                    </div>
                    <Link to={`/orders/${order._id}`}>
                      <Button>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </Link>
                  </div>

                  {/* Delivery Info */}
                  {order.status === 'shipped' && (
                    <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                        📦 Your order is on the way!
                      </p>
                    </div>
                  )}
                  {order.status === 'delivered' && (
                    <div className="bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        ✅ Delivered on {order.deliveredAt ? formatDate(order.deliveredAt) : 'N/A'}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
