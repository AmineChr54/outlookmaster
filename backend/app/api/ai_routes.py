from flask import Blueprint, jsonify, request
from ..ai.ai_client import get_completion
from ..ai.prompt_builder import (
    create_reply_prompt,
    create_multi_tone_replies_prompt,
    create_autocomplete_suggestions_prompt,
    create_summary_prompt
)

bp = Blueprint("ai", __name__, url_prefix="/api/ai")

@bp.route("/generate_reply", methods=["POST"])
def generate_reply():
    data = request.json
    email_text = data.get("text")
    prompt_text = data.get("prompt", "")
    tone = data.get("tone", "professional")
    length = data.get("length", "medium")
    sender = data.get("from")
    date = data.get("date")
    subject = data.get("subject")
    if not email_text:
        return jsonify({"error": "Email text for reply is required"}), 400
    prompt = create_reply_prompt(email_text, prompt_text, tone, length, sender, date, subject)
    reply_text = get_completion(prompt)
    return jsonify({"reply": reply_text})

@bp.route("/generate_multi_tone_replies", methods=["POST"])
def generate_multi_tone_replies():
    data = request.json
    email_text = data.get("text")
    if not email_text:
        return jsonify({"error": "Email text is required"}), 400
    prompt = create_multi_tone_replies_prompt(email_text)
    replies = get_completion(prompt)
    return jsonify({"replies": replies})

@bp.route("/generate_autocomplete_suggestions", methods=["POST"])
def generate_autocomplete_suggestions():
    data = request.json
    email_text = data.get("text")
    position_context = data.get("context", "")
    if not email_text or not position_context:
        return jsonify({"error": "Email text and context are required"}), 400
    prompt = create_autocomplete_suggestions_prompt(email_text, position_context)
    suggestions = get_completion(prompt)
    return jsonify({"suggestions": suggestions})

@bp.route("/summary", methods=["POST"])
def summarize():
    data = request.json
    email_text = data.get("text", "")
    if not email_text:
        return jsonify({"error": "Email text for summary is required."}), 400
    prompt = create_summary_prompt(email_text)
    summary = get_completion(prompt)
    return jsonify({"summary": summary})
