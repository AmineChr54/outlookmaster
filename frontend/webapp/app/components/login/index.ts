// Login Components
export { default as LoginPage } from './LoginPage';
export { default as LoginForm } from './LoginForm';
export { default as SocialLogin } from './SocialLogin';
export { default as AdvancedLogin } from './AdvancedLogin';

// Form Components
export { default as InputField } from './InputField';
export { default as PasswordField } from './PasswordField';

// Types
export interface LoginCredentials {
  type: 'standard' | 'google' | 'microsoft' | 'imap' | 'pop3';
  email?: string;
  password?: string;
  rememberMe?: boolean;
  config?: IMAPConfig | POP3Config;
}

export interface IMAPConfig {
  server: string;
  port: string;
  username: string;
  password: string;
  useSSL: boolean;
}

export interface POP3Config {
  server: string;
  port: string;
  username: string;
  password: string;
  useSSL: boolean;
}