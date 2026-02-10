const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { generateFibonacci, getPrimes, calculateLCM, calculateHCF, callGeminiAI } = require('./utils');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const EMAIL = "jaspreet.kaur@chitkara.edu.in"; // Replace with actual email if different

// Function to validate integer arrays
const isValidIntArray = (arr) => {
    return Array.isArray(arr) && arr.every(item => Number.isInteger(item));
};

// POST /bfhl Endpoint
app.post('/bfhl', async (req, res) => {
    try {
        const { fibonacci, prime, lcm, hcf, AI } = req.body;

        // Count how many valid keys are present
        const keysPresent = [fibonacci, prime, lcm, hcf, AI].filter(val => val !== undefined).length;

        if (keysPresent !== 1) {
            return res.status(400).json({
                is_success: false,
                official_email: EMAIL,
                message: "Request must contain exactly one valid key: fibonacci, prime, lcm, hcf, or AI."
            });
        }

        let responseData;

        if (fibonacci !== undefined) {
            if (!Number.isInteger(fibonacci)) {
                return res.status(400).json({ is_success: false, official_email: EMAIL, message: "Input for fibonacci must be an integer." });
            }
            responseData = generateFibonacci(fibonacci);
        }
        else if (prime !== undefined) {
            if (!isValidIntArray(prime)) {
                return res.status(400).json({ is_success: false, official_email: EMAIL, message: "Input for prime must be an array of integers." });
            }
            responseData = getPrimes(prime);
        }
        else if (lcm !== undefined) {
            if (!isValidIntArray(lcm)) {
                return res.status(400).json({ is_success: false, official_email: EMAIL, message: "Input for lcm must be an array of integers." });
            }
            responseData = calculateLCM(lcm);
        }
        else if (hcf !== undefined) {
            if (!isValidIntArray(hcf)) {
                return res.status(400).json({ is_success: false, official_email: EMAIL, message: "Input for hcf must be an array of integers." });
            }
            responseData = calculateHCF(hcf);
        }
        else if (AI !== undefined) {
            if (typeof AI !== 'string') {
                return res.status(400).json({ is_success: false, official_email: EMAIL, message: "Input for AI must be a string." });
            }
            responseData = await callGeminiAI(AI);
        }

        res.json({
            is_success: true,
            official_email: EMAIL,
            data: responseData
        });

    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({
            is_success: false,
            official_email: EMAIL,
            message: "Internal Server Error"
        });
    }
});

// GET /health Endpoint
app.get('/health', (req, res) => {
    res.json({
        is_success: true,
        official_email: EMAIL
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
