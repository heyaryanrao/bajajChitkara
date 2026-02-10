const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// Helper to check if a number is prime
const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Helper to calculate GCD (needed for LCM)
const gcd = (a, b) => {
    if (b === 0) return a;
    return gcd(b, a % b);
};

// Helper to calculate LCM of an array
const calculateLCM = (arr) => {
    if (!arr || arr.length === 0) return null;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = (result * arr[i]) / gcd(result, arr[i]);
    }
    return result;
};

// Helper to calculate HCF (GCD) of an array
const calculateHCF = (arr) => {
    if (!arr || arr.length === 0) return null;
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = gcd(result, arr[i]);
    }
    return result;
};

// Generate Fibonacci sequence up to n terms
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

// Filter Primes from an array
const getPrimes = (arr) => {
    return arr.filter(num => isPrime(num));
};

// Call Google Gemini AI
const callGeminiAI = async (question) => {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY is not set.");
            return "Error: API Key missing";
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const payload = {
            contents: [{
                parts: [{
                    text: `Answer the following question in a single word: ${question}`
                }]
            }]
        };

        const response = await axios.post(url, payload);
        
        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            const text = response.data.candidates[0].content.parts[0].text;
            // Extract single word answer, remove formatting if any
            return text.trim().split(/\s+/)[0]; 
        }
        return "No response from AI";

    } catch (error) {
        console.error("Error calling Gemini AI:", error.response ? error.response.data : error.message);
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
