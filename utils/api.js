import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export const registerAuthor = async (email, password) => {
    try {
        const response = await api.post("/authors", {
            author: { email, password },
        });

        return response.data;
    } catch (error) {
        console.error("Registration failed:", error.response?.data?.message || error.message || "Unknown error");

        return {
            success: false,
            message: error.response?.data?.message || "Something went wrong. Please try again.",
        };
    }
};

// Sign in an author
// export const signInAuthor = async (email, password) => {
//   try {
//     const response = await api.post("/authors/sign_in", {
//       author: { email, password },
//     });
//     console.log("Sign-in successful:", response.data);
//     return response.data;
//   } catch (error) {
//     const errorMessage = error.response?.data?.message || "Sign-in failed. Please try again.";
//     console.error("Sign-in failed:", errorMessage);
//     throw new Error(errorMessage);
//   }
// };

// Define signInAuthor outside the component
export const signInAuthor = async (email, password) => {
  try {
    const response = await api.post("/authors/sign_in", {
      author: { email, password },
    });

    return response.data;
     
    // const { author } = response.data;
    // if (!author || !author.id) {
    //   throw new Error("Invalid response from server");
    // }

    // if (typeof window !== "undefined") {
    //   localStorage.setItem("authorId", author.id);
    // }

    // console.log("Sign-in successful:", response.data);
    // return author;
  } catch (error) {
    // const errorMessage = error.response?.data?.message || "Sign-in failed. Please try again.";
    // console.error("Sign-in failed:", error.response?.data || error);
    throw error;
  }
};


// Sign out an author
export const signOutAuthor = async () => {
    try {
      await api.delete("/authors/sign_out");
      return { success: true };
    } catch (error) {
      console.error("Sign-out failed:", error.response?.data || error);
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