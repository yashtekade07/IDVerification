import React, { useState } from 'react';

const JsonViewer = ({ jsonData }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(JSON.stringify(jsonData, null, 2))
      .then(() => setCopied(true))
      .catch((err) => console.error('Failed to copy:', err));

    setTimeout(() => setCopied(false), 1500); // Reset copy state after 1.5 seconds
  };

  return (
    <div>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
      <button onClick={copyToClipboard}>
        {copied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
    </div>
  );
};

export default JsonViewer;
