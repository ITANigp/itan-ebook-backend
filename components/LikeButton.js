import React, { useState, useEffect } from "react";

import { api } from "@/utils/auth/readerApi";

/**
 * LikeButton Component
 *
 * A reusable React component for liking and unliking a book.
 * It handles the UI state (liked/unliked, loading, error) and
 * interacts with the backend API.
 *
 * Props:
 * - bookId: The UUID of the book to like/unlike. (string, required)
 * - userToken: The JWT token of the authenticated user. (string | null, required)
 * If null, the button will prompt the user to log in.
 *
 * Usage:
 * <LikeButton bookId="some-book-uuid-123" userToken={yourUserJwtToken} />
 */
const LikeButton = ({ bookId, userToken }) => {
  // State to track if the current user has liked this book
  const [isLiked, setIsLiked] = useState(false);
  // State to store the ID of the 'like' record, needed for DELETE requests
  const [likeId, setLikeId] = useState(null);
  // State to manage loading status during API calls
  const [isLoading, setIsLoading] = useState(true);
  // State to store any error messages
  const [error, setError] = useState(null);

  // useEffect to fetch the initial like status when the component mounts
  // or when bookId/userToken changes.
  useEffect(() => {
    const fetchInitialLikeStatus = async () => {
      if (!bookId) {
        setError("Book ID is missing.");
        setIsLoading(false);
        return;
      }

      // If no user token, we can't check like status for this user
      if (!userToken) {
        setIsLiked(false);
        setLikeId(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // IMPORTANT: You might need to implement a new endpoint in your backend
        // (e.g., GET /api/v1/likes/status?book_id=UUID) that checks if the
        // authenticated user has liked a specific book and returns the like_id.
        // For this example, we assume such an endpoint exists.
        const response = await fetch(
          `${API_BASE_URL}/likes/status?book_id=${bookId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Assuming the backend returns { isLiked: boolean, likeId: string | null }
          setIsLiked(data.isLiked);
          setLikeId(data.likeId);
        } else if (response.status === 404) {
          // If the status endpoint returns 404, it might mean no like found
          setIsLiked(false);
          setLikeId(null);
        } else {
          const errorData = await response.json();
          setError(
            `Failed to fetch like status: ${errorData.message || response.statusText}`
          );
          console.error("Error fetching initial like status:", errorData);
        }
      } catch (err) {
        setError(`Network error: ${err.message}`);
        console.error("Network error fetching initial like status:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialLikeStatus();
  }, [bookId, userToken]); // Re-run effect if bookId or userToken changes

  // Function to handle the like/unlike toggle
  const handleLikeToggle = async () => {
    if (!userToken) {
      setError("Please log in to like or unlike a book.");
      return;
    }

    if (isLoading) return; // Prevent multiple clicks while an operation is in progress

    setIsLoading(true);
    setError(null);

    try {
      if (isLiked) {
        // User wants to UNLIKE the book (DELETE request)
        if (!likeId) {
          setError("Cannot unlike: Like ID is missing. Please refresh.");
          setIsLoading(false);
          return;
        }

        const response = await api.delete(`/likes/${likeId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.ok) {
          setIsLiked(false);
          setLikeId(null); // Clear likeId as the like record no longer exists
          console.log("Book unliked successfully!");
        } else {
          const errorData = await response.json();
          setError(
            `Failed to unlike book: ${errorData.message || response.statusText}`
          );
          console.error("Failed to unlike book:", errorData);
        }
      } else {
        // User wants to LIKE the book (POST request)
        const response = await api.post(`${API_BASE_URL}/likes`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ book_id: bookId }),
        });

        if (response.ok) {
          const data = await response.json();
          // Assuming your POST endpoint returns the newly created like's ID
          // e.g., { message: "Like created", like_id: "new-like-uuid" }
          setIsLiked(true);
          setLikeId(data.like_id); // Store the returned like_id
          console.log("Book liked successfully!", data);
        } else {
          const errorData = await response.json();
          setError(
            `Failed to like book: ${errorData.message || response.statusText}`
          );
          console.error("Failed to like book:", errorData);
        }
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
      console.error("Network error during like/unlike:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Render the button/icon
  return (
    <div className="flex flex-col items-center p-4">
      <button
        onClick={handleLikeToggle}
        disabled={isLoading || !userToken} // Disable if loading or not authenticated
        className={`
          relative p-3 rounded-full transition-all duration-300 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${
            isLiked
              ? "text-red-500 bg-red-100 hover:bg-red-200 focus:ring-red-500"
              : "text-gray-400 bg-gray-100 hover:bg-gray-200 focus:ring-gray-400"
          }
          ${isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
        `}
        title={
          userToken
            ? isLiked
              ? "Unlike this book"
              : "Like this book"
            : "Log in to like"
        }
      >
        {isLoading ? (
          // Simple loading spinner (Tailwind CSS based)
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          // Heart icon (using a simple SVG for demonstration)
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill={isLiked ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        )}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
      {!userToken && !isLoading && (
        <p className="mt-2 text-sm text-gray-500 text-center">
          Log in to like this book.
        </p>
      )}
    </div>
  );
};

export default LikeButton;
