import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
   try {
      const body = await req.json();
      const {
         name,
         role,
         foodRating,
         arrangementRating,
         overallRating,
         comments,
         deviceInfo,
      } = body;

      // Validate input
      if (!name || !role || !foodRating || !arrangementRating || !overallRating || !comments || !deviceInfo) {
         return new Response(JSON.stringify({ error: "All fields are required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
         });
      }

      // Save feedback to PostgreSQL database
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

      return new Response(JSON.stringify({ success: true, feedback }), {
         status: 200,
         headers: { "Content-Type": "application/json" },
      });
   } catch (error) {
      console.error("Database Error:", error);
      return new Response(JSON.stringify({ error }), {
         status: 500,
         headers: { "Content-Type": "application/json" },
      });
   }
}