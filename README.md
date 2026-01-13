# Dine Deal

Dining offer aggregator app with Node.js backend, React Native frontend, and Python scraper.

## Prerequisites

- Node.js & npm
- Python 3.x & pip
- MongoDB (local or Atlas)

## Setup & Run

### 1. Database Setup
Ensure you have a MongoDB instance running.
Create a file `backend/.env` with your connection string:
```
MONGO_URI=mongodb://localhost:27017/dinedeal
PORT=5000
```

### 2. Backend
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```
Start the server:
```bash
npm start
```
The server will run on `http://localhost:5000`.

### 3. Scraper
The backend triggers the scraper, but you need to install dependencies first.
Navigate to the scraper folder:
```bash
cd scraper
pip install -r requirements.txt
playwright install
```

### 4. Frontend
Navigate to the frontend folder and install dependencies:
```bash
cd frontend
npm install
```
Start the Expo development server:
```bash
npx expo start
```
- Press `a` for Android Emulator.
- Press `i` for iOS Simulator (macOS only).
- Scan QR code with Expo Go app on physical device.

**Note:** If running on Android Emulator, the backend URL in `frontend/HomeScreen.tsx` is set to `http://10.0.2.2:5000`. If running on a physical device, update `API_URL` to your machine's local IP address (e.g., `http://192.168.1.5:5000`).
