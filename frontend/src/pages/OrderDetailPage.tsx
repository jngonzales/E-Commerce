import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Skeleton } from '../components/ui/skeleton';
import { Separator } from '../components/ui/separator';
import { useAuthStore } from '../store';
import api from '../lib/api';
import { Order } from '../types';
import { formatPrice, formatDate } from '../lib/utils';
import { ArrowLeft, Package, MapPin, CreditCard, CheckCircle } from 'lucide-react';

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error('Please login to view order details');
      navigate('/');
      return;
    }

    if (id) {
      fetchOrder();
    }
  }, [id, user, navigate]);

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      setOrder(data);
    } catch (error) {
      toast.error('Failed to load order details');
      navigate('/orders');
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

  const getStatusSteps = () => {
    if (!order) return [];
    
    const steps = [
      { label: 'Pending', status: 'pending', icon: Package },
      { label: 'Processing', status: 'processing', icon: Package },
      { label: 'Shipped', status: 'shipped', icon: Package },
      { label: 'Delivered', status: 'delivered', icon: CheckCircle },
    ];

    const currentIndex = steps.findIndex(s => s.status === order.status);
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex,
    }));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-48 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statusSteps = getStatusSteps();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/orders">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
      </Link>

      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Order #{order._id.slice(-8).toUpperCase()}
            </h1>
            <p className="text-muted-foreground">
              Placed on {formatDate(order.createdAt)}
            </p>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>

        {/* Order Status Timeline */}
        {order.status !== 'cancelled' && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {statusSteps.map((step, index) => (
                  <div key={step.status} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <step.icon className="h-5 w-5" />
                      </div>
                      <p className={`text-sm mt-2 ${step.current ? 'font-bold' : ''}`}>
                        {step.label}
                      </p>
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`flex-1 h-1 mx-2 ${
                          step.completed ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                    <img
                      src={item.image || 'https://via.placeholder.com/100'}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-lg font-bold">{formatPrice(item.price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-semibold">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
                <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="capitalize">{order.paymentMethod.replace('-', ' ')}</p>
                {order.isPaid ? (
                  <Badge className="bg-green-500">
                    Paid on {order.paidAt ? formatDate(order.paidAt) : 'N/A'}
                  </Badge>
                ) : (
                  <Badge variant="destructive">Not Paid</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.itemsPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {order.shippingPrice === 0 ? 'FREE' : formatPrice(order.shippingPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(order.taxPrice)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(order.totalPrice)}</span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Order ID</span>
                  <span className="font-mono text-xs">
                    {order._id.slice(-12)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Order Date</span>
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                {order.isDelivered && order.deliveredAt && (
                  <div className="flex justify-between text-sm">
                    <span>Delivered</span>
                    <span>{formatDate(order.deliveredAt)}</span>
                  </div>
                )}
              </div>

              {order.status === 'delivered' && (
                <Button className="w-full" variant="outline">
                  Download Invoice
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
