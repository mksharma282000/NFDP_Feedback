import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
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

      // Validate input
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

      // Save feedback to database
      const feedback = await prisma.feedback.create({
        data: {
          name,
          role,
          foodRating: Number(foodRating),
          arrangementRating: Number(arrangementRating),
          overallRating: Number(overallRating),
          comments,
          deviceInfo, // Now correctly storing device info
        },
      });

      return res.status(200).json({ success: true, feedback });
    } catch (error) {
      console.error("Database Error:", error);
      return res
        .status(500)
        .json({ error: "Something went wrong on the server" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
