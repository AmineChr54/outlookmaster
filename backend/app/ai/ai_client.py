# This file would contain the logic to interact with an external AI API
# like OpenAI, Gemini, or a local model.

# Example for OpenAI:
# from openai import OpenAI
# client = OpenAI(api_key="YOUR_API_KEY")

# def get_completion(prompt: str) -> str:
    # """Sends a prompt to the AI model and returns the completion."""
    
    # This is a mock response.
    # In a real implementation, you would make an API call here.
    # print(f"--- Sending prompt to AI ---\n{prompt}\n---------------------------")
    
    # response = client.chat.completions.create(
    #     model="gpt-3.5-turbo",
    #     messages=[
    # -        {"role": "system", "content": "You are a helpful assistant."},
    #         {"role": "user", "content": prompt},
    #     ]
    # )
    # return response.choices[0].message.content
    
    # return "This is a mock AI response."

import os
from huggingface_hub import InferenceClient

client = InferenceClient(token=os.getenv("HUGGING_FACE_TOKEN"))

def get_completion(prompt: str) -> str:
    completion = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V3-0324",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
    )

    return completion.choices[0].message


print(get_completion("explain quantum computing in simple terms"))