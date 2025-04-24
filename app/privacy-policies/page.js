import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-600">Last Updated: April 25, 2025</p>

      <h2 className="text-2xl font-semibold mt-6">Privacy Notice</h2>
      <p className="mt-4">
        On this site, we only use cookies and similar tools (collectively,
        "cookies") to provide services to you, including authenticating you,
        preserving your settings, and delivering content. Other ITAN sites and
        services may use cookies for additional purposes.
      </p>

      <h3 className="text-xl font-semibold mt-6">
        What Personal Information Does ITAN Collect?
      </h3>
      <p className="mt-2">
        We collect your personal information to provide and improve our products
        and services:
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li>
          <strong>Information You Give Us:</strong> We receive and store any
          information you provide in relation to ITAN Services.
        </li>
        <li>
          <strong>Automatic Information:</strong> We collect details about your
          interactions with our services using cookies and other identifiers.
        </li>
        <li>
          <strong>Information from Other Sources:</strong> We might receive
          updated delivery addresses or other necessary information.
        </li>
      </ul>

      <h3 className="text-xl font-semibold mt-6">
        How We Use Your Information
      </h3>
      <ul className="list-disc ml-6 mt-2">
        <li>Purchase and delivery of products and services.</li>
        <li>Providing, troubleshooting, and improving our services.</li>
        <li>Personalization and recommendations.</li>
        <li>Legal compliance.</li>
        <li>Communication and customer support.</li>
        <li>Fraud prevention and security.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6">
        Does ITAN Share Your Information?
      </h3>
      <p className="mt-2">
        We do not sell your personal information. We only share it with:
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li>
          Third-party service providers for order fulfillment and support.
        </li>
        <li>Transactions involving third parties with your consent.</li>
        <li>Business transfers and legal obligations.</li>
      </ul>

      <h3 className="text-xl font-semibold mt-6">Your Choices and Rights</h3>
      <p className="mt-2">
        You can manage cookie preferences and data settings via your browser.
        You may also request access or deletion of your personal data as
        permitted by law.
      </p>

      <h3 className="text-xl font-semibold mt-6">Children's Privacy</h3>
      <p className="mt-2">
        Our services are intended for adults. If you are under 18, you may use
        our services only with parental guidance.
      </p>

      <h3 className="text-xl font-semibold mt-6">Policy Updates</h3>
      <p className="mt-2">
        We may update this policy as our services evolve. Please check back for
        updates.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
