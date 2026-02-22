"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function SellerRegistration() {
  const [formData, setFormData] = useState({
    businessName: "",
    registrationNumber: "",
    productCategories: "",
    location: "",
    phoneNumber: "",
    bio: "",
  });

  const createSellerProfile = trpc.profiles.seller.create.useMutation({
    onSuccess: () => {
      toast.success("Seller profile created successfully!");
      setFormData({
        businessName: "",
        registrationNumber: "",
        productCategories: "",
        location: "",
        phoneNumber: "",
        bio: "",
      });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create profile");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.productCategories) {
      toast.error("Please fill in all required fields");
      return;
    }

    createSellerProfile.mutate(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 bg-white">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Seller Registration</h2>
        <p className="text-gray-600 mt-2">List your farm products and reach thousands of buyers</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div>
          <Label htmlFor="businessName" className="text-sm font-semibold text-gray-700">
            Business Name *
          </Label>
          <Input
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g., Golden Harvest Supplies"
            className="mt-2"
            required
          />
        </div>

        {/* Registration Number */}
        <div>
          <Label htmlFor="registrationNumber" className="text-sm font-semibold text-gray-700">
            Business Registration Number
          </Label>
          <Input
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            placeholder="e.g., CAC/2023/12345"
            className="mt-2"
          />
        </div>

        {/* Product Categories */}
        <div>
          <Label htmlFor="productCategories" className="text-sm font-semibold text-gray-700">
            Product Categories (comma-separated) *
          </Label>
          <Input
            id="productCategories"
            name="productCategories"
            value={formData.productCategories}
            onChange={handleChange}
            placeholder="e.g., Seeds, Fertilizers, Farm Tools, Pesticides"
            className="mt-2"
            required
          />
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
            Business Location
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Ibadan, Oyo State, Nigeria"
            className="mt-2"
          />
        </div>

        {/* Phone Number */}
        <div>
          <Label htmlFor="phoneNumber" className="text-sm font-semibold text-gray-700">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="e.g., +234 803 456 7890"
            className="mt-2"
          />
        </div>

        {/* Bio */}
        <div>
          <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">
            Business Description
          </Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell farmers about your business, products, and what makes you unique..."
            className="mt-2"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={createSellerProfile.isPending}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-lg"
        >
          {createSellerProfile.isPending ? "Creating Profile..." : "Create Seller Profile"}
        </Button>
      </form>
    </Card>
  );
}
