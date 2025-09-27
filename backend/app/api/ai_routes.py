from flask import Blueprint, jsonify, request

bp = Blueprint('ai', __name__, url_prefix='/api/ai')

@bp.route('/summarize', methods=['POST'])
def summarize_email():
    email_text = request.json.get('text')
    if not email_text:
        return jsonify({"error": "Text to summarize is required"}), 400
        
    # Placeholder for AI logic
    # from ..ai import prompt_builder, ai_client
    # prompt = prompt_builder.create_summary_prompt(email_text)
    # summary = ai_client.get_completion(prompt)
    
    summary = f"This is a summary of: '{email_text[:30]}...'"
    
    return jsonify({"summary": summary})
