"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Star, MapPin, Phone, Mail, Award, Briefcase } from "lucide-react";

export default function Profiles() {
  const [activeTab, setActiveTab] = useState("farmers");

  // Demo Farmer Profiles
  const farmerProfiles = [
    {
      id: 1,
      name: "John Mwangi",
      farmName: "Green Valley Farm",
      location: "Nairobi, Kenya",
      farmSize: "25 hectares",
      crops: ["Rice", "Maize", "Beans"],
      yearsExperience: 15,
      phone: "+254 701 234 567",
      email: "john@farm.com",
      bio: "Experienced farmer specializing in sustainable agriculture practices. Using AfriAgroCore has increased my yield by 40%.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.8,
      verified: true,
    },
    {
      id: 2,
      name: "Amina Hassan",
      farmName: "Coastal Harvest",
      location: "Dar es Salaam, Tanzania",
      farmSize: "15 hectares",
      crops: ["Cassava", "Vegetables", "Groundnuts"],
      yearsExperience: 10,
      phone: "+255 754 123 456",
      email: "amina@farm.com",
      bio: "Passionate about organic farming and community development. AfriAgroCore helps me reach better markets.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      rating: 4.6,
      verified: true,
    },
    {
      id: 3,
      name: "Kwame Osei",
      farmName: "Savanna Fields",
      location: "Accra, Ghana",
      farmSize: "8 hectares",
      crops: ["Cocoa", "Plantains", "Yams"],
      yearsExperience: 5,
      phone: "+233 501 234 567",
      email: "kwame@farm.com",
      bio: "Young farmer embracing technology. The AI disease detection has saved my crops multiple times.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      rating: 4.9,
      verified: true,
    },
  ];

  // Demo Consultant Profiles
  const consultantProfiles = [
    {
      id: 1,
      name: "Dr. Amara Okonkwo",
      specialization: "Crop Production & Agronomy",
      certifications: ["MSc Agronomy", "PhD Plant Science", "Certified Agronomist"],
      languages: ["English", "Yoruba", "Igbo"],
      availability: "Mon-Fri 9am-5pm GMT",
      hourlyRate: 75,
      phone: "+234 801 234 5678",
      email: "amara@consultant.com",
      bio: "Over 20 years of experience in crop production. Specializes in sustainable farming practices and yield optimization.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      rating: 4.9,
      verified: true,
      consultations: 450,
    },
    {
      id: 2,
      name: "James Kipchoge",
      specialization: "Pest & Disease Management",
      certifications: ["BSc Entomology", "Certified Pest Manager"],
      languages: ["English", "Swahili"],
      availability: "Tue-Sat 8am-6pm EAT",
      hourlyRate: 60,
      phone: "+254 702 345 6789",
      email: "james@consultant.com",
      bio: "Expert in integrated pest management and organic solutions. Helped over 500 farmers reduce crop losses.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      rating: 4.7,
      verified: true,
      consultations: 380,
    },
    {
      id: 3,
      name: "Fatima Hassan",
      specialization: "Soil Science & Fertility",
      certifications: ["MSc Soil Science", "Certified Soil Scientist"],
      languages: ["English", "Arabic", "Swahili"],
      availability: "Mon-Thu 10am-4pm CAT",
      hourlyRate: 65,
      phone: "+255 755 456 7890",
      email: "fatima@consultant.com",
      bio: "Specializes in soil testing and fertility management. Helps farmers optimize their soil health for maximum yields.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      rating: 4.8,
      verified: true,
      consultations: 320,
    },
  ];

  // Demo Seller Profiles
  const sellerProfiles = [
    {
      id: 1,
      name: "Golden Harvest Ltd",
      businessType: "Agricultural Supplies",
      products: ["Seeds", "Fertilizers", "Soil Amendments"],
      location: "Lagos, Nigeria",
      phone: "+234 803 456 7890",
      email: "sales@goldenharvest.com",
      bio: "Premium supplier of certified seeds and fertilizers. Serving farmers across West Africa for 15 years.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
      rating: 4.7,
      verified: true,
      productsListed: 45,
    },
    {
      id: 2,
      name: "AgroTech Solutions",
      businessType: "Farm Equipment & Tools",
      products: ["Farm Tools", "Irrigation Equipment", "Machinery"],
      location: "Nairobi, Kenya",
      phone: "+254 703 567 8901",
      email: "info@agrotech.com",
      bio: "Leading supplier of modern farming equipment and tools. We help farmers increase productivity through technology.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
      rating: 4.5,
      verified: true,
      productsListed: 38,
    },
    {
      id: 3,
      name: "Premium Chemicals",
      businessType: "Agrochemicals & Pesticides",
      products: ["Pesticides", "Herbicides", "Fungicides", "Insecticides"],
      location: "Dar es Salaam, Tanzania",
      phone: "+255 756 678 9012",
      email: "contact@premiumchem.com",
      bio: "Quality agrochemicals for crop protection. All products are certified and environmentally responsible.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop",
      rating: 4.6,
      verified: true,
      productsListed: 52,
    },
  ];

  const FarmerCard = ({ profile }: { profile: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-32"></div>
        <div className="p-6 -mt-16 relative">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
              {profile.verified && <Badge className="bg-green-500">Verified</Badge>}
            </div>
            <p className="text-emerald-600 font-semibold">{profile.farmName}</p>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {profile.location}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div>
                <p className="text-gray-600">Farm Size</p>
                <p className="font-semibold text-gray-900">{profile.farmSize}</p>
              </div>
              <div>
                <p className="text-gray-600">Experience</p>
                <p className="font-semibold text-gray-900">{profile.yearsExperience} years</p>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-gray-600 text-sm">Main Crops:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.crops.map((crop: string) => (
                  <Badge key={crop} variant="outline" className="text-xs">
                    {crop}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-gray-700 text-sm mt-4 italic">"{profile.bio}"</p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(profile.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-700">{profile.rating}</span>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700">View Profile</Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const ConsultantCard = ({ profile }: { profile: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-32"></div>
        <div className="p-6 -mt-16 relative">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
              {profile.verified && <Badge className="bg-green-500">Verified</Badge>}
            </div>
            <p className="text-blue-600 font-semibold flex items-center">
              <Award className="w-4 h-4 mr-1" />
              {profile.specialization}
            </p>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div>
                <p className="text-gray-600">Hourly Rate</p>
                <p className="font-semibold text-gray-900">${profile.hourlyRate}</p>
              </div>
              <div>
                <p className="text-gray-600">Consultations</p>
                <p className="font-semibold text-gray-900">{profile.consultations}+</p>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-gray-600 text-sm">Languages:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.languages.map((lang: string) => (
                  <Badge key={lang} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-gray-700 text-sm mt-4 italic">"{profile.bio}"</p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(profile.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-700">{profile.rating}</span>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Book Consultation</Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const SellerCard = ({ profile }: { profile: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-32"></div>
        <div className="p-6 -mt-16 relative">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
          />
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
              {profile.verified && <Badge className="bg-green-500">Verified</Badge>}
            </div>
            <p className="text-orange-600 font-semibold flex items-center">
              <Briefcase className="w-4 h-4 mr-1" />
              {profile.businessType}
            </p>
            <div className="flex items-center text-gray-600 text-sm mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {profile.location}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <div>
                <p className="text-gray-600">Products Listed</p>
                <p className="font-semibold text-gray-900">{profile.productsListed}</p>
              </div>
              <div>
                <p className="text-gray-600">Rating</p>
                <p className="font-semibold text-gray-900">{profile.rating}★</p>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-gray-600 text-sm">Categories:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {profile.products.map((product: string) => (
                  <Badge key={product} variant="outline" className="text-xs">
                    {product}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="text-gray-700 text-sm mt-4 italic">"{profile.bio}"</p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(profile.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-sm font-semibold text-gray-700">{profile.rating}</span>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700">View Store</Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AfriAgroCore Community Profiles</h1>
          <p className="text-xl text-gray-600">Meet the farmers, consultants, and sellers transforming African agriculture</p>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="farmers">Farmers</TabsTrigger>
            <TabsTrigger value="consultants">Consultants</TabsTrigger>
            <TabsTrigger value="sellers">Sellers</TabsTrigger>
          </TabsList>

          {/* Farmers Tab */}
          <TabsContent value="farmers" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerProfiles.map((profile) => (
                <FarmerCard key={profile.id} profile={profile} />
              ))}
            </div>
          </TabsContent>

          {/* Consultants Tab */}
          <TabsContent value="consultants" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {consultantProfiles.map((profile) => (
                <ConsultantCard key={profile.id} profile={profile} />
              ))}
            </div>
          </TabsContent>

          {/* Sellers Tab */}
          <TabsContent value="sellers" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sellerProfiles.map((profile) => (
                <SellerCard key={profile.id} profile={profile} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
