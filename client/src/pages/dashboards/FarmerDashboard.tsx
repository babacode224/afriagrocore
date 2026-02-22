"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, TrendingUp, Calendar, BookOpen, MessageSquare, ShoppingCart } from "lucide-react";
import { Link } from "wouter";

export default function FarmerDashboard() {
  // Mock user data - in production, fetch from API
  const farmer = {
    name: "John Okafor",
    farmName: "Green Valley Farms",
    location: "Enugu, Nigeria",
    farmSize: "5 hectares",
    crops: ["Maize", "Cassava", "Yams"],
  };

  const quickStats = [
    { label: "Active Crops", value: "3", icon: Sprout, color: "text-emerald-600" },
    { label: "Yield This Season", value: "+35%", icon: TrendingUp, color: "text-blue-600" },
    { label: "Upcoming Consultations", value: "2", icon: Calendar, color: "text-purple-600" },
    { label: "Courses Enrolled", value: "5", icon: BookOpen, color: "text-orange-600" },
  ];

  const recentActivities = [
    { action: "Disease detected on Maize field", time: "2 hours ago", type: "alert" },
    { action: "Weather alert: Heavy rain expected", time: "5 hours ago", type: "warning" },
    { action: "Consultation with Dr. Amara completed", time: "1 day ago", type: "success" },
    { action: "Completed course: Pest Management", time: "2 days ago", type: "success" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {farmer.name}!</h1>
          <p className="text-gray-600 mt-2">
            {farmer.farmName} • {farmer.location} • {farmer.farmSize}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <stat.icon className={`w-10 h-10 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link href="/ai-solutions">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 flex flex-col items-center gap-2">
                    <Sprout className="w-6 h-6" />
                    <span>AI Disease Detection</span>
                  </Button>
                </Link>
                <Link href="/community">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 flex flex-col items-center gap-2">
                    <MessageSquare className="w-6 h-6" />
                    <span>Book Consultant</span>
                  </Button>
                </Link>
                <Link href="/marketplace">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 flex flex-col items-center gap-2">
                    <ShoppingCart className="w-6 h-6" />
                    <span>Browse Marketplace</span>
                  </Button>
                </Link>
                <Link href="/learning">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 flex flex-col items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    <span>Continue Learning</span>
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Recent Activities */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activities</h2>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "alert"
                          ? "bg-red-500"
                          : activity.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Profile & Crops */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Profile</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Farm Name</p>
                  <p className="font-semibold text-gray-900">{farmer.farmName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-semibold text-gray-900">{farmer.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Farm Size</p>
                  <p className="font-semibold text-gray-900">{farmer.farmSize}</p>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Edit Profile
                </Button>
              </div>
            </Card>

            {/* Active Crops */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Active Crops</h2>
              <div className="space-y-3">
                {farmer.crops.map((crop, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                    <Sprout className="w-5 h-5 text-emerald-600" />
                    <span className="font-medium text-gray-900">{crop}</span>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  Manage Crops
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
