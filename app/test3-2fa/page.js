"use client";

import { useEffect, useState } from "react";
import {
  getTwoFactorStatus,
  setupSms2FA,
  verifySms2FA,
  enableEmail2FA,
  disable2FA,
} from "@/utils/twoFactorAuth";

const TwoFactorSettings = () => {
  const [status, setStatus] = useState(null);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState("idle"); // idle | setup_sms | verify_sms

  useEffect(() => {
    const fetchStatus = async () => {
      const res = await getTwoFactorStatus();
      setStatus(res);
    };

    fetchStatus();
  }, []);

  const handleEnableEmail = async () => {
    await enableEmail2FA();
    alert("Email 2FA enabled");
  };

  const handleSetupSms = async () => {
    await setupSms2FA(phone);
    setStep("verify_sms");
  };

  const handleVerifySms = async () => {
    await verifySms2FA(code);
    alert("Phone verified and 2FA enabled with SMS");
    setStep("idle");
  };

  const handleDisable = async () => {
    await disable2FA();
    alert("2FA disabled");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>

      {status && (
        <div>
          <p>2FA Enabled: {status.two_factor_enabled ? "✅" : "❌"}</p>
          <p>Preferred Method: {status.preferred_method || "None"}</p>
          {status.phone_number && (
            <p>
              Phone: {status.phone_number}{" "}
              {status.phone_verified ? "✅ Verified" : "❌ Not Verified"}
            </p>
          )}
        </div>
      )}

      <button onClick={handleEnableEmail} className="btn">
        Enable Email 2FA
      </button>

      {!status?.phone_verified && (
        <>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input"
          />
          <button onClick={handleSetupSms} className="btn">
            Register Phone
          </button>
        </>
      )}

      {step === "verify_sms" && (
        <>
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input"
          />
          <button onClick={handleVerifySms} className="btn">
            Verify Code
          </button>
        </>
      )}

      {status?.two_factor_enabled && (
        <button onClick={handleDisable} className="btn text-red-500">
          Disable 2FA
        </button>
      )}
    </div>
  );
};

export default TwoFactorSettings;
