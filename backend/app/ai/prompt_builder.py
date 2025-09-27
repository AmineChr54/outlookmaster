# This file is for the AI prompt building logic.
# For example:

def create_summary_prompt(email_text: str) -> str:
    """Creates a prompt to summarize an email."""
    prompt = f"""
    Please summarize the following email concisely, in 3 sentences or less.
    Focus on the main topic and any required actions.

    Email:
    ---
    {email_text}
    ---

    Summary:
    """
    return prompt.strip()
