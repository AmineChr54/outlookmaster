import React, { useEffect } from 'react';

interface SocialLoginProps {
  onGoogleLogin: (userEmail: string) => void;
  onMicrosoftLogin: () => void;
  isLoading?: boolean;
}

const SocialLogin: React.FC<SocialLoginProps> = ({
  onGoogleLogin,
  onMicrosoftLogin,
  isLoading = false
}) => {
  const CLIENT_ID = "899610996955-sd4vlip7i677a3ert04k0rkh33g95bnm.apps.googleusercontent.com";

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
        const res = await fetch("http://localhost:5000/api/fetchEmails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: response.credential }),
        });

        const data = await res.json();
        if (data.status === "ok") {
          console.log("User logged in:", data.email);
          onGoogleLogin(data.email);
        } else {
          console.error("Error verifying login:", data.error);
        }
      } catch (err) {
        console.error("Failed to verify login:", err);
      }
    }

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onGoogleLogin]);

  const handleGoogleClick = () => {
    // @ts-ignore
    if (typeof google !== 'undefined' && google.accounts) {
      // @ts-ignore
      google.accounts.id.prompt();
    } else {
      console.error('Google Sign-In not loaded');
    }
  };
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Hidden Google Sign-In button for API */}
      <div id="googleSignInDiv" style={{ display: 'none' }}></div>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted">Or continue with</span>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleGoogleClick}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg bg-card hover:bg-hover text-main font-medium transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </button>

        <button
          onClick={onMicrosoftLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-lg bg-card hover:bg-hover text-main font-medium transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
            <path fill="#f25022" d="M0 0h11.3v11.3H0z"/>
            <path fill="#00a4ef" d="M12.7 0H24v11.3H12.7z"/>
            <path fill="#7fba00" d="M0 12.7h11.3V24H0z"/>
            <path fill="#ffb900" d="M12.7 12.7H24V24H12.7z"/>
          </svg>
          Continue with Microsoft
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;