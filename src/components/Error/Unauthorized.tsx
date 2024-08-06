// Unauthorized.tsx
import React from 'react';
import Link from 'next/link';
import { CSSProperties } from 'react';

const Unauthorized: React.FC = () => {
  return (
    <div style={containerStyle}>
      <style jsx global>{`
        body {
          color: #000;
          background: #fff;
          margin: 0;
        }
        .next-error-h1 {
          border-right: 1px solid rgba(0, 0, 0, 0.3);
        }
        @media (prefers-color-scheme: dark) {
          body {
            color: #fff;
            background: #000;
          }
          .next-error-h1 {
            border-right: 1px solid rgba(255, 255, 255, 0.3);
          }
        }
      `}</style>
      <div style={innerContainerStyle}>
        <h1 className="next-error-h1" style={errorCodeStyle}>401</h1>
        <div style={descriptionContainerStyle}>
          <h2 style={messageStyle}>Unauthorized</h2>
          <p style={descriptionStyle}>
            The page you are trying to access is unauthorized. Please contact your administrator or{' '}
            <Link href="/" style={linkStyle}>
              go back to the homepage
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

const containerStyle: CSSProperties = {
  fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  height: '50vh',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const innerContainerStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const errorCodeStyle: CSSProperties = {
  marginRight: '20px',
  paddingRight: '23px',
  fontSize: '24px',
  fontWeight: 500,
  verticalAlign: 'top',
  lineHeight: '49px',
};

const descriptionContainerStyle: CSSProperties = {
  textAlign: 'left',
};

const messageStyle: CSSProperties = {
  fontSize: '14px',
  fontWeight: 600,
  lineHeight: '49px',
  margin: 0,
};

const descriptionStyle: CSSProperties = {
  fontSize: '14px',
  lineHeight: '1.5',
  maxWidth: '560px',
};

const linkStyle: CSSProperties = {
  color: '#0070f3',
  textDecoration: 'none',
};

export default Unauthorized;
