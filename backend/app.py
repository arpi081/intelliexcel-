import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Gemini API
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    print("Warning: GEMINI_API_KEY not found in environment variables.")

genai.configure(api_key=api_key)

# Set up the model
generation_config = {
    "temperature": 0.4,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 1024,
}

model = genai.GenerativeModel(
    model_name="gemini-pro-latest",
    generation_config=generation_config,
)

@app.route('/api/generate', methods=['POST'])
def generate_formula():
    try:
        data = request.json
        prompt = data.get('prompt')

        if not prompt:
            return jsonify({"error": "No prompt provided"}), 400

        if not api_key:
             return jsonify({"error": "Server configuration error: API key missing"}), 500

        # Construct the prompt for Gemini
        full_prompt = f"""
        You are an expert Excel formula generator. 
        User request: "{prompt}"
        
        Your task is to generate ONLY the Excel formula that accomplishes this task.
        
        RULES:
        1. If the user asks for an Excel formula, return ONLY the formula starting with =. Do not add any markdown or explanations.
        2. If the user asks anything else (e.g., "who are you", "write a poem", "what is the capital of France"), you MUST return exactly this string: "I'm not Chatgpt ma!!!".
        3. Do not answer any general knowledge questions.
        """

        response = model.generate_content(full_prompt)
        formula = response.text.strip()

        # Basic cleanup to ensure it looks like a formula
        if not formula.startswith("=") and not formula.startswith("Error"):
             formula = "=" + formula

        return jsonify({"formula": formula})

    except Exception as e:
        print(f"Error generating formula: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
