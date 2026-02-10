# BFHL Backend API

This is a Node.js Express backend API implemented for a specific assignment. It provides endpoints for various calculations and AI interaction.

## Endpoints

### POST /bfhl
Input (JSON Body):
- `fibonacci`: Integer (Returns Fibonacci series)
- `prime`: Integer Array (Returns Prime numbers)
- `lcm`: Integer Array (Returns LCM)
- `hcf`: Integer Array (Returns HCF)
- `AI`: String (Returns answer to question)

**Note:** Only one key should be sent per request.

Response Structure:
```json
{
"is_success": true,
"official_email": "YOUR EMAIL",
"data": ...
}
```

### GET /health
Returns operational status.

## Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables:
    - Create a `.env` file in the root.
    - Add `GEMINI_API_KEY` with your Google Gemini API key.
    - Add `PORT` (optional, default 3000).
4.  Run the server:
    ```bash
    npm start
    ```

## Deployment

Deployable to Vercel, Railway, or Render. `vercel.json` is included for Vercel deployment.
