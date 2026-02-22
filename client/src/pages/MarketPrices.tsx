import { TrendingUp, TrendingDown, Globe, Sprout } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// International Commodities (USD/MT)
const internationalCommodities = [
  { name: "Cocoa", price: 3245.50, change: 1.2, unit: "USD/MT", trend: "up" },
  { name: "Cashew", price: 1120.00, change: -0.5, unit: "USD/MT", trend: "down" },
  { name: "Sesame", price: 1450.75, change: 0.8, unit: "USD/MT", trend: "up" },
  { name: "Shea Butter", price: 2890.00, change: 2.1, unit: "USD/MT", trend: "up" },
  { name: "Groundnuts", price: 890.50, change: 0.3, unit: "USD/MT", trend: "up" },
  { name: "Palm Oil", price: 1650.25, change: -1.2, unit: "USD/MT", trend: "down" },
  { name: "Shea Nuts", price: 2150.00, change: 1.8, unit: "USD/MT", trend: "up" },
  { name: "Ginger", price: 1850.75, change: 2.4, unit: "USD/MT", trend: "up" },
];

// Local African Commodities (NGN/kg)
const localCommodities = [
  { name: "Rice (Local)", price: 450.00, change: 0.5, unit: "NGN/kg", trend: "up" },
  { name: "Maize", price: 320.00, change: -0.8, unit: "NGN/kg", trend: "down" },
  { name: "Sorghum", price: 280.00, change: 1.1, unit: "NGN/kg", trend: "up" },
  { name: "Millet", price: 310.00, change: 0.6, unit: "NGN/kg", trend: "up" },
  { name: "Yam", price: 380.00, change: 1.3, unit: "NGN/kg", trend: "up" },
  { name: "Cassava", price: 180.00, change: 0.2, unit: "NGN/kg", trend: "up" },
  { name: "Beans", price: 520.00, change: -0.4, unit: "NGN/kg", trend: "down" },
  { name: "Tomatoes", price: 420.00, change: 2.1, unit: "NGN/kg", trend: "up" },
  { name: "Pepper", price: 680.00, change: 1.8, unit: "NGN/kg", trend: "up" },
  { name: "Onions", price: 340.00, change: -1.2, unit: "NGN/kg", trend: "down" },
];

export default function MarketPrices() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 pt-24 pb-12">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Current Market Prices</h1>
          <p className="text-slate-600 text-lg">
            Real-time commodity prices for agricultural products across international and local markets
          </p>
          <p className="text-sm text-slate-500 mt-2">
            Last updated: {new Date().toLocaleString('en-US', { 
              dateStyle: 'medium', 
              timeStyle: 'short' 
            })}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* International Commodities */}
          <Card className="shadow-lg">
            <CardHeader className="bg-emerald-700 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Globe className="h-6 w-6" />
                International Commodities
              </CardTitle>
              <CardDescription className="text-emerald-100">
                Global export prices in USD per Metric Ton
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Commodity</TableHead>
                    <TableHead className="text-right font-semibold">Price</TableHead>
                    <TableHead className="text-right font-semibold">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {internationalCommodities.map((commodity) => (
                    <TableRow key={commodity.name} className="hover:bg-emerald-50">
                      <TableCell className="font-medium">{commodity.name}</TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold">
                          ${commodity.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500 ml-1">{commodity.unit}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`flex items-center justify-end gap-1 font-medium ${
                          commodity.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}>
                          {commodity.trend === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {Math.abs(commodity.change)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Local African Commodities */}
          <Card className="shadow-lg">
            <CardHeader className="bg-slate-900 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sprout className="h-6 w-6" />
                Local African Commodities
              </CardTitle>
              <CardDescription className="text-slate-300">
                Local market prices in Nigerian Naira per Kilogram
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Commodity</TableHead>
                    <TableHead className="text-right font-semibold">Price</TableHead>
                    <TableHead className="text-right font-semibold">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {localCommodities.map((commodity) => (
                    <TableRow key={commodity.name} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{commodity.name}</TableCell>
                      <TableCell className="text-right">
                        <span className="font-semibold">
                          ₦{commodity.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500 ml-1">{commodity.unit}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`flex items-center justify-end gap-1 font-medium ${
                          commodity.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}>
                          {commodity.trend === "up" ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {Math.abs(commodity.change)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Info Note */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Prices are indicative and may vary based on quality, location, and market conditions. 
            For actual trading prices, please contact verified suppliers through our marketplace.
          </p>
        </div>
      </div>
    </div>
  );
}
