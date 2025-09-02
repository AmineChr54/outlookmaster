
# Use a pipeline as a high-level helper
from transformers import pipeline

pipe = pipeline("text-generation", model="openai-community/gpt2")
prompt = "Hello"

output = pipe(prompt, max_length=200, do_sample=True, temperature=0.7)
print(output[0]['generated_text'])

