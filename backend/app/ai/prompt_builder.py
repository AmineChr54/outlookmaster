def create_reply_prompt(email_text, prompt_text, tone, length, sender, date, subject) -> str:
    """
    Create a prompt for drafting a reply to an email with selectable tone and length.

    Args:
        email_text (str): The original email content to reply to.
        tone (str): Tone of the reply. Examples: 'formal', 'casual', 'professional'.
        length (str): Length of the reply. Examples: 'short', 'medium', 'detailed'.

    Returns:
        str: The prompt string for the AI model.
    """
    prompt = (
        f"Draft a {tone}, {length} reply to the following email. "
        f"Address the main points clearly and provide helpful responses.\n"
        f"Sender: {sender}\n"
        f"Date: {date}\n"
        f"Subject: {subject}\n"
        f"Prompt: {prompt_text}\n"
        f"Email ---\n{email_text}\n--- Reply:"
    )
    return prompt.strip()

def create_multi_tone_replies_prompt(email_text: str) -> str:
    """
    Create a prompt to generate multiple reply drafts in different tones.

    Args:
        email_text (str): The original email content.

    Returns:
        str: The prompt string requesting multiple replies.
    """
    prompt = (
        f"Generate multiple reply drafts to the following email with different tones "
        f"(formal, casual, concise, detailed). Please provide separate replies labeled by tone.\n"
        f"Email ---\n{email_text}\n--- Replies:"
    )
    return prompt.strip()

def create_autocomplete_suggestions_prompt(email_text: str, position_context: str) -> str:
    """
    Create a prompt to suggest autocomplete phrases based on email content and cursor position.

    Args:
        email_text (str): The email content.
        position_context (str): The text around the cursor position where suggestions are needed.

    Returns:
        str: The prompt string requesting autocomplete suggestions.
    """
    prompt = (
        f"Suggest appropriate autocomplete phrases or sentence completions for replying to the email "
        f"based on the email content and this context:\n{position_context}\n"
        f"Email ---\n{email_text}\n--- Suggestions:"
    )
    return prompt.strip()

def create_summary_prompt(email_text: str) -> str:
    """
    Create a prompt to summarize an email's content.
    Args:
        email_text (str): The original email content.
    Returns:
        str: The prompt string requesting a summary.
    """
    prompt = (
        f"Summarize the main points of the following email in a concise, clear paragraph.\n"
        f"Email ---\n{email_text}\n--- Summary:"
    )
    return prompt.strip()
