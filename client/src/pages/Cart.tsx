import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, Package } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/_core/hooks/useAuth';

export default function Cart() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, loading } = useAuth();

  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    setLocation('/login');
    return null;
  }

  const { data: cartItems, isLoading, refetch } = trpc.ecommerce.cart.get.useQuery(
    undefined,
    { enabled: !!user }
  );

  const updateQuantity = trpc.ecommerce.cart.updateQuantity.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const removeItem = trpc.ecommerce.cart.remove.useMutation({
    onSuccess: () => {
      toast.success("Item removed from cart");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdateQuantity = (cartItemId: number, newQuantity: number, maxStock: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > maxStock) {
      toast.error(`Only ${maxStock} units available`);
      return;
    }
    updateQuantity.mutate({ cartItemId, quantity: newQuantity });
  };

  const handleRemoveItem = (cartItemId: number) => {
    if (confirm("Remove this item from cart?")) {
      removeItem.mutate({ cartItemId });
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  const totalAmount = cartItems?.reduce((sum, item) => {
    return sum + ((item.productPrice || 0) * item.quantity);
  }, 0) || 0;

  const totalItems = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/marketplace')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="text-slate-600 mt-2">
            {totalItems} item{totalItems !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        {cartItems && cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const images = item.productImages ? JSON.parse(item.productImages) : [];
                const imageUrl = images[0] || null;

                return (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden">
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt={item.productName || 'Product'}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="h-8 w-8 text-slate-400" />
                            </div>
                          )}
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-900 mb-1">
                            {item.productName}
                          </h3>
                          {item.sellerName && (
                            <p className="text-sm text-slate-600 mb-2">
                              by {item.sellerName}
                            </p>
                          )}
                          <div className="text-emerald-600 font-semibold text-lg">
                            ₦{((item.productPrice || 0) / 100).toLocaleString()}
                            <span className="text-sm text-slate-600 ml-1">
                              per {item.productUnit || 'unit'}
                            </span>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-4">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={removeItem.isPending}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1, item.productStock || 0)}
                              disabled={updateQuantity.isPending || item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <div className="w-16 text-center font-semibold">
                              {item.quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1, item.productStock || 0)}
                              disabled={updateQuantity.isPending || item.quantity >= (item.productStock || 0)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <div className="font-bold text-slate-900">
                              ₦{(((item.productPrice || 0) * item.quantity) / 100).toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-600">
                              {item.productStock} {item.productUnit} available
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-slate-700">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">
                        ₦{(totalAmount / 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Shipping</span>
                      <span className="text-emerald-600 font-medium">Calculated at checkout</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg font-bold text-slate-900">
                      <span>Total</span>
                      <span className="text-emerald-600">
                        ₦{(totalAmount / 100).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    className="w-full h-12 text-lg"
                    onClick={() => setLocation('/checkout')}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </Button>

                  <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h3 className="font-semibold text-emerald-900 mb-2">Secure Checkout</h3>
                    <ul className="text-sm text-emerald-700 space-y-1">
                      <li>✓ Buyer protection</li>
                      <li>✓ Multiple payment options</li>
                      <li>✓ Fast delivery</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <ShoppingCart className="mx-auto h-16 w-16 text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Your cart is empty</h3>
            <p className="text-slate-600 mb-6">
              Start adding products to your cart from the marketplace
            </p>
            <Button onClick={() => setLocation('/marketplace')}>
              Browse Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
