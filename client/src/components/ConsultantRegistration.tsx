"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function ConsultantRegistration() {
  const [formData, setFormData] = useState({
    fullName: "",
    specializations: "",
    certifications: "",
    hourlyRate: "",
    bio: "",
    availability: "",
    languages: "",
  });

  const createConsultantProfile = trpc.profiles.consultant.create.useMutation({
    onSuccess: () => {
      toast.success("Consultant profile created successfully!");
      setFormData({
        fullName: "",
        specializations: "",
        certifications: "",
        hourlyRate: "",
        bio: "",
        availability: "",
        languages: "",
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
    
    if (!formData.fullName || !formData.specializations) {
      toast.error("Please fill in all required fields");
      return;
    }

    createConsultantProfile.mutate({
      ...formData,
      hourlyRate: formData.hourlyRate ? parseInt(formData.hourlyRate) * 100 : undefined,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-8 bg-white">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Consultant Registration</h2>
        <p className="text-gray-600 mt-2">Join our network of agricultural experts and help farmers succeed</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Full Name */}
        <div>
          <Label htmlFor="fullName" className="text-sm font-semibold text-gray-700">
            Full Name *
          </Label>
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="e.g., Dr. Amara Okonkwo"
            className="mt-2"
            required
          />
        </div>

        {/* Specializations */}
        <div>
          <Label htmlFor="specializations" className="text-sm font-semibold text-gray-700">
            Specializations (comma-separated) *
          </Label>
          <Input
            id="specializations"
            name="specializations"
            value={formData.specializations}
            onChange={handleChange}
            placeholder="e.g., Crop Production, Pest Management, Soil Science"
            className="mt-2"
            required
          />
        </div>

        {/* Certifications */}
        <div>
          <Label htmlFor="certifications" className="text-sm font-semibold text-gray-700">
            Certifications (comma-separated)
          </Label>
          <Input
            id="certifications"
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            placeholder="e.g., MSc Agronomy, Certified Agronomist"
            className="mt-2"
          />
        </div>

        {/* Hourly Rate */}
        <div>
          <Label htmlFor="hourlyRate" className="text-sm font-semibold text-gray-700">
            Hourly Rate (USD)
          </Label>
          <Input
            id="hourlyRate"
            name="hourlyRate"
            type="number"
            value={formData.hourlyRate}
            onChange={handleChange}
            placeholder="e.g., 50"
            className="mt-2"
            min="0"
          />
        </div>

        {/* Availability */}
        <div>
          <Label htmlFor="availability" className="text-sm font-semibold text-gray-700">
            Availability
          </Label>
          <Input
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            placeholder="e.g., Mon-Fri 9am-5pm (GMT)"
            className="mt-2"
          />
        </div>

        {/* Languages */}
        <div>
          <Label htmlFor="languages" className="text-sm font-semibold text-gray-700">
            Languages (comma-separated)
          </Label>
          <Input
            id="languages"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="e.g., English, Yoruba, Swahili"
            className="mt-2"
          />
        </div>

        {/* Bio */}
        <div>
          <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">
            Professional Bio
          </Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell farmers about your expertise and experience..."
            className="mt-2"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={createConsultantProfile.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
        >
          {createConsultantProfile.isPending ? "Creating Profile..." : "Create Consultant Profile"}
        </Button>
      </form>
    </Card>
  );
}
