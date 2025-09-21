# outlookmaster
Automatically responds to emails and more.


## Step-by-Step Guide: Creating a Virtual Environment and Installing Python Dependencies

1. **Install Python**  
    Make sure Python (version 3.10 or later) is installed on your system.  
    [Download Python](https://www.python.org/downloads/)

2. **Create a virtual environment**  
    Open a terminal and navigate to the project directory:  
    ```bash
    python -m venv venv
    ```

3. **Activate the virtual environment**  
    - **Windows:**  
      ```bash
      venv\Scripts\activate
      ```
    - **macOS/Linux:**  
      ```bash
      source venv/bin/activate
      ```


4. **Upgrade pip (recommended)**  
    ```bash
    python -m pip install --upgrade pip
    ```

5. **Set up your secrets in a .env file**  
    In the project root, create a file named `.env` with the following content:
    ```env
    GOOGLE_CLIENT_ID=your-client-id-here
    GOOGLE_CLIENT_SECRET=your-client-secret-here
    ```
    This file will be loaded automatically by the backend. **Never commit your .env file to git.**

6. **Install all backend dependencies**  
    Make sure the `requirements.txt` file is in the project folder.  
    Install the packages with:  
    ```bash
    pip install -r requirements.txt
    ```

    This will install:
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
    - python-dotenv (for .env support)
    - Werkzeug

    If you encounter errors, ensure you have the latest version of pip and setuptools:
    ```bash
    pip install --upgrade pip setuptools
    ```

7. **Deactivate the environment**  
    When you're done, you can leave the environment with:  
    ```bash
    deactivate
    ```

**Note:**  
All installed packages are only available inside the virtual environment. If you add new dependencies, add them to `requirements.txt` and re-run the install command above. Your secrets should always be stored in `.env` and never committed to git.

## Step-by-Step Guide: Setting Up the Frontend (React & Next.js)

1. **Install Node.js**  
    Make sure Node.js (version 18.x or later) is installed.  
    [Download Node.js](https://nodejs.org/)

2. **Navigate to the frontend directory**  
    Change to your frontend project folder (e.g., `frontend`):  
    ```bash
    cd frontend\webapp
    ```

3. **Install dependencies**  
    Run the following command to install all required packages (including React and Next.js):  
    ```bash
    npm install
    ```

4. **Start the development server**  
    Launch the web application locally:  
    ```bash
    npm run dev
    ```

**Note:**  
The `node_modules`, `.next`, and `next-env.d.ts` files are ignored by git. Each collaborator must run `npm install` to set up their own local dependencies.

## Current Status (Option 1 - Login Only)
- Google OAuth login implemented
- Backend verifies Google ID token
- Frontend shows logged-in user’s email
- No Gmail inbox fetch yet (planned for Option 2)
