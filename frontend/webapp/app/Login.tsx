"use client";

import { useEffect } from "react";

interface LoginProps {
  onLogin: (userEmail: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const CLIENT_ID = "YOUR_WEB_OAUTH_CLIENT_ID";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse,
      });

      // @ts-ignore
      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    };

    async function handleCredentialResponse(response: any) {
      console.log("JWT token:", response.credential);

      try {
        const res = await fetch("http://127.0.0.1:5000/api/fetchEmails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential }),
        });

        const data = await res.json();
        if (data.status === "ok") {
          console.log("User logged in:", data.email);
          onLogin(data.email); // only pass email for now
        } else {
          console.error("Error verifying login:", data.error);
        }
      } catch (err) {
        console.error("Failed to verify login:", err);
      }
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="googleSignInDiv"></div>;
}
