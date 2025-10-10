import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';
import AdvancedLogin from './AdvancedLogin';

interface LoginPageProps {
  onLogin?: (credentials: any) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStandardLogin = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to authenticate
      console.log('Standard Login:', { email, password, rememberMe });
      
      if (onLogin) {
        onLogin({ type: 'standard', email, password, rememberMe });
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (userEmail: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Google Login successful for:', userEmail);
      
      if (onLogin) {
        onLogin({ type: 'google', email: userEmail });
      }
    } catch (err) {
      setError('Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicrosoftLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate OAuth process
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Microsoft Login initiated');
      
      if (onLogin) {
        onLogin({ type: 'microsoft' });
      }
    } catch (err) {
      setError('Microsoft login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleIMAPLogin = async (config: any) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate IMAP connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('IMAP Login:', config);
      
      if (onLogin) {
        onLogin({ type: 'imap', config });
      }
    } catch (err) {
      setError('Failed to connect to IMAP server. Please check your settings.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePOP3Login = async (config: any) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate POP3 connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('POP3 Login:', config);
      
      if (onLogin) {
        onLogin({ type: 'pop3', config });
      }
    } catch (err) {
      setError('Failed to connect to POP3 server. Please check your settings.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Login Form */}
        <LoginForm
          onSubmit={handleStandardLogin}
          isLoading={isLoading}
          error={error}
        />

        {/* Social Login Options */}
        <SocialLogin
          onGoogleLogin={handleGoogleLogin}
          onMicrosoftLogin={handleMicrosoftLogin}
          isLoading={isLoading}
        />

        {/* Advanced Login Configuration */}
        <AdvancedLogin
          onIMAPLogin={handleIMAPLogin}
          onPOP3Login={handlePOP3Login}
          isLoading={isLoading}
        />

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted">
            By signing in, you agree to our{' '}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;