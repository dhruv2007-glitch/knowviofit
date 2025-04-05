import { GoogleGenAI } from "@google/genai";
import { conf } from "../config/conf.js";
import { motivationalMessage, progressiveAnalysis, workOutSuggestion, } from "./prompt.js";
const ai = new GoogleGenAI({ apiKey: conf.geminiKey });
const getMotivationalMessage = async (data) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${motivationalMessage} ${data}`,
    });
    return response.text;
};
const getProgressiveAnalysis = async (data) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${progressiveAnalysis} ${data}`,
    });
    return response.text;
};
const getWorkOutSuggestion = async (data) => {
    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `${workOutSuggestion} ${data}`,
    });
    return response.text;
};
export { getMotivationalMessage, getProgressiveAnalysis, getWorkOutSuggestion };
