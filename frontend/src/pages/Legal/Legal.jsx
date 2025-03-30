import React, { useState } from 'react';
import './Legal.css';

const Legal = () => {
  const [activeTab, setActiveTab] = useState('terms');
  
  return (
    <div className="legal-page">
      <div className="container">
        <h1 className="page-title">Legal Information</h1>
        
        <div className="tabs">
          <button 
            className={`tab-btn ${activeTab === 'terms' ? 'active' : ''}`}
            onClick={() => setActiveTab('terms')}
          >
            Terms & Conditions
          </button>
          <button 
            className={`tab-btn ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            Privacy Policy
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'terms' ? (
            <div className="terms-content">
              <h2>Terms and Conditions</h2>
              <p>Last updated: May 1, 2023</p>
              
              <div className="section">
                <h3>1. Introduction</h3>
                <p>Welcome to our food delivery service. These Terms and Conditions govern your use of our website and services. By accessing our website or using our services, you agree to these Terms and Conditions.</p>
              </div>
              
              <div className="section">
                <h3>2. Definitions</h3>
                <p>"Service" refers to our food delivery service.</p>
                <p>"Website" refers to our website at www.ourrestaurant.com.</p>
                <p>"User," "You," and "Your" refer to the individual accessing or using the Service.</p>
                <p>"Company," "We," "Us," and "Our" refer to our food delivery service.</p>
              </div>
              
              <div className="section">
                <h3>3. Ordering and Delivery</h3>
                <p>3.1. Orders are subject to availability and confirmation.</p>
                <p>3.2. Delivery times are estimates and may vary based on factors such as traffic, weather, and order volume.</p>
                <p>3.3. We reserve the right to refuse service to anyone for any reason at any time.</p>
              </div>
              
              <div className="section">
                <h3>4. Payment</h3>
                <p>4.1. Prices are subject to change without notice.</p>
                <p>4.2. Payment must be made at the time of ordering.</p>
                <p>4.3. We accept various payment methods as indicated on our website.</p>
              </div>
              
              <div className="section">
                <h3>5. Cancellations and Refunds</h3>
                <p>5.1. Cancellations may be subject to a fee depending on the stage of order processing.</p>
                <p>5.2. Refunds are processed according to our Refund Policy.</p>
              </div>
              
              <div className="section">
                <h3>6. User Accounts</h3>
                <p>6.1. You are responsible for maintaining the confidentiality of your account information.</p>
                <p>6.2. You are responsible for all activities that occur under your account.</p>
              </div>
              
              <div className="section">
                <h3>7. Intellectual Property</h3>
                <p>7.1. All content on our website is our property or that of our suppliers and is protected by copyright laws.</p>
              </div>
              
              <div className="section">
                <h3>8. Limitation of Liability</h3>
                <p>8.1. We are not liable for any indirect, incidental, special, consequential, or punitive damages.</p>
              </div>
              
              <div className="section">
                <h3>9. Changes to Terms</h3>
                <p>9.1. We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website.</p>
              </div>
              
              <div className="section">
                <h3>10. Contact Us</h3>
                <p>If you have any questions about these Terms, please contact us at dennisopoola@gmail.com.</p>
              </div>
            </div>
          ) : (
            <div className="privacy-content">
              <h2>Privacy Policy</h2>
              <p>Last updated: May 1, 2023</p>
              
              <div className="section">
                <h3>1. Introduction</h3>
                <p>This Privacy Policy describes how we collect, use, and disclose your personal information when you use our website and services.</p>
              </div>
              
              <div className="section">
                <h3>2. Information We Collect</h3>
                <p>2.1. <strong>Personal Information:</strong> Name, email address, phone number, delivery address, and payment information.</p>
                <p>2.2. <strong>Usage Data:</strong> Information about how you use our website and services, including IP address, browser type, pages visited, and time spent on our website.</p>
                <p>2.3. <strong>Cookies and Similar Technologies:</strong> We use cookies and similar technologies to collect information about your browsing activities.</p>
              </div>
              
              <div className="section">
                <h3>3. How We Use Your Information</h3>
                <p>3.1. To provide and maintain our services.</p>
                <p>3.2. To process and deliver your orders.</p>
                <p>3.3. To communicate with you about your orders and provide customer support.</p>
                <p>3.4. To improve our website and services.</p>
                <p>3.5. To send you marketing communications (with your consent).</p>
              </div>
              
              <div className="section">
                <h3>4. How We Share Your Information</h3>
                <p>4.1. <strong>Service Providers:</strong> We may share your information with third-party service providers who help us operate our business.</p>
                <p>4.2. <strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</p>
              </div>
              
              <div className="section">
                <h3>5. Data Security</h3>
                <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
              </div>
              
              <div className="section">
                <h3>6. Your Rights</h3>
                <p>You have the right to access, correct, update, or delete your personal information. You can exercise these rights by contacting us at dennisopoola@gmail.com.</p>
              </div>
              
              <div className="section">
                <h3>7. Changes to This Privacy Policy</h3>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
              </div>
              
              <div className="section">
                <h3>8. Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us at dennisopoola@gmail.com.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Legal; 