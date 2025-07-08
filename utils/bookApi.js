import axios from "axios";
import { api } from "@/utils/auth/readerApi"

const BASE_API = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function refreshReadingToken(readerToken, purchaseId) {

  try {
    const response = await api.post(
      `/purchases/refresh_reading_token`,
      {
    
        headers: {
          Authorization: `Bearer ${readerToken}`
        },
        body: JSON.stringify({ purchase_id: purchaseId }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to refresh reading token");
    }

    const data = await response.json();
    return data.reading_token;
  } catch (error) {
    console.error("Error refreshing reading token:", error);
    throw error;
  }
}

export async function getBookContent(readingToken, bookId) {
  try {
    const response = await api.get(`/books/${bookId}/content`, {
      headers: {
        Authorization: `Bearer ${readingToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to access book content");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error accessing book content:", error);
    throw error;
  }
}

// Get all the book

export async function getAllBook() {
  try {
    const response = await axios.get(`${BASE_API}/books/`);

    const data = response.data; // ✅ Correct for Axios
    console.log("Fetched All Books: ", data);

    return data;
  } catch (error) {
    console.error("Error fetching All Books:", error);
    throw error;
  }
}



