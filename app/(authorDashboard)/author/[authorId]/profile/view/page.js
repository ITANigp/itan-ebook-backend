"use client";

import { useEffect, useState } from "react";
import { getAuthorProfile } from "@/utils/api";

export default function AuthorProfilePage() {
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getAuthorProfile();
        setAuthor(data);
        console.log("View Author: ", data);
      } catch (err) {
        setError("Failed to load author profile.");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!author) {
    return <div>Loading author profile...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Author Profile</h1>
      <img
        src={author.author_profile_image_url}
        className="h-9 w-9 rounded-full"
      />
      <p>
        <strong>First Name:</strong> {author.first_name}
      </p>
      <p>
        <strong>Last Name:</strong> {author.last_name}
      </p>
      <p>
        <strong>Bio:</strong> {author.bio}
      </p>
      <p>
        <strong>Phone:</strong> {author.phone_number}
      </p>
      <p>
        <strong>Country:</strong> {author.country}
      </p>
      <p>
        <strong>Location:</strong> {author.location}
      </p>
    </div>
  );
}
