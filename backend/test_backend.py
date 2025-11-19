import requests
import json

def test_generate_formula():
    url = "http://localhost:5000/api/generate"
    payload = {"prompt": "Sum of column A"}
    headers = {"Content-Type": "application/json"}

    try:
        print(f"Sending request to {url}...")
        response = requests.post(url, json=payload, headers=headers)
        
        print(f"Status Code: {response.status_code}")
        print("Response Body:")
        print(json.dumps(response.json(), indent=2))

        if response.status_code == 200 and "formula" in response.json():
            print("\n✅ SUCCESS: Backend is working and returned a formula.")
        elif response.status_code == 500 and "API key missing" in response.text:
             print("\n⚠️  PARTIAL SUCCESS: Server is reachable, but API key is missing.")
             print("Please add your GEMINI_API_KEY to the backend/.env file.")
        else:
            print("\n❌ FAILURE: Unexpected response.")

    except requests.exceptions.ConnectionError:
        print("\n❌ FAILURE: Could not connect to the server.")
        print("Make sure the Flask backend is running (python app.py).")

if __name__ == "__main__":
    test_generate_formula()
