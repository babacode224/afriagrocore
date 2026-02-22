import { TrendingUp, TrendingDown } from 'lucide-react';

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

// Duplicate arrays for seamless loop
const internationalTickerItems = [...internationalCommodities, ...internationalCommodities, ...internationalCommodities];
const localTickerItems = [...localCommodities, ...localCommodities, ...localCommodities];

export default function PriceTicker() {
  return (
    <>
      {/* International Commodities Ticker - Top (Green) */}
      <div className="fixed top-[80px] left-0 right-0 bg-emerald-700 text-white py-2.5 overflow-hidden z-30 border-b border-emerald-600 shadow-md">
        <div className="relative flex">
          <div className="animate-scroll flex gap-6 whitespace-nowrap">
            {internationalTickerItems.map((commodity, index) => (
              <div key={index} className="flex items-center gap-2.5 px-3">
                <span className="font-semibold text-emerald-100">{commodity.name}</span>
                <span className="text-white font-medium text-sm">
                  ${commodity.price.toLocaleString()} {commodity.unit}
                </span>
                <span className={`flex items-center gap-1 text-xs ${
                  commodity.trend === "up" ? "text-green-200" : "text-red-200"
                }`}>
                  {commodity.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(commodity.change)}%
                </span>
                <span className="text-emerald-500">|</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-emerald-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg z-10">
          🌍 INTERNATIONAL
        </div>
      </div>

      {/* Local African Commodities Ticker - Bottom (White) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white text-slate-900 py-2.5 overflow-hidden z-40 border-t border-slate-200 shadow-lg">
        <div className="relative flex">
          <div className="animate-scroll-reverse flex gap-6 whitespace-nowrap">
            {localTickerItems.map((commodity, index) => (
              <div key={index} className="flex items-center gap-2.5 px-3">
                <span className="font-semibold text-slate-900">{commodity.name}</span>
                <span className="text-slate-700 font-medium text-sm">
                  ₦{commodity.price.toLocaleString()} {commodity.unit}
                </span>
                <span className={`flex items-center gap-1 text-xs ${
                  commodity.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {commodity.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(commodity.change)}%
                </span>
                <span className="text-slate-300">|</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg z-10">
          🌾 LOCAL AFRICAN
        </div>
      </div>
    </>
  );
}
