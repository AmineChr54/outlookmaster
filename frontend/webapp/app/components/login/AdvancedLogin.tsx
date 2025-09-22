import React, { useState } from 'react';
import InputField from './InputField';
import PasswordField from './PasswordField';

interface IMAPConfig {
  server: string;
  port: string;
  username: string;
  password: string;
  useSSL: boolean;
}

interface POP3Config {
  server: string;
  port: string;
  username: string;
  password: string;
  useSSL: boolean;
}

interface AdvancedLoginProps {
  onIMAPLogin: (config: IMAPConfig) => void;
  onPOP3Login: (config: POP3Config) => void;
  isLoading?: boolean;
}

const AdvancedLogin: React.FC<AdvancedLoginProps> = ({
  onIMAPLogin,
  onPOP3Login,
  isLoading = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [protocol, setProtocol] = useState<'imap' | 'pop3'>('imap');
  
  const [imapConfig, setImapConfig] = useState<IMAPConfig>({
    server: '',
    port: '993',
    username: '',
    password: '',
    useSSL: true
  });

  const [pop3Config, setPop3Config] = useState<POP3Config>({
    server: '',
    port: '995',
    username: '',
    password: '',
    useSSL: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (protocol === 'imap') {
      onIMAPLogin(imapConfig);
    } else {
      onPOP3Login(pop3Config);
    }
  };

  const updateImapConfig = (field: keyof IMAPConfig, value: string | boolean) => {
    setImapConfig(prev => ({ ...prev, [field]: value }));
  };

  const updatePop3Config = (field: keyof POP3Config, value: string | boolean) => {
    setPop3Config(prev => ({ ...prev, [field]: value }));
  };

  const currentConfig = protocol === 'imap' ? imapConfig : pop3Config;
  const updateConfig = protocol === 'imap' ? updateImapConfig : updatePop3Config;

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-hover transition-all duration-200"
      >
        <span className="text-main font-medium">Advanced Email Configuration</span>
        <svg
          className={`w-5 h-5 text-muted transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-4 p-6 bg-card border border-border rounded-lg">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-title mb-4">Custom Email Server</h3>
            
            {/* Protocol Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-main mb-3">Protocol</label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="protocol"
                    value="imap"
                    checked={protocol === 'imap'}
                    onChange={(e) => setProtocol(e.target.value as 'imap' | 'pop3')}
                    className="w-4 h-4 text-primary bg-card border border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-main">IMAP</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="protocol"
                    value="pop3"
                    checked={protocol === 'pop3'}
                    onChange={(e) => setProtocol(e.target.value as 'imap' | 'pop3')}
                    className="w-4 h-4 text-primary bg-card border border-border focus:ring-primary focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-main">POP3</span>
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Server Address"
                value={currentConfig.server}
                onChange={(value) => updateConfig('server', value)}
                placeholder={`${protocol}.example.com`}
                required
              />

              <InputField
                label="Port"
                type="number"
                value={currentConfig.port}
                onChange={(value) => updateConfig('port', value)}
                placeholder={protocol === 'imap' ? '993' : '995'}
                required
              />

              <InputField
                label="Username"
                value={currentConfig.username}
                onChange={(value) => updateConfig('username', value)}
                placeholder="your-email@example.com"
                required
              />

              <PasswordField
                label="Password"
                value={currentConfig.password}
                onChange={(value) => updateConfig('password', value)}
                placeholder="Your email password"
                required
              />

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="useSSL"
                  checked={currentConfig.useSSL}
                  onChange={(e) => updateConfig('useSSL', e.target.checked)}
                  className="w-4 h-4 text-primary bg-card border border-border rounded focus:ring-primary focus:ring-2"
                />
                <label htmlFor="useSSL" className="ml-2 text-sm text-main">
                  Use SSL/TLS encryption (recommended)
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Connecting...
                  </div>
                ) : (
                  `Connect via ${protocol.toUpperCase()}`
                )}
              </button>
            </form>

            <div className="mt-4 p-4 bg-background/50 rounded-lg">
              <h4 className="text-sm font-medium text-main mb-2">Common Settings:</h4>
              <div className="text-xs text-muted space-y-1">
                <div><strong>Gmail IMAP:</strong> imap.gmail.com:993 (SSL)</div>
                <div><strong>Gmail POP3:</strong> pop.gmail.com:995 (SSL)</div>
                <div><strong>Outlook IMAP:</strong> outlook.office365.com:993 (SSL)</div>
                <div><strong>Outlook POP3:</strong> outlook.office365.com:995 (SSL)</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedLogin;