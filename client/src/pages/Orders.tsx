import { useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, ArrowLeft, MapPin } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';

export default function Orders() {
  const [, setLocation] = useLocation();
  const { user, isAuthenticated, loading } = useAuth();

  // Redirect if not authenticated
  if (!loading && !isAuthenticated) {
    setLocation('/login');
    return null;
  }

  const { data: orders, isLoading } = trpc.ecommerce.orders.list.useQuery(
    { type: "buyer" },
    { enabled: !!user }
  );

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

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
            Back to Marketplace
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
          <p className="text-slate-600 mt-2">Track and manage your orders</p>
        </div>

        {orders && orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard key={order.orderNumber || 'order'} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="mx-auto h-16 w-16 text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No orders yet</h3>
            <p className="text-slate-600 mb-6">
              Start shopping to see your orders here
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

function OrderCard({ order }: { order: any }) {
  const [, setLocation] = useLocation();

  const orderId = 'id' in order ? order.id : order.orderId;
  
  const { data: orderDetails } = trpc.ecommerce.orders.getById.useQuery({
    orderId: orderId || 0,
  }, { enabled: !!orderId });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "paid":
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Order #{order.orderNumber}</CardTitle>
            <p className="text-sm text-slate-600 mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusColor(order.status)}>
              {order.status}
            </Badge>
            <Badge className={getPaymentStatusColor(order.paymentStatus)}>
              {order.paymentStatus}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Order Items */}
        {orderDetails?.items && orderDetails.items.length > 0 && (
          <div className="space-y-3 mb-4">
            {orderDetails.items.map((item) => {
              const images = item.productImages ? JSON.parse(item.productImages) : [];
              const imageUrl = images[0] || null;

              return (
                <div key={item.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                  <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.productName || 'Product'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="h-6 w-6 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900">{item.productName}</h4>
                    <p className="text-sm text-slate-600">
                      by {item.sellerName}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">
                      ₦{((item.priceAtPurchase * item.quantity) / 100).toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600">
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Order Summary */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-700">Total Amount</span>
            <span className="text-2xl font-bold text-emerald-600">
              ₦{(order.totalAmount / 100).toLocaleString()}
            </span>
          </div>

          {order.shippingAddress && (
            <div className="flex items-start gap-2 text-sm text-slate-600 mb-3">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium text-slate-900">Delivery Address</div>
                <div>{order.shippingAddress}</div>
                {order.shippingPhone && <div>Phone: {order.shippingPhone}</div>}
              </div>
            </div>
          )}

          {order.notes && (
            <div className="text-sm text-slate-600 mb-3">
              <span className="font-medium text-slate-900">Notes:</span> {order.notes}
            </div>
          )}

          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => setLocation(`/order/${order.id}`)}
          >
            View Order Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
