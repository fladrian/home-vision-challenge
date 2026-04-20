import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API Client
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

// Use a stable supported model. gemini-3-flash-preview
const MODEL_NAME = 'gemini-3-flash-preview';

export const generatePropertySummary = async (houseStr: string, extraDataStr: string): Promise<string> => {
  if (!API_KEY) throw new Error("Gemini API Key missing.");

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = `You are "PropsVision AI", an expert PropTech assistant.
  Write a 3-sentence dynamic, persuasive summary of the following property data:
  House: ${houseStr}
  Details: ${extraDataStr}

  Calculate and mention the price per square foot if possible. Be enthusiastic but professional.
  Do not use markdown formatting like asterisks or bold text, just plain text.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (e) {
    console.error("Error calling Gemini API:", e);
    throw new Error("Unable to generate summary at this time.");
  }
};

export const generateComparisonVerdict = async (propertiesStr: string): Promise<string> => {
  if (!API_KEY) throw new Error("Gemini API Key missing.");

  const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  const prompt = `You are "PropsVision AI", an expert PropTech data analyst.
  Compare the following real estate properties and provide a "PropsVision Verdict".
  Properties: ${propertiesStr}

  Provide a short, punchy 2-3 sentence verdict on which property offers the best value. 
  State standard reasoning (e.g. price, size, locations).
  Do not use markdown formatting like asterisks or bold text, just plain text.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (e) {
    console.error("Error calling Gemini API:", e);
    throw new Error("Unable to generate verdict at this time.");
  }
};
