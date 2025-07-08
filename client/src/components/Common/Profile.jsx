"use client";

import React, { useState, useEffect } from "react";
import {
  useCheckAuthQuery,
  useUpdateProfileMutation,
} from "@/redux/ApiController/authApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Profile() {
  const { data, refetch } = useCheckAuthQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const user = data?.user;

  const [formData, setFormData] = useState({
    name: "",
    versity: "",
    profession: "",
    country: "",
    subject: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [cvFile, setCVFile] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        versity: user.versity || "",
        profession: user.profession || "",
        country: user.country || "",
        subject: user.subject || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("versity", formData.versity);
      dataToSend.append("profession", formData.profession);
      dataToSend.append("country", formData.country);
      dataToSend.append("subject", formData.subject);

      if (photoFile) dataToSend.append("photo", photoFile);
      if (cvFile) dataToSend.append("CV", cvFile);

      const updated = await updateProfile(dataToSend).unwrap();

      setFormData({
        name: updated.user.name || "",
        versity: updated.user.versity || "",
        profession: updated.user.profession || "",
        country: updated.user.country || "",
        subject: updated.user.subject || "",
      });

      setPhotoFile(null);
      setCVFile(null);
      refetch();
      toast.success("✅ Profile updated!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed");
    }
  };

  if (!user) return <div>Loading...</div>;

  const baseURL = import.meta.env.VITE_BASE_URL;

  return (
    <div className="mt-18 max-w-3xl mx-auto p-4 py-20">
      {/* User Info */}
      <div className="flex items-center gap-6 mb-8 mt-12 p-8 bg-white rounded-3xl shadow-xl border border-gray-200">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-blue-600 shadow-md">
          <img
            src={
              photoFile
                ? URL.createObjectURL(photoFile)
                : user.photo
                ? `${baseURL}${user.photo}`
                : "https://via.placeholder.com/100"
            }
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-gray-900">{user.name}</h2>
          <p className="text-gray-500 mt-1">{user.email}</p>
          <p className="text-sm text-gray-600 mt-2">
            <span className="font-medium">Role:</span> {user.role}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Profession:</span> {user.profession}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Subject:</span> {user.subject}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Country:</span> {user.country}
          </p>
          {user.CV && (
            <a
              href={`${baseURL}${user.CV}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-blue-600 font-medium underline hover:text-blue-800 transition"
            >
              📄 View CV
            </a>
          )}
        </div>
      </div>

      {/* Update Profile Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition">
            Update Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md p-8 rounded-2xl bg-gradient-to-tr from-sky-50 to-white shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              Update Profile
            </DialogTitle>
          </DialogHeader>

          <form
            className="space-y-6 mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <div>
              <Label>Name</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
                className="focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label>University</Label>
                <Input
                  name="versity"
                  value={formData.versity}
                  onChange={handleInputChange}
                  placeholder="Your university"
                  className="focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
              <div className="flex-1">
                <Label>Profession</Label>
                <Input
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  placeholder="Your profession"
                  className="focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Subject</Label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Your subject"
                  className="focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
              <div className="flex-1">
                <Label>Country</Label>
                <Input
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Your country"
                  className="focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              </div>
            </div>

            <div className="flex gap-4">

              <div>
                <Label>Profile Photo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files[0])}
                  className="cursor-pointer"
                />
              </div>

              <div>
                <Label>CV (PDF)</Label>
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setCVFile(e.target.files[0])}
                  className="cursor-pointer"
                />
              </div>
            </div>

            <div className="text-right">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
