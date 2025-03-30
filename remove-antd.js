import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Function to remove Ant Design
function removeAntDesign() {
  try {
    console.log('Removing Ant Design...');
    
    // Uninstall Ant Design packages
    execSync('npm uninstall antd @ant-design/icons', { 
      cwd: './admin',
      stdio: 'inherit' 
    });
    
    // Update main.jsx to remove Ant Design CSS import
    const mainJsxPath = path.join('admin', 'src', 'main.jsx');
    if (fs.existsSync(mainJsxPath)) {
      let mainJsxContent = fs.readFileSync(mainJsxPath, 'utf8');
      
      // Remove the Ant Design CSS import
      mainJsxContent = mainJsxContent.replace(
        /import ['"]antd\/dist\/.*?['"];?\n?/g,
        ''
      );
      
      fs.writeFileSync(mainJsxPath, mainJsxContent);
      console.log('Updated main.jsx to remove Ant Design CSS import');
    }
    
    // Replace the Settings.jsx file with a version that doesn't use Ant Design
    const settingsPath = path.join('admin', 'src', 'pages', 'Settings.jsx');
    if (fs.existsSync(settingsPath)) {
      // Create a simplified Settings component without Ant Design
      const newSettingsContent = `
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/config';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'Meal Lovers',
    siteDescription: 'Delicious food delivery service',
    contactEmail: 'contact@meallovers.com',
    contactPhone: '+1 (555) 123-4567',
    enableRegistration: true,
    maintenanceMode: false,
    theme: 'light',
    currency: 'USD',
    taxRate: 7.5,
    deliveryFee: 3.99,
    minOrderAmount: 10,
    maxDeliveryDistance: 10
  });
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    // Load settings from API
    const fetchSettings = async () => {
      try {
        const response = await axios.get(\`\${API_URL}/api/settings\`);
        if (response.data.success) {
          setSettings(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        alert('Failed to load settings');
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(\`\${API_URL}/api/settings\`, settings, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: \`Bearer \${localStorage.getItem('token')}\`
        }
      });

      if (response.data.success) {
        alert('Settings updated successfully');
      } else {
        alert(response.data.error || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">System Settings</h1>
        
        <div className="mb-4">
          <button 
            className={\`mr-4 px-4 py-2 \${activeTab === 'general' ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button 
            className={\`px-4 py-2 \${activeTab === 'email' ? 'bg-blue-500 text-white' : 'bg-gray-200'}\`}
            onClick={() => setActiveTab('email')}
          >
            Email
          </button>
        </div>
        
        {activeTab === 'general' && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        )}
        
        {activeTab === 'email' && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">SMTP Host</label>
              <input
                type="text"
                name="smtpHost"
                value={settings.smtpHost || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
      `;
      
      fs.writeFileSync(settingsPath, newSettingsContent);
      console.log('Updated Settings.jsx to remove Ant Design dependencies');
    }
    
    console.log('Ant Design removed successfully!');
  } catch (error) {
    console.error('Error removing Ant Design:', error.message);
  }
}

removeAntDesign(); 