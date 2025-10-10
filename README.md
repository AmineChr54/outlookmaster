# HyperDraft
Automatically responds to emails and more.

## Overview
HyperDraft is a two-part application:
- Backend: Python (Flask) service that handles authentication and integrations.
- Frontend: React/Next.js web app for user interaction.

Current focus is on authentication and laying groundwork for inbox automations.

## Features
- Google OAuth login (backend verifies Google ID token)
- Frontend displays the authenticated user’s email
- CORS-enabled API surface for the web app
- Planned: Gmail inbox access and automated drafting/replies

## Tech Stack
- Backend: Python 3.10+, Flask, google-auth, google-api-python-client, python-dotenv
- Frontend: Node.js 18+, React, Next.js
- Tooling: npm

## Project Structure
- backend/ (Python/Flask service)
- frontend/webapp/ (Next.js application)

## Prerequisites
- Python 3.10 or later
- Node.js 18.x or later
- pip (bundled with Python)
- npm (bundled with Node.js)

## Backend Setup

1. Create a virtual environment
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

3. Upgrade pip (recommended)
   ```bash
   python -m pip install --upgrade pip
   ```

4. Install dependencies
   Ensure `requirements.txt` is present, then:
   ```bash
   pip install -r requirements.txt
   ```

   This installs (among others):
   - Flask
   - flask-cors
   - google-auth
   - google-auth-oauthlib
   - google-api-python-client
   - blinker
   - click
   - colorama
   - dotenv
   - itsdangerous
   - Jinja2
   - MarkupSafe
   - python-dotenv
   - Werkzeug

   If you encounter errors:
   ```bash
   pip install --upgrade pip setuptools
   ```

5. Configure environment variables
   - Create a `.env` file in the project root and add the required keys for local development.
   - These values are loaded automatically by the backend.
   - Never commit secrets. Ensure `.env` is ignored by git.

6. Deactivate the environment (when finished)
   ```bash
   deactivate
   ```

Notes:
- Packages are only available inside the virtual environment.
- If you add new dependencies, update `requirements.txt` and re-run the install command.

## Frontend Setup (React & Next.js)

1. Navigate to the frontend directory
   ```bash
   cd frontend/webapp
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

Notes:
- `node_modules`, `.next`, and `next-env.d.ts` are ignored by git.
- Each collaborator should run `npm install` locally.

## Running the App
- Start the backend server using your project’s entry point (e.g., `python app.py` or `flask run`), depending on how your app is structured.
- Start the frontend as shown above (`npm run dev`).
- Visit the frontend URL (commonly http://localhost:3000) to sign in and test flows.

## Contributing
- Open issues and pull requests are welcome.
- Please avoid committing any secrets or personal tokens.

## Security
- Do not commit `.env` or other secret files.
- Use a secrets manager in production deployments.

## License
TBD
