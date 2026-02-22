"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Users, Star, Clock, TrendingUp } from "lucide-react";

export default function ConsultantDashboard() {
  const consultant = {
    name: "Dr. Amara Okonkwo",
    specialization: "Crop Disease Management",
    rating: 4.9,
    totalConsultations: 156,
    earnings: "₦450,000",
  };

  const quickStats = [
    { label: "This Month's Earnings", value: "₦85,000", icon: DollarSign, color: "text-green-600" },
    { label: "Pending Bookings", value: "8", icon: Calendar, color: "text-blue-600" },
    { label: "Total Clients", value: "156", icon: Users, color: "text-purple-600" },
    { label: "Average Rating", value: "4.9", icon: Star, color: "text-yellow-600" },
  ];

  const upcomingBookings = [
    { farmer: "John Okafor", topic: "Maize Disease", time: "Today, 2:00 PM", status: "confirmed" },
    { farmer: "Grace Adeyemi", topic: "Soil Testing", time: "Tomorrow, 10:00 AM", status: "confirmed" },
    { farmer: "Ibrahim Musa", topic: "Pest Control", time: "Dec 28, 3:00 PM", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {consultant.name}!</h1>
          <p className="text-gray-600 mt-2">
            {consultant.specialization} • {consultant.rating} ⭐ ({consultant.totalConsultations} consultations)
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Consultations</h2>
                <Button variant="outline">View All</Button>
              </div>
              <div className="space-y-4">
                {upcomingBookings.map((booking, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{booking.farmer}</h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Topic: {booking.topic}</p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                          Join
                        </Button>
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Chart */}
            <Card className="p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Performance</h2>
              <div className="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
                  <p className="text-gray-600">Performance chart coming soon</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Profile</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Specialization</p>
                  <p className="font-semibold text-gray-900">{consultant.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="font-semibold text-gray-900">{consultant.earnings}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold text-gray-900">{consultant.rating}</span>
                    <span className="text-sm text-gray-600">({consultant.totalConsultations})</span>
                  </div>
                </div>
                <Button className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700">
                  Edit Profile
                </Button>
              </div>
            </Card>

            {/* Availability */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Availability</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Status</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Available
                  </span>
                </div>
                <Button variant="outline" className="w-full">
                  Manage Schedule
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  View All Bookings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Earnings Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Client Reviews
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
