import React from 'react';
import { FileText, User, Shield, AlertTriangle } from 'lucide-react';
import '../App.css';

const TermsConditions = () => {
  const lastUpdated = "October 12, 2025";

  return (
    <div className="terms-conditions">
      <div className="page-header">
        <h1>Terms & Conditions</h1>
        <p>Governing your use of our platform and services</p>
        <p className="last-updated">Last Updated: {lastUpdated}</p>
      </div>

      <div className="terms-content">
        <div className="terms-section">
          <div className="section-header">
            <FileText size={24} />
            <h2>User Agreement</h2>
          </div>
          <p>
            Welcome to Placement Portal. These terms and conditions outline the rules and 
            regulations for the use of Placement Portal's Website and Services.
          </p>
          <p>
            By accessing this website, we assume you accept these terms and conditions. 
            Do not continue to use Placement Portal if you do not agree to all of the terms 
            and conditions stated on this page.
          </p>
          <p>
            The following terminology applies to these Terms and Conditions, Privacy Statement 
            and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, 
            the person log on this website and compliant to the Company's terms and conditions. 
            "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. 
            "Party", "Parties", or "Us", refers to both the Client and ourselves.
          </p>
        </div>

        <div className="terms-section">
          <div className="section-header">
            <User size={24} />
            <h2>Usage Rules</h2>
          </div>
          <h3>Eligibility</h3>
          <p>
            You must be at least 13 years old to use our services. By agreeing to these terms, 
            you represent and warrant that you meet this requirement.
          </p>
          
          <h3>Account Registration</h3>
          <p>
            To access certain features of our platform, you may be required to register for an account. 
            You agree to provide accurate, current, and complete information during the registration 
            process and to update such information to keep it accurate, current, and complete.
          </p>
          
          <h3>Account Security</h3>
          <p>
            You are responsible for maintaining the confidentiality of your account and password, 
            including but not limited to the restriction of access to your computer and/or account. 
            You agree to accept responsibility for any and all activities or actions that occur 
            under your account and/or password.
          </p>
          
          <h3>Prohibited Activities</h3>
          <p>You agree not to engage in any of the following prohibited activities:</p>
          <ul>
            <li>Using the service for any illegal purpose or in violation of any local, state, national, or international law</li>
            <li>Posting or transmitting any material that is harmful, offensive, obscene, defamatory, or objectionable</li>
            <li>Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity</li>
            <li>Interfering with or disrupting the service or servers or networks connected to the service</li>
            <li>Attempting to gain unauthorized access to any portion of the service or any other systems or networks</li>
            <li>Using any robot, spider, scraper, or other automated means to access the service for any purpose</li>
            <li>Transmitting any viruses, worms, defects, Trojan horses, or other items of a destructive nature</li>
          </ul>
        </div>

        <div className="terms-section">
          <div className="section-header">
            <Shield size={24} />
            <h2>Platform Policies</h2>
          </div>
          <h3>Content Ownership</h3>
          <p>
            You retain all ownership rights in your content. However, by submitting, posting, 
            or displaying content on or through our services, you grant us a worldwide, 
            non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, 
            modify, publish, transmit, display, and distribute such content in any and all 
            media or distribution methods.
          </p>
          
          <h3>Intellectual Property</h3>
          <p>
            Unless otherwise stated, Placement Portal and/or its licensors own the intellectual 
            property rights for all material on Placement Portal. All intellectual property 
            rights are reserved. You may view and/or print pages from Placement Portal for 
            your own personal use subject to restrictions set in these terms and conditions.
          </p>
          
          <h3>User-Generated Content</h3>
          <p>
            You are responsible for the content you post on our platform. We reserve the right 
            to remove any content that violates our policies or is deemed inappropriate. 
            We do not endorse any user-generated content or opinions expressed by users.
          </p>
          
          <h3>Service Availability</h3>
          <p>
            We strive to provide our services without interruption, but we cannot guarantee 
            that our services will be available at all times. We may experience hardware, 
            software, or other problems or need to perform maintenance related to our services, 
            resulting in interruptions, delays, or errors.
          </p>
        </div>

        <div className="terms-section">
          <div className="section-header">
            <AlertTriangle size={24} />
            <h2>Liability Disclaimer</h2>
          </div>
          <h3>No Professional Advice</h3>
          <p>
            The content on our platform is provided for general information purposes only 
            and does not constitute professional advice. You should not rely solely on 
            information on our platform to make decisions about your career or education.
          </p>
          
          <h3>Limitation of Liability</h3>
          <p>
            In no event shall Placement Portal, nor its directors, employees, partners, 
            agents, suppliers, or affiliates, be liable for any indirect, incidental, 
            special, consequential, or punitive damages, including without limitation, 
            loss of profits, data, use, goodwill, or other intangible losses, resulting 
            from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use the service</li>
            <li>Any conduct or content of any third party on the service</li>
            <li>Any content obtained from the service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
          
          <h3>Indemnification</h3>
          <p>
            You agree to defend, indemnify, and hold harmless Placement Portal and its 
            affiliates, licensors, and service providers, and its and their respective 
            officers, directors, employees, contractors, agents, licensors, suppliers, 
            successors, and assigns from and against any claims, liabilities, damages, 
            judgments, awards, losses, costs, expenses, or fees (including reasonable 
            attorneys' fees) arising out of or relating to your violation of these terms 
            or your use of the website or services.
          </p>
        </div>

        <div className="terms-section">
          <div className="section-header">
            <FileText size={24} />
            <h2>Dispute Resolution</h2>
          </div>
          <h3>Governing Law</h3>
          <p>
            These terms shall be governed and construed in accordance with the laws of 
            [Your Jurisdiction], without regard to its conflict of law provisions.
          </p>
          
          <h3>Dispute Resolution Process</h3>
          <p>
            Any dispute, claim, or controversy arising out of or relating to these terms 
            or the breach, termination, enforcement, interpretation, or validity thereof, 
            including the determination of the scope or applicability of this agreement 
            to arbitrate, shall be determined by arbitration in [Your Jurisdiction] before 
            a single arbitrator.
          </p>
          
          <h3>Class Action Waiver</h3>
          <p>
            Any proceedings to resolve or litigate any dispute in any forum will be conducted 
            solely on an individual basis. Neither you nor we will seek to have any dispute 
            heard as a class action or in any other proceeding in which either party acts 
            or proposes to act in a representative capacity.
          </p>
        </div>

        <div className="terms-section">
          <div className="section-header">
            <FileText size={24} />
            <h2>Modifications to Terms</h2>
          </div>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms 
            at any time. If a revision is material, we will provide at least 30 days' notice 
            prior to any new terms taking effect. What constitutes a material change will 
            be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our service after any revisions become effective, 
            you agree to be bound by the revised terms. If you do not agree to the new terms, 
            you are no longer authorized to use the service.
          </p>
        </div>

        <div className="terms-section">
          <div className="section-header">
            <User size={24} />
            <h2>Termination</h2>
          </div>
          <p>
            We may terminate or suspend your account and bar access to the Service immediately, 
            without prior notice or liability, under our sole discretion, for any reason whatsoever 
            and without limitation, including but not limited to a breach of the Terms.
          </p>
          <p>
            If you wish to terminate your account, you may simply discontinue using the Service.
          </p>
          <p>
            All provisions of the Terms which by their nature should survive termination shall 
            survive termination, including, without limitation, ownership provisions, warranty 
            disclaimers, indemnity, and limitations of liability.
          </p>
        </div>

        <div className="terms-section">
          <div className="section-header">
            <Mail size={24} />
            <h2>Contact Information</h2>
          </div>
          <p>If you have any questions about these Terms, please contact us:</p>
          <ul>
            <li>By email: terms@placementportal.com</li>
            <li>By phone: +1 (800) 123-4567</li>
            <li>By mail: Legal Department, Placement Portal, 123 Legal Street, Law City, LC 12345</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;