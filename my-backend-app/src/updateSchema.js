import dotenv from "dotenv";
import mongoose from "mongoose";
import Ad from "./models/ad.js"; // Adjust path if necessary
import wallAd from "./models/wallAd.js";
import autowala from "./models/Autowala.js";
import helmetwala from "./models/Helmetwala.js";

dotenv.config(); // Load environment variables

const mongoURI = process.env.MONGODB_URI; // Ensure this matches your .env variable name

if (!mongoURI) {
  console.error("❌ MONGODB_URI is not defined. Check your .env file.");
  process.exit(1);
}

async function updateExistingAds() {
  try {
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    const result = await Ad.updateMany(
      { status: { $exists: false } },
      { $set: { status: "pending" } }
    );
    const result1 = await wallAd.updateMany(
        { status: { $exists: false } },
        { $set: { status: "pending" } }
      );
      const result2 = await helmetwala.updateMany(
        { status: { $exists: false } },
        { $set: { status: "pending" } }
      );
      const result3 = await autowala.updateMany(
        { status: { $exists: false } },
        { $set: { status: "pending" } }
      );
      
    console.log(`✅ Updated ${result.modifiedCount} documents.`);

    await mongoose.connection.close(); 
    console.log("🔌 MongoDB connection closed.");
  } catch (err) {
    console.error("❌ Error updating documents:", err);
    process.exit(1);
  }
}

updateExistingAds();
