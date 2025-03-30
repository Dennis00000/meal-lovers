import React, { useState } from 'react';
import { checkApiConnection as checkApiStatus } from '../services/authService';
import { API_URL } from '../config';

const DebugPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  const [tokenInfo, setTokenInfo] = useState(null);

  const checkApi = async () => {
    try {
      const result = await checkApiStatus();
      setApiStatus(result);
    } catch (error) {
      setApiStatus({ success: false, error: error.message });
    }
  };

  const checkToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setTokenInfo({
        exists: true,
        preview: `${token.substring(0, 15)}...${token.substring(token.length - 10)}`
      });
    } else {
      setTokenInfo({ exists: false });
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg z-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50 w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Debug Panel</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <p className="font-medium">API URL:</p>
          <p className="text-sm text-gray-600 break-all">{API_URL}</p>
        </div>
        
        <div>
          <button 
            onClick={checkApi}
            className="bg-blue-600 text-white py-1 px-3 rounded text-sm"
          >
            Check API Connection
          </button>
          
          {apiStatus && (
            <div className="mt-2 text-sm">
              <p>Status: {apiStatus.success ? 'Connected' : 'Failed'}</p>
              {apiStatus.error && <p className="text-red-500">{apiStatus.error}</p>}
              {apiStatus.data && <p className="text-green-500">{apiStatus.data.message}</p>}
            </div>
          )}
        </div>
        
        <div>
          <button 
            onClick={checkToken}
            className="bg-blue-600 text-white py-1 px-3 rounded text-sm"
          >
            Check Auth Token
          </button>
          
          {tokenInfo && (
            <div className="mt-2 text-sm">
              <p>Token: {tokenInfo.exists ? 'Exists' : 'Not Found'}</p>
              {tokenInfo.exists && <p className="text-xs break-all">{tokenInfo.preview}</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DebugPanel; 