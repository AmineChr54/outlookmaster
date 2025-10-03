# This file is for the AI prompt building logic.
# For example:

def create_summary_prompt(email_text: str) -> str:
    """Creates a prompt to summarize an email."""
    prompt = f"""
    Please summarize the following email concisely, in points if possible.
    Focus on the main topic and any required actions.

    Email:
    ---
    {email_text}
    ---

    Summary:
    """
    return prompt.strip()

def create_reply_prompt(email_text: str, tone: str = "professional") -> str:
    """Creates a prompt to draft a reply to an email."""
    prompt = f"""
    Draft a {tone} reply to the following email. Address the main points and provide clear responses.

    Email:
    ---
    {email_text}
    ---

    Reply:
    """
    return prompt.strip()

def create_action_items_prompt(email_text: str) -> str:
    """Creates a prompt to extract action items from an email."""
    prompt = f"""
    Extract and list the action items from the following email. Be specific about what needs to be done.

    Email:
    ---
    {email_text}
    ---

    Action Items:
    """
    return prompt.strip()
