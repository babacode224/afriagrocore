import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import FarmerDashboard from "@/pages/dashboards/FarmerDashboard";
import ConsultantDashboard from "@/pages/dashboards/ConsultantDashboard";
import SellerDashboard from "@/pages/dashboards/SellerDashboard";
import { Route, Switch } from 'wouter';
import { lazy, Suspense } from 'react';
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const AISolutions = lazy(() => import('./pages/AISolutions'));
const Community = lazy(() => import('./pages/Community'));
const Marketplace = lazy(() => import('./pages/Marketplace'));
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
const Learning = lazy(() => import('./pages/Learning'));
import CurriculumResource from './pages/CurriculumResource';
import Contact from "./pages/Contact";
const EmailAnalytics = lazy(() => import('./pages/EmailAnalytics'));
const EmailAnalyticsFull = lazy(() => import('./pages/EmailAnalyticsFull'));
const FeedbackDashboard = lazy(() => import('./pages/FeedbackDashboard'));
import AIDiseaseDetection from './pages/AIDiseaseDetection';
import MarketPrices from "./pages/MarketPrices";
import Navbar from "./components/Navbar";

import AdminDashboard from "./pages/AdminDashboard";
import Profiles from "./pages/Profiles";
import FarmerRegistration from "./components/FarmerRegistration";
import ConsultantRegistration from "./components/ConsultantRegistration";
import SellerRegistration from "./components/SellerRegistration";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div></div>}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path={"/ai-solutions"} component={AISolutions} />
          <Route path="/ai-disease-detection" component={AIDiseaseDetection} />
          <Route path={"/404"} component={NotFound} />
          <Route path={"/community"} component={Community} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/product/:id" component={ProductDetail} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/market-prices" component={MarketPrices} />
          <Route path="/learning" component={Learning} />
          <Route path="/learning/curriculum/:id" component={CurriculumResource} />
          <Route path={"/contact"} component={Contact} />
          <Route path="/admin/email-analytics" component={EmailAnalytics} />
          <Route path="/admin/email-logs" component={EmailAnalyticsFull} />
          <Route path="/admin/feedback" component={FeedbackDashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route path={"/profiles"} component={Profiles} />
          <Route path={"/register/farmer"} component={() => <div className="min-h-screen bg-gray-50 py-12 px-4"><FarmerRegistration /></div>} />
          <Route path={"/register/consultant"} component={() => <div className="min-h-screen bg-gray-50 py-12 px-4"><ConsultantRegistration /></div>} />
          <Route path={"/register/seller"} component={() => <div className="min-h-screen bg-gray-50 py-12 px-4"><SellerRegistration /></div>} />
          <Route path={"/dashboard/farmer"} component={FarmerDashboard} />
          <Route path={"/dashboard/consultant"} component={ConsultantDashboard} />
          <Route path={"/dashboard/seller"} component={SellerDashboard} />
          <Route path={"/404"} component={NotFound} />
          {/* Final fallback route */}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
