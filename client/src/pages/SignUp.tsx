"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sprout, Award, Store, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function SignUp() {
  const userTypes = [
    {
      type: "farmer",
      title: "Farmer",
      description: "Access AI-powered tools, marketplace, learning resources, and expert consultations",
      icon: Sprout,
      color: "from-emerald-500 to-teal-500",
      benefits: [
        "AI Disease & Pest Detection",
        "Weather Forecasting & Alerts",
        "Market Price Intelligence",
        "Expert Consultations",
        "Free Learning Courses",
      ],
      link: "/register/farmer",
    },
    {
      type: "consultant",
      title: "Agricultural Consultant",
      description: "Offer your expertise and connect with farmers seeking professional guidance",
      icon: Award,
      color: "from-blue-500 to-purple-500",
      benefits: [
        "Reach Thousands of Farmers",
        "Set Your Own Rates",
        "Flexible Schedule",
        "Secure Payment System",
        "Build Your Reputation",
      ],
      link: "/register/consultant",
    },
    {
      type: "seller",
      title: "Agro-Seller",
      description: "List your farm products, tools, and supplies to reach a wide network of buyers",
      icon: Store,
      color: "from-orange-500 to-red-500",
      benefits: [
        "Access to Large Market",
        "Verified Buyer Network",
        "Product Showcase",
        "Secure Transactions",
        "Business Analytics",
      ],
      link: "/register/seller",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Join AfriAgroCore</h1>
          <p className="text-xl text-emerald-100">
            Choose your role and start transforming African agriculture today
          </p>
        </motion.div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((userType, index) => (
            <motion.div
              key={userType.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                {/* Header with Icon */}
                <div className={`bg-gradient-to-r ${userType.color} p-8 text-center`}>
                  <userType.icon className="w-16 h-16 text-white mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white">{userType.title}</h2>
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-gray-600 mb-6">{userType.description}</p>

                  {/* Benefits */}
                  <div className="space-y-3 mb-8">
                    <p className="font-semibold text-gray-900 mb-3">What You Get:</p>
                    {userType.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                        </div>
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={userType.link}>
                    <Button
                      className={`w-full bg-gradient-to-r ${userType.color} hover:opacity-90 text-white font-semibold py-6 rounded-lg flex items-center justify-center gap-2 group`}
                    >
                      Register as {userType.title}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Already have an account */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-emerald-100 text-lg">
            Already have an account?{" "}
            <Link href="/login" className="text-white font-semibold underline hover:text-emerald-200">
              Log In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
