import { useRoute, useLocation } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MapPin, Package, Star, ArrowLeft, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '@/_core/hooks/useAuth';

export default function ProductDetail() {
  const [, params] = useRoute('/product/:id');
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const productId = params?.id ? parseInt(params.id) : 0;

  const { data: product, isLoading } = trpc.ecommerce.products.getById.useQuery(
    { id: productId },
    { enabled: productId > 0 }
  );

  const addToCart = trpc.ecommerce.cart.add.useMutation({
    onSuccess: () => {
      toast.success(`Added ${quantity} item(s) to cart!`);
      setQuantity(1);
    },
    onError: (error) => {
      if (error.message.includes("Unauthorized")) {
        toast.error("Please login to add items to cart");
      } else {
        toast.error(error.message);
      }
    },
  });

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart.mutate({ productId, quantity });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto h-16 w-16 text-slate-400 mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product not found</h2>
          <Button onClick={() => setLocation('/marketplace')}>
            Back to Marketplace
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images ? JSON.parse(product.images) : [];
  const imageUrl = images[0] || null;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setLocation('/marketplace')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <Card>
            <CardContent className="p-0">
              <div className="relative h-96 bg-slate-200 rounded-lg overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-32 w-32 text-slate-400" />
                  </div>
                )}
                {product.featured && (
                  <Badge className="absolute top-4 right-4 bg-yellow-500 text-lg px-4 py-2">
                    Featured
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              {product.name}
            </h1>

            {/* Seller Info */}
            {product.sellerName && (
              <div className="flex items-center gap-3 mb-4 p-4 bg-white rounded-lg border">
                <div className="flex-1">
                  <div className="text-sm text-slate-600">Sold by</div>
                  <div className="font-semibold text-slate-900">{product.sellerName}</div>
                </div>
                {product.sellerRating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{Number(product.sellerRating).toFixed(1)}</span>
                  </div>
                )}
              </div>
            )}

            {/* Price */}
            <div className="mb-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                ₦{(product.price / 100).toLocaleString()}
              </div>
              <div className="text-slate-600">
                per {product.unit || 'unit'}
              </div>
            </div>

            {/* Stock and Location */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center gap-2 text-slate-700">
                <Package className="h-5 w-5" />
                <span className="font-medium">{product.stock} {product.unit} in stock</span>
              </div>
              {product.location && (
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="h-5 w-5" />
                  <span>{product.location}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Description</h3>
                <p className="text-slate-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-20 text-center">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                    className="w-full text-center text-lg font-semibold border rounded px-2 py-1"
                    min="1"
                    max={product.stock}
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-slate-600">
                  {product.unit}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={addToCart.isPending || product.stock === 0}
                className="flex-1 h-12 text-lg"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {addToCart.isPending ? "Adding..." : "Add to Cart"}
              </Button>
            </div>

            {product.stock === 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">This product is currently out of stock</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
              <p className="text-slate-600 text-sm">
                All products are verified by our quality assurance team
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-slate-600 text-sm">
                Multiple payment options with buyer protection
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-slate-600 text-sm">
                Reliable delivery partners across Nigeria
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
