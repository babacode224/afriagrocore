"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
    import { Card } from "@/components/ui/card";
import { toast } from "sonner";
    import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";

export default function FarmerRegistration() {
  const [formData, setFormData] = useState({
    farmName: "",
    farmSize: "",
    cropTypes: "",
    location: "",
    yearsExperience: "",
    phoneNumber: "",
    bio: "",
  });

  const createFarmerProfile = trpc.profiles.farmer.create.useMutation({
    onSuccess: () => {
      toast.success("Farmer profile created successfully!");
      setFormData({
        farmName: "",
        farmSize: "",
        cropTypes: "",
        location: "",
        yearsExperience: "",
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
    
    if (!formData.farmName || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    createFarmerProfile.mutate({
      ...formData,
      yearsExperience: formData.yearsExperience ? parseInt(formData.yearsExperience) : undefined,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 bg-white">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Farmer Registration</h2>
        <p className="text-gray-600 mt-2">Join AfriAgroCore and access AI-powered farming solutions</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Farm Name */}
        <div>
          <Label htmlFor="farmName" className="text-sm font-semibold text-gray-700">
            Farm Name *
          </Label>
          <Input
            id="farmName"
            name="farmName"
            value={formData.farmName}
            onChange={handleChange}
            placeholder="e.g., Green Valley Farm"
            className="mt-2"
            required
          />
        </div>

        {/* Farm Size */}
        <div>
          <Label htmlFor="farmSize" className="text-sm font-semibold text-gray-700">
            Farm Size
          </Label>
          <Input
            id="farmSize"
            name="farmSize"
            value={formData.farmSize}
            onChange={handleChange}
            placeholder="e.g., 5 hectares"
            className="mt-2"
          />
        </div>

        {/* Crop Types */}
        <div>
          <Label htmlFor="cropTypes" className="text-sm font-semibold text-gray-700">
            Main Crops (comma-separated)
          </Label>
          <Input
            id="cropTypes"
            name="cropTypes"
            value={formData.cropTypes}
            onChange={handleChange}
            placeholder="e.g., Rice, Maize, Cassava"
            className="mt-2"
          />
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-sm font-semibold text-gray-700">
            Location *
          </Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Lagos, Nigeria"
            className="mt-2"
            required
          />
        </div>

        {/* Years of Experience */}
        <div>
          <Label htmlFor="yearsExperience" className="text-sm font-semibold text-gray-700">
            Years of Farming Experience
          </Label>
          <Input
            id="yearsExperience"
            name="yearsExperience"
            type="number"
            value={formData.yearsExperience}
            onChange={handleChange}
            placeholder="e.g., 10"
            className="mt-2"
            min="0"
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
            placeholder="e.g., +234 801 234 5678"
            className="mt-2"
          />
        </div>

        {/* Bio */}
        <div>
          <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">
            About Your Farm
          </Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about your farming practices and goals..."
            className="mt-2"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={createFarmerProfile.isPending}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg"
        >
          {createFarmerProfile.isPending ? "Creating Profile..." : "Create Farmer Profile"}
        </Button>
      </form>
    </Card>
  );
}
