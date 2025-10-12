import React from 'react';
import { Shield, Cookie, User, FileText } from 'lucide-react';
import '../App.css';

const PrivacyPolicy = () => {
  const lastUpdated = "October 12, 2025";

  return (
    <div className="privacy-policy">
      <div className="page-header">
        <h1>Privacy Policy</h1>
        <p>Protecting your personal information is our priority</p>
        <p className="last-updated">Last Updated: {lastUpdated}</p>
      </div>

      <div className="policy-content">
        <div className="policy-section">
          <div className="section-header">
            <Shield size={24} />
            <h2>Introduction</h2>
          </div>
          <p>
            This Privacy Policy describes how Placement Portal ("we", "our", or "us") collects, 
            uses, and shares your personal information when you use our website and services. 
            We are committed to protecting your privacy and ensuring the security of your personal data.
          </p>
          <p>
            By accessing or using our services, you agree to the collection and use of information 
            in accordance with this policy. If you do not agree with this policy, please do not 
            access or use our services.
          </p>
        </div>

        <div className="policy-section">
          <div className="section-header">
            <User size={24} />
            <h2>Data Collection Details</h2>
          </div>
          <h3>Information We Collect</h3>
          <p>We collect several types of information for various purposes:</p>
          
          <h4>Personal Information</h4>
          <ul>
            <li>Name, email address, phone number</li>
            <li>Academic records and educational background</li>
            <li>Professional experience and skills</li>
            <li>Profile picture and biographical information</li>
            <li>Communication preferences</li>
          </ul>
          
          <h4>Usage Data</h4>
          <ul>
            <li>IP address, browser type, and device information</li>
            <li>Pages visited and time spent on our platform</li>
            <li>Features used and actions taken</li>
            <li>Search queries and interactions</li>
          </ul>
          
          <h4>Cookies and Tracking Technologies</h4>
          <ul>
            <li>Session cookies for authentication</li>
            <li>Preference cookies for user settings</li>
            <li>Analytics cookies for platform improvement</li>
            <li>Third-party cookies from service providers</li>
          </ul>
        </div>

        <div className="policy-section">
          <div className="section-header">
            <FileText size={24} />
            <h2>Usage of Information</h2>
          </div>
          <p>We use the collected information for various purposes:</p>
          <ul>
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To allow you to participate in interactive features</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information for service improvement</li>
            <li>To monitor the usage of our services</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To communicate with you about products, services, and promotional offers</li>
            <li>To provide you with news, special offers, and general information</li>
          </ul>
        </div>

        <div className="policy-section">
          <div className="section-header">
            <Cookie size={24} />
            <h2>Cookie Policy</h2>
          </div>
          <h3>What Are Cookies?</h3>
          <p>
            Cookies are small text files placed on your device when you visit our website. 
            They help us recognize your device and remember certain information about your preferences.
          </p>
          
          <h3>Types of Cookies We Use</h3>
          <h4>Essential Cookies</h4>
          <p>
            These cookies are necessary for the website to function properly. They enable 
            core functionality such as security, network management, and accessibility.
          </p>
          
          <h4>Performance Cookies</h4>
          <p>
            These cookies help us understand how visitors interact with our website by 
            collecting and reporting information anonymously.
          </p>
          
          <h4>Functionality Cookies</h4>
          <p>
            These cookies enable the website to provide enhanced functionality and personalization. 
            They may be set by us or by third-party providers whose services we have added to our pages.
          </p>
          
          <h4>Targeting Cookies</h4>
          <p>
            These cookies may be set through our site by our advertising partners. 
            They may be used by those companies to build a profile of your interests and 
            show you relevant advertisements on other sites.
          </p>
          
          <h3>Managing Cookies</h3>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies 
            that are already on your computer and you can set most browsers to prevent them 
            from being placed. However, if you do this, you may have to manually adjust 
            some preferences every time you visit a site and some services and functionalities 
            may not work.
          </p>
        </div>

        <div className="policy-section">
          <div className="section-header">
            <User size={24} />
            <h2>Third-Party Sharing</h2>
          </div>
          <p>We may share your personal information with third parties in the following circumstances:</p>
          <ul>
            <li><strong>With your consent:</strong> We may share information when you give us permission</li>
            <li><strong>Service providers:</strong> We may share information with trusted third-party companies that perform services on our behalf</li>
            <li><strong>Legal requirements:</strong> We may disclose information if required by law or in response to valid requests by public authorities</li>
            <li><strong>Business transfers:</strong> We may share information in connection with a merger, acquisition, or sale of assets</li>
            <li><strong>Protection of rights:</strong> We may share information to protect our rights, privacy, safety, or property, and that of our affiliates, you, or others</li>
          </ul>
          <p>
            We do not sell, trade, or otherwise transfer your personally identifiable information 
            to third parties without your consent, except as described in this policy.
          </p>
        </div>

        <div className="policy-section">
          <div className="section-header">
            <Shield size={24} />
            <h2>User Rights</h2>
          </div>
          <p>Depending on your location, you may have the following rights regarding your personal information:</p>
          <ul>
            <li><strong>Right to Access:</strong> You have the right to request copies of your personal data</li>
            <li><strong>Right to Rectification:</strong> You have the right to request correction of inaccurate personal data</li>
            <li><strong>Right to Erasure:</strong> You have the right to request deletion of your personal data</li>
            <li><strong>Right to Restrict Processing:</strong> You have the right to restrict the processing of your personal data</li>
            <li><strong>Right to Data Portability:</strong> You have the right to request transfer of your data to another organization</li>
            <li><strong>Right to Object:</strong> You have the right to object to our processing of your personal data</li>
            <li><strong>Right to Withdraw Consent:</strong> You have the right to withdraw consent where processing is based on consent</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the information provided below. 
            We will respond to your request within 30 days.
          </p>
        </div>

        <div className="policy-section">
          <div className="section-header">
            <Shield size={24} />
            <h2>Data Security</h2>
          </div>
          <p>
            We implement appropriate technical and organizational security measures to protect 
            your personal information against unauthorized or unlawful processing and against 
            accidental loss, destruction, or damage.
          </p>
          <p>
            However, no method of transmission over the Internet or method of electronic storage 
            is 100% secure. While we strive to use commercially acceptable means to protect your 
            personal information, we cannot guarantee its absolute security.
          </p>
        </div>

        <div className="policy-section">
          <div className="section-header">
            <User size={24} />
            <h2>Data Retention</h2>
          </div>
          <p>
            We will retain your personal information only for as long as is necessary for 
            the purposes set out in this Privacy Policy. We will retain and use your personal 
            information to the extent necessary to comply with our legal obligations, resolve 
            disputes, and enforce our policies.
          </p>
        </div>

        <div className="policy-section">
          <div className="section-header">
            <Shield size={24} />
            <h2>Children's Privacy</h2>
          </div>
          <p>
            Our service does not address anyone under the age of 13. We do not knowingly 
            collect personally identifiable information from anyone under the age of 13. 
            If you are a parent or guardian and you are aware that your child has provided 
            us with personal information, please contact us.
          </p>
        </div>

        <div className="policy-section">
          <div className="section-header">
            <FileText size={24} />
            <h2>Changes to This Privacy Policy</h2>
          </div>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any 
            changes by posting the new Privacy Policy on this page and updating the 
            "Last Updated" date.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. 
            Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>

        <div className="policy-section">
          <div className="section-header">
            <Mail size={24} />
            <h2>Contact Us</h2>
          </div>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>By email: privacy@placementportal.com</li>
            <li>By phone: +1 (800) 123-4567</li>
            <li>By mail: Privacy Officer, Placement Portal, 123 Privacy Street, Data City, DC 12345</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;