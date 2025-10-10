import os
from huggingface_hub import InferenceClient

# Initialize client using HuggingFace token from environment variable
client = InferenceClient(token=os.getenv("HUGGING_FACE_TOKEN"))

def get_completion(prompt: str) -> str:
    completion = client.chat.completions.create(
        model="deepseek-ai/DeepSeek-V3-0324",
        messages=[{"role": "user", "content": prompt}]
    )
    return completion.choices[0].message["content"]
