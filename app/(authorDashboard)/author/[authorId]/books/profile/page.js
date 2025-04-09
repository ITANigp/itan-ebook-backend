// app/author/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getAuthorProfile } from "@/lib/api";
import Image from "next/image";

export default function AuthorProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getAuthorProfile();
        setProfile(data);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!profile) return <p className="p-4">No profile found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Author Profile</h1>
      {profile.author_profile_image_url && (
        <Image
          src={profile.author_profile_image_url}
          alt="Author profile"
          width={150}
          height={150}
          className="rounded-full mb-4"
        />
      )}
      <p>
        <strong>Name:</strong> {profile.first_name} {profile.last_name}
      </p>
      <p>
        <strong>Bio:</strong> {profile.bio}
      </p>
      <p>
        <strong>Phone:</strong> {profile.phone_number}
      </p>
      <p>
        <strong>Location:</strong> {profile.location}, {profile.country}
      </p>
    </div>
  );
}
