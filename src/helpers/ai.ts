import { GoogleGenAI } from "@google/genai";
import { conf } from "../config/conf";
import {
	motivationalMessage,
	progressiveAnalysis,
	workOutSuggestion,
} from "./prompt";

const ai = new GoogleGenAI({ apiKey: conf.geminiKey });

async function main() {
	const response = await ai.models.generateContent({
		model: "gemini-2.0-flash",
		contents: "Explain how AI works",
	});
	console.log(response.text);
}

await main();

const getMotivationalMessage = async (data: string) => {
	const response = await ai.models.generateContent({
		model: "gemini-2.0-flash",
		contents: `${motivationalMessage} ${data}`,
	});
	return response.text;
};

const getProgressiveAnalysis = async (data: string) => {
	const response = await ai.models.generateContent({
		model: "gemini-2.0-flash",
		contents: `${progressiveAnalysis} ${data}`,
	});
	return response.text;
};
const getWorkOutSuggestion = async (data: string) => {
	const response = await ai.models.generateContent({
		model: "gemini-2.0-flash",
		contents: `${workOutSuggestion} ${data}`,
	});
	return response.text;
};
export { getMotivationalMessage, getProgressiveAnalysis, getWorkOutSuggestion };
