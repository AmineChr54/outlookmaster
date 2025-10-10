from flask import Blueprint, request, jsonify, current_app
from google_auth_oauthlib.flow import Flow

bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@bp.route('/google/auth-url', methods=['GET'])
def get_google_auth_url():
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": current_app.config['GOOGLE_CLIENT_ID'],
                "client_secret": current_app.config['GOOGLE_CLIENT_SECRET'],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [current_app.config['GOOGLE_REDIRECT_URI']]
            }
        },
        scopes=[
            "openid",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/gmail.readonly"
        ]
    )
    flow.redirect_uri = current_app.config['GOOGLE_REDIRECT_URI']
    auth_url, state = flow.authorization_url(access_type='offline', include_granted_scopes='true')
    return jsonify({"auth_url": auth_url, "state": state})

@bp.route('/google/token', methods=['POST'])
def exchange_token():
    data = request.json
    code = data.get('code')
    if not code:
        return jsonify({"error": "Code missing"}), 400

    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": current_app.config['GOOGLE_CLIENT_ID'],
                "client_secret": current_app.config['GOOGLE_CLIENT_SECRET'],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [current_app.config['GOOGLE_REDIRECT_URI']]
            }
        },
        scopes=[
            "openid",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/gmail.readonly"
        ]
    )
    flow.redirect_uri = current_app.config['GOOGLE_REDIRECT_URI']

    try:
        flow.fetch_token(code=code)
    except Exception as e:
        return jsonify({"error": "Token fetch failed", "details": str(e)}), 400

    creds = flow.credentials

    return jsonify({
        "access_token": creds.token,
        "refresh_token": creds.refresh_token
    })
