"use client";

import React from 'react';
import { LoginPage } from './components/login';

interface LoginProps {
  onLogin: (userEmail: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const handleLoginSuccess = (credentials: any) => {
    console.log('Login credentials:', credentials);
    
    // Handle different login types and extract the email/user info
    switch (credentials.type) {
      case 'standard':
        // For standard email/password login
        onLogin(credentials.email);
        break;
      case 'google':
        // For Google OAuth login
        onLogin(credentials.email);
        break;
      case 'microsoft':
        // For Microsoft OAuth login (placeholder)
        console.log('Microsoft login not yet implemented');
        break;
      case 'imap':
        // For IMAP login, use the username as email
        onLogin(credentials.config.username);
        break;
      case 'pop3':
        // For POP3 login, use the username as email
        onLogin(credentials.config.username);
        break;
      default:
        console.warn('Unknown login type:', credentials.type);
    }
  };

  return <LoginPage onLogin={handleLoginSuccess} />;
}
