import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Separator } from '../components/ui/separator';
import { useAuthStore, useCartStore } from '../store';
import api from '../lib/api';
import { formatPrice } from '../lib/utils';
import { ShoppingBag, CreditCard, Truck } from 'lucide-react';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cart, fetchCart, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');

  const [shippingData, setShippingData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  useEffect(() => {
    if (!user) {
      toast.error('Please login to checkout');
      navigate('/');
      return;
    }

    fetchCart();
  }, [user, navigate, fetchCart]);

  useEffect(() => {
    if (user && cart && cart.items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/');
    }
  }, [cart, user, navigate]);

  const calculateTotals = () => {
    if (!cart) return { subtotal: 0, shipping: 0, tax: 0, total: 0 };

    const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };

  const totals = calculateTotals();

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('review');
  };

  const handlePlaceOrder = async () => {
    if (!cart) return;

    setLoading(true);
    try {
      const orderData = {
        orderItems: cart.items.map(item => ({
          product: typeof item.product === 'string' ? item.product : item.product._id,
          name: typeof item.product === 'string' ? '' : item.product.name,
          image: typeof item.product === 'string' ? '' : item.product.images[0],
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress: shippingData,
        paymentMethod,
        itemsPrice: totals.subtotal,
        shippingPrice: totals.shipping,
        taxPrice: totals.tax,
        totalPrice: totals.total,
      };

      const { data } = await api.post('/orders', orderData);
      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/orders/${data._id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!cart) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'shipping' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <Truck className="w-4 h-4" />
              </div>
              <span className="font-medium">Shipping</span>
            </div>
            <Separator className="flex-1 mx-4" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="font-medium">Payment</span>
            </div>
            <Separator className="flex-1 mx-4" />
            <div className={`flex items-center gap-2 ${step === 'review' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'review' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="font-medium">Review</span>
            </div>
          </div>

          {/* Shipping Form */}
          {step === 'shipping' && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your delivery address</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={shippingData.fullName}
                      onChange={(e) => setShippingData({ ...shippingData, fullName: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      value={shippingData.address}
                      onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={shippingData.postalCode}
                        onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={shippingData.country}
                        onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">Continue to Payment</Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Payment Form */}
          {step === 'payment' && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your payment method</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card" className="flex-1 cursor-pointer">
                        <div className="font-medium">Credit Card</div>
                        <div className="text-sm text-muted-foreground">Pay with credit or debit card</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="font-medium">PayPal</div>
                        <div className="text-sm text-muted-foreground">Pay with your PayPal account</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <div className="font-medium">Cash on Delivery</div>
                        <div className="text-sm text-muted-foreground">Pay when you receive</div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep('shipping')} className="flex-1">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1">Review Order</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Review Order */}
          {step === 'review' && (
            <Card>
              <CardHeader>
                <CardTitle>Review Your Order</CardTitle>
                <CardDescription>Please review your order before placing it</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Shipping Info */}
                <div>
                  <h3 className="font-semibold mb-2">Shipping Address</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>{shippingData.fullName}</p>
                    <p>{shippingData.address}</p>
                    <p>{shippingData.city}, {shippingData.postalCode}</p>
                    <p>{shippingData.country}</p>
                    <p>{shippingData.phone}</p>
                  </div>
                </div>

                <Separator />

                {/* Payment Method */}
                <div>
                  <h3 className="font-semibold mb-2">Payment Method</h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {paymentMethod.replace('-', ' ')}
                  </p>
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {cart.items.map((item) => {
                      const product = typeof item.product === 'string' ? null : item.product;
                      return (
                        <div key={item._id} className="flex justify-between text-sm">
                          <span>{product?.name} x {item.quantity}</span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep('payment')} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder} disabled={loading} className="flex-1">
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {cart.items.map((item) => {
                  const product = typeof item.product === 'string' ? null : item.product;
                  return (
                    <div key={item._id} className="flex gap-3">
                      {product && (
                        <>
                          <img
                            src={product.images[0] || 'https://via.placeholder.com/100'}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                            <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>{totals.shipping === 0 ? 'FREE' : formatPrice(totals.shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>{formatPrice(totals.tax)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{formatPrice(totals.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
