import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).json({ message: "CORS preflight successful" }); // ✅ Return valid JSON
  }

  if (req.method === "POST") {
    try {
      const {
        name,
        role,
        foodRating,
        arrangementRating,
        overallRating,
        comments,
        deviceInfo,
      } = req.body;

      if (
        !name ||
        !role ||
        !foodRating ||
        !arrangementRating ||
        !overallRating ||
        !comments ||
        !deviceInfo
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }

      const feedback = await prisma.feedback.create({
        data: {
          name,
          role,
          foodRating: Number(foodRating),
          arrangementRating: Number(arrangementRating),
          overallRating: Number(overallRating),
          comments,
          deviceInfo,
        },
      });

      return res.status(200).json({ success: true, feedback });
    } catch (error) {
      console.error("Database Error:", error);
      return res
        .status(500)
        .json({ error: "Something went wrong on the server" }); // ✅ Ensure valid JSON
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" }); // ✅ Ensure valid JSON
  }
}
