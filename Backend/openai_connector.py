import requests

OPENAI_API_KEY = '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'

# Endpoint for chat completions
API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'

def send_openAI(prompt):
    # JSON payload for the request
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    # Headers for the request
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {OPENAI_API_KEY}"
    }

    # Send POST request to the OpenAI API
    response = requests.post(API_ENDPOINT, json=payload, headers=headers)

    # Check if the request was successful
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None
