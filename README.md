# outlookmaster
Automatically responds to emails and more.

## Step-by-Step Guide: Creating a Virtual Environment and Installing Dependencies

1. **Install Python**  
    Make sure Python (version 3.13.3 or later) is installed on your system.  
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

4. **Install dependencies**  
    Make sure the `requirements.txt` file is in the project folder.  
    Install the packages with:  
    ```bash
    pip install -r requirements.txt
    ```

5. **Deactivate the environment**  
    When you're done, you can leave the environment with:  
    ```bash
    deactivate
    ```

**Note:**  
All installed packages are only available inside the virtual environment.

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
