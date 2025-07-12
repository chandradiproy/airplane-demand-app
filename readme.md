# Airline Demand Analyzer

**A full-stack web application designed to fetch, analyze, and visualize airline market demand data, providing actionable insights for business strategy.**

This project was developed as a technical assessment to demonstrate proficiency in building data-driven applications with modern web technologies. It leverages real-time flight data and generative AI to deliver a sophisticated yet user-friendly dashboard for market analysis.

-----

## Features

  - **Real-Time Flight Data:** Integrates with the **Amadeus for Developers API** to fetch live flight offer data for specified routes and date ranges.
  - **AI-Powered Insights:** Uses the **Google Gemini Pro API** to analyze the fetched flight data and generate a concise, human-readable summary covering price analysis, demand insights, and actionable business advice.
  - **Interactive Data Visualization:**
      - Displays daily price trends (minimum, average, maximum) in a clear, interactive bar chart.
      - Presents detailed flight offers in a sortable and filterable data table.
      - Includes airline logos for quick visual identification.
  - **Responsive User Interface:** A clean, modern, and fully responsive UI built with **React** and styled with **Tailwind CSS**, ensuring a seamless experience on both desktop and mobile devices.
  - **Robust Backend:** A high-performance backend server built with **FastAPI (Python)**, featuring asynchronous request handling and clear API endpoints.

-----

## Tech Stack

  - **Backend:**
      - **Framework:** FastAPI
      - **Language:** Python 3.10+
      - **Key Libraries:** `requests`, `google-generativeai`, `uvicorn`, `python-dotenv`
  - **Frontend:**
      - **Framework:** React.js (with Vite)
      - **Language:** JavaScript (ES6+)
      - **Key Libraries:** `axios`, `recharts`, `react-markdown`, `lucide-react`
      - **Styling:** Tailwind CSS
  - **APIs:**
      - **Flight Data:** Amadeus for Developers
      - **AI Analysis:** Google Gemini Pro

-----

## Setup and Installation

To run this project locally, you will need to set up both the backend server and the frontend client.

### Prerequisites

  - Node.js (v16 or later)
  - Python (v3.10 or later)
  - A code editor like Visual Studio Code

### 1\. Obtain API Keys

You need to acquire three API keys from two services:

1.  **Amadeus API Key & Secret:**

      - Go to [Amadeus for Developers](https://developers.amadeus.com/) and create a free account.
      - In your Workspace, create a new app to get your **API Key** and **API Secret**.

2.  **Google Gemini API Key:**

      - Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
      - Click "**Create API key in new project**" and copy your key.

### 2\. Backend Setup

1.  **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2.  **Create and activate a Python virtual environment:**

    ```bash
    # For Windows
    python -m venv venv
    .\venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4.  **Create the environment file:**

      - In the `backend` directory, create a file named `.env`.
      - Copy the contents of `.env.example` (if provided) or add the following, replacing the placeholders with your actual keys:
        ```env
        AMADEUS_API_KEY="YOUR_AMADEUS_API_KEY"
        AMADEUS_API_SECRET="YOUR_AMADEUS_API_SECRET"
        GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
        ```

5.  **Run the backend server:**

    ```bash
    uvicorn app.main:app --reload
    ```

    The server will be running at `http://127.0.0.1:8000`.

### 3\. Frontend Setup

1.  **Open a new terminal** and navigate to the frontend directory:

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the frontend development server:**

    ```bash
    npm run dev
    ```

    The React application will be running at `http://localhost:5173` (or another port if 5173 is busy).

-----

## How to Use

1.  Open your web browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2.  You will be greeted by the welcome screen.
3.  Use the search form at the top to enter an **Origin** and **Destination** airport code (e.g., SYD, MEL).
4.  Select a **Departure** and **Return** date.
5.  Click the **Analyze** button.
6.  The application will display the results in three panels:
      - **Flight Offers:** A detailed, sortable list of available flights.
      - **Daily Price Analysis:** A chart showing the price range for each day.
      - **AI Market Summary:** A concise analysis with business recommendations.

-----

## Project Structure

The project is organized into two main parts: `backend` and `frontend`.

```
airline-demand-app/
├── backend/
│   ├── app/
│   │   └── main.py       # FastAPI application logic
│   ├── .env              # Environment variables (API keys)
│   ├── requirements.txt  # Python dependencies
│   └── venv/             # Python virtual environment
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── App.jsx       # Main application component
│   │   └── index.css     # Tailwind CSS configuration
│   ├── package.json      # Node.js dependencies
│   └── ...
│
└── README.md             # This file
```