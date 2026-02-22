import { useState } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowLeft, CreditCard, Wallet, Package } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/_core/hooks/useAuth';

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, loading } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("demo");
  const [formData, setFormData] = useState({
    shippingAddress: "",
    shippingPhone: "",
    notes: "",
  });

  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    setLocation('/login');
    return null;
  }

  const { data: cartItems, isLoading } = trpc.ecommerce.cart.get.useQuery(
    undefined,
    { enabled: !!user }
  );

  const createOrder = trpc.ecommerce.orders.create.useMutation({
    onSuccess: (data) => {
      toast.success(`Order ${data.orderNumber} placed successfully!`);
      setLocation(`/orders`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.shippingAddress || !formData.shippingPhone) {
      toast.error("Please fill in all required fields");
      return;
    }

    createOrder.mutate({
      ...formData,
      paymentMethod,
    });
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto h-16 w-16 text-slate-400 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
          <Button onClick={() => setLocation('/marketplace')}>
            Browse Products
          </Button>
        </div>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + ((item.productPrice || 0) * item.quantity);
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation('/cart')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
          <p className="text-slate-600 mt-2">Complete your order</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="shippingAddress">Delivery Address *</Label>
                    <Textarea
                      id="shippingAddress"
                      value={formData.shippingAddress}
                      onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                      placeholder="Enter your full delivery address"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="shippingPhone">Phone Number *</Label>
                    <Input
                      id="shippingPhone"
                      type="tel"
                      value={formData.shippingPhone}
                      onChange={(e) => setFormData({ ...formData, shippingPhone: e.target.value })}
                      placeholder="+234 XXX XXX XXXX"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="notes">Order Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any special instructions for your order"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-slate-50 cursor-pointer">
                      <RadioGroupItem value="demo" id="demo" />
                      <Label htmlFor="demo" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-emerald-600" />
                          <div>
                            <div className="font-semibold">Demo Payment (Stripe/Paystack)</div>
                            <div className="text-sm text-slate-600">
                              Simulated payment for testing purposes
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                      <RadioGroupItem value="stripe" id="stripe" disabled />
                      <Label htmlFor="stripe" className="flex-1">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <div className="font-semibold">Stripe</div>
                            <div className="text-sm text-slate-600">
                              Coming soon - Credit/Debit Card
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg opacity-50">
                      <RadioGroupItem value="paystack" id="paystack" disabled />
                      <Label htmlFor="paystack" className="flex-1">
                        <div className="flex items-center gap-3">
                          <Wallet className="h-5 w-5" />
                          <div>
                            <div className="font-semibold">Paystack</div>
                            <div className="text-sm text-slate-600">
                              Coming soon - Local Nigerian payments
                            </div>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Demo Mode:</strong> This is a demonstration payment system. 
                      Your order will be processed immediately without actual payment. 
                      Real payment integration (Stripe/Paystack) can be configured later.
                    </p>
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
                <CardContent>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <div className="flex-1">
                          <div className="font-medium text-slate-900">{item.productName}</div>
                          <div className="text-slate-600">
                            {item.quantity} × ₦{((item.productPrice || 0) / 100).toLocaleString()}
                          </div>
                        </div>
                        <div className="font-semibold text-slate-900">
                          ₦{(((item.productPrice || 0) * item.quantity) / 100).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-slate-700">
                      <span>Subtotal ({totalItems} items)</span>
                      <span className="font-semibold">
                        ₦{(totalAmount / 100).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-700">
                      <span>Shipping</span>
                      <span className="text-emerald-600 font-medium">Free</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg font-bold text-slate-900">
                      <span>Total</span>
                      <span className="text-emerald-600">
                        ₦{(totalAmount / 100).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg mt-6"
                    disabled={createOrder.isPending}
                  >
                    {createOrder.isPending ? "Processing..." : "Place Order"}
                  </Button>

                  <div className="mt-4 text-xs text-slate-600 text-center">
                    By placing your order, you agree to our terms and conditions
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
