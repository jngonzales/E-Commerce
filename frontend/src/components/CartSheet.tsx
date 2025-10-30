import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from './ui/sheet';
import { Button } from './ui/button';
import { useCartStore } from '../store';
import { Minus, Plus, X } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import { toast } from 'sonner';

interface CartSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ open, onOpenChange }: CartSheetProps) {
  const { cart, updateCartItem, removeFromCart } = useCartStore();

  const subtotal = cart?.items?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ) || 0;

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart ({cart?.items?.length || 0})</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {!cart?.items || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={() => onOpenChange(false)}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item._id} className="flex gap-4 border-b pb-4">
                  <img
                    src={item.product.images[0] || 'https://via.placeholder.com/100'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(item._id!, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(item._id!, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => handleRemoveItem(item._id!)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <p className="font-semibold text-sm">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart?.items && cart.items.length > 0 && (
          <SheetFooter className="flex-col gap-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Link to="/checkout" onClick={() => onOpenChange(false)} className="w-full">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
