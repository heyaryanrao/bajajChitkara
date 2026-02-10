const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
};

const calculateLCM = (arr) => {
    if (!arr || arr.length === 0) return null;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = (result * arr[i]) / gcd(result, arr[i]);
    }
    return result;
};

const calculateHCF = (arr) => {
    if (!arr || arr.length === 0) return null;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = gcd(result, arr[i]);
    }
    return result;
};

const generateFibonacci = (n) => {
    if (n <= 0) return [];
    if (n === 1) return [0];
    const sequence = [0, 1];
    while (sequence.length < n) {
        const next = sequence[sequence.length - 1] + sequence[sequence.length - 2];
        sequence.push(next);
    }
    return sequence;
};

const getPrimes = (arr) => {
    return arr.filter(num => isPrime(num));
};

const callGeminiAI = async (question) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return "Error: API Key missing";

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{
                parts: [{
                    text: `Answer the following question in a single word: ${question}`
                }]
            }]
        };

        const response = await axios.post(url, payload);

        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            return response.data.candidates[0].content.parts[0].text.trim().split(/\s+/)[0];
        }
        return "No response from AI";

    } catch (error) {
        console.error("Gemini Error:", error.response ? JSON.stringify(error.response.data) : error.message);
        return "AI Service Error";
    }
};

module.exports = {
    generateFibonacci,
    getPrimes,
    calculateLCM,
    calculateHCF,
    callGeminiAI
};
