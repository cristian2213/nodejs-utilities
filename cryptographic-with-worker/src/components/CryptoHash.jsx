import  { useState } from 'react';

function CryptoHash() {
  const [input, setInput] = useState('');
  const [hashResult, setHashResult] = useState('');

  const hashData = () => {
    // Create the worker with a reference to the file.
    const worker = new Worker('crypto-worker.js');
    
    // This listens for a response sent from crypto-worker.js file
    worker.addEventListener('message', (e) => {
      const { data } = e;
      if (data.type === 'hashResult') {
        setHashResult(data.result);
        worker.terminate();
      }
    });

    // This sends a message to the worker (crypto-worker.js)
    worker.postMessage({ type: 'hash', message: input });
  };

  return (
    <div>
      <h2>Web Worker Cryptographic Hashing</h2>

      <input
        type="text"
        placeholder="Enter text to hash"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={hashData}>Hash</button>

      <p>Hash Result: {hashResult}</p>
    </div>
  );
}

export default CryptoHash;
