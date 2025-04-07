import { useRouter } from "next/navigation";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// Register an author
export const registerAuthor = async (email, password) => {
  try {
    const response = await api.post("/authors", {
      author: { email, password },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data?.message || error.message || "Unknown error"
    );

    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
    };
  }
};

// Sign in an author
export const signInAuthor = async (email, password) => {
  try {
    const response = await api.post("/authors/sign_in", {
      author: { email, password },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Sign out an author
export const signOutAuthor = async () => {
  try {
    await api.delete("/authors/sign_out");
    localStorage.removeItem("authorInfo");

    const router = useRouter();
    router.push("/author/sign_in");

    return { success: true };
  } catch (error) {
    console.error("Sign-out failed:", error.response?.data || error);
  }
};

// Get Author Profile (GET /authors/profile)
export const getAuthorProfile = async () => {
  try {
    const response = await api.get("/authors/profile");
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch author profile:",
      error.response?.data || error
    );
    throw error;
  }
};

// Create Author Profile (POST /authors/profile)
export const createAuthorProfile = async (authorData, imageFile) => {
  try {
    const formData = new FormData();
    for (const key in authorData) {
      formData.append(`author[${key}]`, authorData[key]);
    }
    if (imageFile) {
      formData.append("author[author_profile_image]", imageFile);
    }

    const response = await api.post("/authors/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to create profile:", error.response?.data || error);
    throw error;
  }
};

// Update Author Profile (PUT or PATCH /authors/profile)
export const updateAuthorProfile = async (authorData, imageFile) => {
  try {
    const formData = new FormData();
    for (const key in authorData) {
      formData.append(`author[${key}]`, authorData[key]);
    }
    if (imageFile) {
      formData.append("author[author_profile_image]", imageFile);
    }

    const response = await api.patch("/authors/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to update profile:", error.response?.data || error);
    throw error;
  }
};

// Sign in an admin
export const signInAdmin = async (email, password) => {
  try {
    const response = await api.post("/admins/sign_in", {
      admin: { email, password },
    });
    return response.data;
  } catch (error) {
    console.error("Admin sign-in failed:", error.response?.data || error);
    throw error;
  }
};

// Sign out an admin
export const signOutAdmin = async () => {
  try {
    await api.delete("/admins/sign_out");
    return { success: true };
  } catch (error) {
    console.error("Admin sign-out failed:", error.response?.data || error);
    throw error;
  }
};
