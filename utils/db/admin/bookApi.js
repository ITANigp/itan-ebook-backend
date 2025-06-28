import { api } from "@/utils/auth/adminApi"

// Get all book

export async function getAllBooks () {
   try {
      const response = await api.get("/books")
      console.log("all book api from admin platform: ", response.data)
      return response.data
   }
   catch (err) {
       console.log("all book api from admin platform Error: ", err);
   }
}
