import { motion } from 'framer-motion';
import { ShoppingBag, Search, SlidersHorizontal, MapPin, Star, Package } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useState } from 'react';
import { Link } from 'wouter';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useAuth } from '@/_core/hooks/useAuth';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function Marketplace() {
  useDocumentTitle('Marketplace - Agricultural Products & Equipment');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated } = useAuth();

  // Fetch categories
  const { data: categories } = trpc.ecommerce.categories.list.useQuery();

  // Fetch products
  const { data: products, isLoading } = trpc.ecommerce.products.list.useQuery({
    categoryId: selectedCategory || undefined,
    status: "active",
    limit: 50,
  });

  // Add to cart mutation
  const addToCart = trpc.ecommerce.cart.add.useMutation({
    onSuccess: () => {
      toast.success("Added to cart!");
    },
    onError: (error) => {
      if (error.message.includes("Unauthorized")) {
        toast.error("Please login to add items to cart");
      } else {
        toast.error(error.message);
      }
    },
  });

  const handleAddToCart = (productId: number) => {
    if (!isAuthenticated) {
      toast.error("Please login to add items to cart");
      return;
    }
    addToCart.mutate({ productId, quantity: 1 });
  };

  // Filter products by search query
  const filteredProducts = products?.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Agricultural Marketplace
            </h1>
            <p className="text-xl text-emerald-50 mb-6 max-w-3xl mx-auto">
              Connect with verified agricultural suppliers, buyers, logistics partners, and storage facilities across Africa. Browse and purchase farm produce, agricultural machinery, farming inputs, seeds, fertilizers, pesticides, livestock, and agro-chemicals. Access reliable transportation services to move your produce from farm to market, and secure storage facilities to preserve your harvest. Our e-commerce platform enables direct farmer-to-buyer transactions, eliminating middlemen and ensuring fair prices for African farmers and agricultural businesses.
            </p>
            
            {/* Market Prices Button */}
            <div className="mb-8">
              <Link href="/market-prices">
                <Button 
                  size="lg" 
                  className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold px-8 py-6 text-lg shadow-lg"
                >
                  View Current Market Prices
                </Button>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-white text-slate-900"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <SlidersHorizontal className="h-5 w-5 text-emerald-600" />
                  <h3 className="font-semibold text-lg">Categories</h3>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === null
                        ? "bg-emerald-100 text-emerald-900 font-medium"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    All Products
                  </button>
                  {categories?.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? "bg-emerald-100 text-emerald-900 font-medium"
                          : "hover:bg-slate-100"
                      }`}
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Seller CTA */}
                <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <h4 className="font-semibold text-emerald-900 mb-2">Become a Seller</h4>
                  <p className="text-sm text-emerald-700 mb-3">
                    List your products and reach thousands of buyers
                  </p>
                  <Link href="/dashboard/seller">
                    <Button className="w-full" size="sm">
                      Start Selling
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              </div>
            ) : filteredProducts && filteredProducts.length > 0 ? (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedCategory
                      ? categories?.find(c => c.id === selectedCategory)?.name
                      : "All Products"}
                  </h2>
                  <p className="text-slate-600 mt-1">
                    {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      isAddingToCart={addToCart.isPending}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <Package className="mx-auto h-16 w-16 text-slate-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  No products found
                </h3>
                <p className="text-slate-600 mb-6">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "Be the first to list products in this category"}
                </p>
                {!searchQuery && (
                  <Link href="/dashboard/seller">
                    <Button>
                      List Your Products
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart, isAddingToCart }: {
  product: any;
  onAddToCart: (productId: number) => void;
  isAddingToCart: boolean;
}) {
  const images = product.images ? JSON.parse(product.images) : [];
  const imageUrl = images[0] || null;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <Card className="h-full hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="relative h-48 bg-slate-200 rounded-t-lg overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-16 w-16 text-slate-400" />
              </div>
            )}
            {product.featured && (
              <Badge className="absolute top-2 right-2 bg-yellow-500">
                Featured
              </Badge>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-slate-900 mb-1 line-clamp-1">
              {product.name}
            </h3>

            {product.description && (
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                {product.description}
              </p>
            )}

            {/* Seller Info */}
            {product.sellerName && (
              <div className="flex items-center gap-2 mb-3 text-sm text-slate-600">
                <span>by {product.sellerName}</span>
                {product.sellerRating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{product.sellerRating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            )}

            {/* Location */}
            {product.location && (
              <div className="flex items-center gap-1 text-sm text-slate-600 mb-3">
                <MapPin className="h-4 w-4" />
                <span>{product.location}</span>
              </div>
            )}

            {/* Price and Stock */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  ₦{(product.price / 100).toLocaleString()}
                </div>
                <div className="text-xs text-slate-600">
                  per {product.unit || 'unit'}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-900">
                  {product.stock} {product.unit}
                </div>
                <div className="text-xs text-slate-600">
                  in stock
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Link href={`/product/${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
              <Button
                onClick={() => onAddToCart(product.id)}
                disabled={isAddingToCart || product.stock === 0}
                className="flex-1"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
