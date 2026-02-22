"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Users, CheckCircle, Clock, AlertCircle, BarChart3, Search } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  // Demo data for users
  const [users] = useState({
    farmers: [
      { id: 1, name: "John Mwangi", email: "john@farm.com", location: "Nairobi, Kenya", status: "verified", joinDate: "2024-01-15" },
      { id: 2, name: "Amina Hassan", email: "amina@farm.com", location: "Dar es Salaam, Tanzania", status: "verified", joinDate: "2024-01-20" },
      { id: 3, name: "Kwame Osei", email: "kwame@farm.com", location: "Accra, Ghana", status: "pending", joinDate: "2024-01-22" },
    ],
    consultants: [
      { id: 1, name: "Dr. Amara Okonkwo", email: "amara@consultant.com", specialization: "Crop Production", status: "verified", joinDate: "2024-01-10" },
      { id: 2, name: "James Kipchoge", email: "james@consultant.com", specialization: "Pest Management", status: "pending", joinDate: "2024-01-18" },
      { id: 3, name: "Fatima Hassan", email: "fatima@consultant.com", specialization: "Soil Science", status: "verified", joinDate: "2024-01-21" },
    ],
    sellers: [
      { id: 1, name: "Golden Harvest Ltd", email: "sales@goldenharvest.com", products: "Seeds, Fertilizers", status: "verified", joinDate: "2024-01-12" },
      { id: 2, name: "AgroTech Solutions", email: "info@agrotech.com", products: "Farm Tools, Equipment", status: "pending", joinDate: "2024-01-19" },
      { id: 3, name: "Premium Chemicals", email: "contact@premiumchem.com", products: "Pesticides, Herbicides", status: "verified", joinDate: "2024-01-23" },
    ],
  });

  const stats = {
    totalUsers: users.farmers.length + users.consultants.length + users.sellers.length,
    verifiedUsers: Object.values(users).flat().filter(u => u.status === "verified").length,
    pendingApprovals: Object.values(users).flat().filter(u => u.status === "pending").length,
    totalFarmers: users.farmers.length,
    totalConsultants: users.consultants.length,
    totalSellers: users.sellers.length,
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You need admin privileges to access this dashboard</p>
        </Card>
      </div>
    );
  }

  const handleApprove = (type: string, id: number) => {
    toast.success(`${type} user approved!`);
  };

  const handleReject = (type: string, id: number) => {
    toast.error(`${type} user rejected`);
  };

  const UserTable = ({ data, type }: { data: any[]; type: string }) => {
    const filtered = data.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">{type === "farmers" ? "Location" : type === "consultants" ? "Specialization" : "Products"}</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Join Date</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-900 font-medium">{user.name}</td>
                <td className="py-3 px-4 text-gray-600">{user.email}</td>
                <td className="py-3 px-4 text-gray-600">{user.location || user.specialization || user.products}</td>
                <td className="py-3 px-4">
                  <Badge className={user.status === "verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {user.status === "verified" ? "✓ Verified" : "⏳ Pending"}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-gray-600 text-sm">{user.joinDate}</td>
                <td className="py-3 px-4 space-x-2">
                  {user.status === "pending" && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(type, user.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(type, user.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                  {user.status === "verified" && (
                    <span className="text-green-600 font-semibold">✓ Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-emerald-100">Manage users, verify profiles, and monitor platform activity</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          {[
            { label: "Total Users", value: stats.totalUsers, icon: Users, color: "bg-blue-500" },
            { label: "Verified", value: stats.verifiedUsers, icon: CheckCircle, color: "bg-green-500" },
            { label: "Pending", value: stats.pendingApprovals, icon: Clock, color: "bg-yellow-500" },
            { label: "Farmers", value: stats.totalFarmers, icon: BarChart3, color: "bg-emerald-500" },
            { label: "Consultants", value: stats.totalConsultants, icon: Users, color: "bg-purple-500" },
            { label: "Sellers", value: stats.totalSellers, icon: Users, color: "bg-orange-500" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-6 bg-white/10 border-white/20 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/70 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* User Management */}
        <Card className="bg-white/95 backdrop-blur border-white/20">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="farmers">Farmers ({users.farmers.length})</TabsTrigger>
                <TabsTrigger value="consultants">Consultants ({users.consultants.length})</TabsTrigger>
                <TabsTrigger value="sellers">Sellers ({users.sellers.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="farmers" className="mt-6">
                <UserTable data={users.farmers} type="farmers" />
              </TabsContent>

              <TabsContent value="consultants" className="mt-6">
                <UserTable data={users.consultants} type="consultants" />
              </TabsContent>

              <TabsContent value="sellers" className="mt-6">
                <UserTable data={users.sellers} type="sellers" />
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </div>
  );
}
