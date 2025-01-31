import { GoogleGenerativeAI } from "@google/generative-ai";
import { configDotenv } from "dotenv";

// Load environment variables from the .env file
configDotenv();

const apiKey = process.env.API_KEY; // Access the API key from the environment variables
if (!apiKey) {
    console.error("API_KEY is missing in .env file");
    process.exit(1); // Exit if the API_KEY is not found
}

const genAI = new GoogleGenerativeAI(apiKey); // Use the API key from .env
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

const prompt = "your mevin";

async function result(){
    console.log("hii");
    const res = await model.generateContent(prompt);
    console.log(res.response.text()); // Assuming 'text()' is the correct method to access the content
}

result();
