# Intelli Excel 🚀

**Intelli Excel** is an AI-powered tool that generates complex Excel formulas from simple natural language descriptions. Just describe what you want to calculate, and let the AI do the heavy lifting!

![Intelli Excel Demo](public/placeholder.svg)

## ✨ Features

*   **Natural Language to Formula**: Convert plain English into valid Excel formulas.
*   **AI-Powered**: Built with Google's Gemini 1.5 Flash model for high accuracy.
*   **Instant Copy**: One-click button to copy the generated formula to your clipboard.
*   **Smart Validation**: Rejects non-Excel related queries with a friendly notice.
*   **Modern UI**: Clean, responsive interface built with React and Tailwind CSS.

## 🛠️ Tech Stack

*   **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui
*   **Backend**: Python, Flask
*   **AI Model**: Google Gemini API (gemini-pro-latest)

## 🚀 Getting Started

Follow these instructions to get the project running on your local machine.

### Prerequisites

*   Node.js & npm installed
*   Python 3.8+ installed
*   A Google Cloud Project with Gemini API access (API Key)

### 1. Clone the Repository

```bash
git clone https://github.com/arpi081/intelliexcel-.git
cd intelliexcel-
```

### 2. Backend Setup

Navigate to the backend directory and set up the Python environment.

```bash
cd backend
```

**Install Dependencies:**

```bash
pip install -r requirements.txt
```

**Configure API Key:**

1.  Create a `.env` file in the `backend` folder.
2.  Add your Gemini API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

**Start the Server:**

```bash
python app.py
```
The backend will run on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal window and navigate to the project root (if you are in backend, go back one level).

```bash
cd ..
```

**Install Dependencies:**

```bash
npm install
```

**Start the Development Server:**

```bash
npm run dev
```
The frontend will run on `http://localhost:8080` (or similar).

## 📝 Usage

1.  Open the frontend URL in your browser.
2.  In the text box, describe your Excel problem (e.g., *"Calculate the average of column B if column A is 'Sales'"*).
3.  Click **Generate Formula**.
4.  Copy the result and paste it into Excel!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
