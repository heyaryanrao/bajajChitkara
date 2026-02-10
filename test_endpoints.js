const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

const testEndpoints = async () => {
    try {
        console.log("Starting API Verification...\n");

        // 1. Test GET /health
        try {
            const healthRes = await axios.get(`${BASE_URL}/health`);
            console.log("✅ GET /health:", healthRes.data);
        } catch (e) {
            console.error("❌ GET /health Failed:", e.message);
        }

        // 2. Test POST /bfhl - Fibonacci
        try {
            const fibRes = await axios.post(`${BASE_URL}/bfhl`, { fibonacci: 7 });
            console.log("✅ POST /bfhl (Fibonacci):", fibRes.data);
        } catch (e) {
            console.error("❌ POST /bfhl (Fibonacci) Failed:", e.response ? e.response.data : e.message);
        }

        // 3. Test POST /bfhl - Prime
        try {
            const primeRes = await axios.post(`${BASE_URL}/bfhl`, { prime: [2, 4, 7, 9, 11] });
            console.log("✅ POST /bfhl (Prime):", primeRes.data);
        } catch (e) {
            console.error("❌ POST /bfhl (Prime) Failed:", e.response ? e.response.data : e.message);
        }

        // 4. Test POST /bfhl - LCM
        try {
            const lcmRes = await axios.post(`${BASE_URL}/bfhl`, { lcm: [12, 18, 24] });
            console.log("✅ POST /bfhl (LCM):", lcmRes.data);
        } catch (e) {
            console.error("❌ POST /bfhl (LCM) Failed:", e.response ? e.response.data : e.message);
        }

        // 5. Test POST /bfhl - HCF
        try {
            const hcfRes = await axios.post(`${BASE_URL}/bfhl`, { hcf: [24, 36, 60] });
            console.log("✅ POST /bfhl (HCF):", hcfRes.data);
        } catch (e) {
            console.error("❌ POST /bfhl (HCF) Failed:", e.response ? e.response.data : e.message);
        }

        // 6. Test POST /bfhl - AI (Mocked if key invalid)
        try {
            // Note: This might fail if API key is not valid, which is expected during initial setup
            const aiRes = await axios.post(`${BASE_URL}/bfhl`, { AI: "What is the capital of India?" });
            console.log("✅ POST /bfhl (AI):", aiRes.data);
        } catch (e) {
            console.log("⚠️ POST /bfhl (AI) returned error (likely due to missing API key, which is expected):", e.response ? e.response.data : e.message);
        }

        // 7. Test Invalid Input - Multiple Keys
        try {
            await axios.post(`${BASE_URL}/bfhl`, { fibonacci: 5, prime: [2, 3] });
            console.error("❌ POST /bfhl (Multiple Keys) Failed: Should have returned error but got success.");
        } catch (e) {
            if (e.response && e.response.status === 400) {
                console.log("✅ POST /bfhl (Multiple Keys) Correctly handled error:", e.response.data.message);
            } else {
                console.error("❌ POST /bfhl (Multiple Keys) Unexpected Error:", e.message);
            }
        }

    } catch (error) {
        console.error("Test Script Error:", error);
    }
};

testEndpoints();
