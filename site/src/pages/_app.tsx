
import type { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: #0a0b0d;
    color: #ffffff;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    min-height: 100vh;
  }

  a {
    color: #00ff88;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  a:hover {
    color: #00e67a;
    text-decoration: underline;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: all 0.3s ease;
  }

  input, textarea, select {
    font-family: inherit;
    outline: none;
  }

  /* Scrollbar personalizada */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #00ff88, #00e67a);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #00e67a, #00cc6a);
  }

  /* Animações globais */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.7);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(0, 255, 136, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(0, 255, 136, 0);
    }
  }

  /* Classes utilitárias */
  .animate-fade-in {
    animation: fadeInUp 0.6s ease-out;
  }

  .pulse-animation {
    animation: pulse 2s infinite;
  }

  /* Responsive */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }
`;

const theme = {
  colors: {
    primary: '#00ff88',
    primaryDark: '#00e67a',
    secondary: '#00cc6a',
    background: '#0a0b0d',
    backgroundLight: '#1a1d21',
    backgroundCard: 'rgba(26, 29, 33, 0.9)',
    text: '#ffffff',
    textSecondary: '#b8b8b8',
    textMuted: '#888888',
    border: 'rgba(0, 255, 136, 0.2)',
    borderLight: 'rgba(255, 255, 255, 0.1)',
    success: '#00ff88',
    error: '#ff4757',
    warning: '#ffa726',
    info: '#26c6da',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #00ff88, #00e67a)',
    background: '#0a0b0d',
    card: 'rgba(26, 29, 33, 0.9)',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.15)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.2)',
    large: '0 8px 32px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(0, 255, 136, 0.3)',
  },
  borderRadius: {
    small: '6px',
    medium: '12px',
    large: '16px',
    round: '50%',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
