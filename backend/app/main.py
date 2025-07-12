# backend/app/main.py
import os
import requests
import google.generativeai as genai
from fastapi import FastAPI, HTTPException, Depends
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from datetime import datetime, timedelta
from typing import List, Dict, Any

# --- Load Environment Variables ---
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path=dotenv_path)

# --- API Configuration ---
AMADEUS_API_KEY = os.getenv("AMADEUS_API_KEY")
AMADEUS_API_SECRET = os.getenv("AMADEUS_API_SECRET")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(api_key=GEMINI_API_KEY)

AMADEUS_TOKEN_URL = "https://test.api.amadeus.com/v1/security/oauth2/token"
AMADEUS_SEARCH_URL = "https://test.api.amadeus.com/v2/shopping/flight-offers"

# --- FastAPI App Initialization ---
app = FastAPI()

# --- Pydantic Models ---
class FlightSearchRequest(BaseModel):
    origin: str
    destination: str
    dateFrom: str
    dateTo: str

class InsightRequest(BaseModel):
    flightData: List[Dict[str, Any]]

# --- Amadeus Authentication ---
amadeus_token = None
token_expiry_time = None

def get_amadeus_token():
    global amadeus_token, token_expiry_time
    if amadeus_token and datetime.now() < token_expiry_time:
        return amadeus_token
    
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    body = {
        "grant_type": "client_credentials",
        "client_id": AMADEUS_API_KEY,
        "client_secret": AMADEUS_API_SECRET,
    }
    try:
        response = requests.post(AMADEUS_TOKEN_URL, headers=headers, data=body)
        response.raise_for_status()
        token_data = response.json()
        amadeus_token = token_data["access_token"]
        expires_in = token_data["expires_in"]
        token_expiry_time = datetime.now() + timedelta(seconds=expires_in - 300)
        return amadeus_token
    except requests.exceptions.HTTPError as err:
        raise HTTPException(status_code=500, detail="Could not authenticate with flight data provider.")

# --- API Endpoints ---
@app.post("/api/search-flights")
def search_flights(request: FlightSearchRequest, token: str = Depends(get_amadeus_token)):
    headers = {"Authorization": f"Bearer {token}"}
    params = {
        "originLocationCode": request.origin,
        "destinationLocationCode": request.destination,
        "departureDate": request.dateFrom,
        "returnDate": request.dateTo,
        "adults": "1",
        "nonStop": "false",
        "currencyCode": "AUD",
        "max": "100",
    }
    
    try:
        response = requests.get(AMADEUS_SEARCH_URL, headers=headers, params=params)
        response.raise_for_status()
        data = response.json()
        carrier_codes = data.get("dictionaries", {}).get("carriers", {})
        cleaned_flights = []
        if "data" in data and data["data"]:
            for flight_offer in data["data"]:
                itinerary = flight_offer["itineraries"][0]
                segment = itinerary["segments"][0]
                carrier_code = segment.get("carrierCode")
                cleaned_flights.append({
                    "id": flight_offer.get("id"),
                    "price": flight_offer["price"].get("total"),
                    "departureAirport": segment["departure"].get("iataCode"),
                    "departureTime": segment["departure"].get("at"),
                    "arrivalAirport": segment["arrival"].get("iataCode"),
                    "arrivalTime": segment["arrival"].get("at"),
                    "carrierCode": carrier_code,
                    "airlineName": carrier_codes.get(carrier_code, "Unknown Airline"),
                    "duration": itinerary.get("duration"),
                })
        return cleaned_flights
    except requests.exceptions.HTTPError as http_err:
        raise HTTPException(status_code=http_err.response.status_code, detail=http_err.response.json())
    except Exception as e:
        raise HTTPException(status_code=500, detail="An internal server error occurred.")

@app.post("/api/generate-insights")
def generate_insights(request: InsightRequest):
    if not request.flightData:
        return {"insights": "No flight data was provided."}

    prompt = f"""
    Analyze the following flight data. Provide a market analysis for a hostel chain.
    Your response MUST be formatted in simple markdown and contain ONLY the analysis.
    DO NOT include any headers, titles, 'To/From/Subject' lines, or separators like '---'.
    Start DIRECTLY with the 'Price Analysis' heading. Use markdown bold for headings (e.g., **Price Analysis**).

    **Price Analysis**
    Analyze the price range (lowest, highest, average).

    **Demand Insights**
    Based on pricing and flight times, what is the demand like for this route?

    **Actionable Advice**
    Give one or two clear recommendations for hostel management.

    Flight Data:
    {request.flightData}
    """
    try:
        model = genai.GenerativeModel('gemini-2.5-pro')
        response = model.generate_content(prompt)
        insights = response.text.strip()
        return {"insights": insights}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to generate insights from AI model.")

# --- Serve Static Frontend Files ---
STATIC_DIR = os.path.join(os.path.dirname(__file__), "..", "static")

app.mount("/assets", StaticFiles(directory=os.path.join(STATIC_DIR, "assets")), name="assets")

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    return FileResponse(os.path.join(STATIC_DIR, "index.html"))
