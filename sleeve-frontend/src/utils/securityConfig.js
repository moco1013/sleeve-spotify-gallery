// Security configuration utility for Sleeve
export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

// Disable console in production
export const setupProductionSecurity = () => {
  if (isProduction()) {
    // Disable console methods in production
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
    console.error = () => {};
    
    // Clear any existing console history
    if (typeof console.clear === 'function') {
      console.clear();
    }
    
    // Override console object
    Object.defineProperty(window, 'console', {
      value: {},
      writable: false,
      configurable: false
    });
    
    // Prevent access to global process object
    if (typeof window !== 'undefined') {
      Object.defineProperty(window, 'process', {
        value: undefined,
        writable: false,
        configurable: false
      });
    }
  }
};

// Environment variable whitelist - only these are safe to expose
const SAFE_ENV_VARS = [
  'REACT_APP_API_BASE_URL',
  'REACT_APP_API_URL'
];

// Get safe environment variable
export const getSafeEnvVar = (key) => {
  if (!SAFE_ENV_VARS.includes(key)) {
    console.warn(`Attempted to access unsafe environment variable: ${key}`);
    return undefined;
  }
  return process.env[key];
};