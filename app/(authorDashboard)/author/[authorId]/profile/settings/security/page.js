"use client";

import { Switch } from "@/components/ui/switch";
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";

export default function Email2FASwitch() {
  const [active, setActive] = useState(null); 

  // Handle API update whenever active changes
  useEffect(() => {
    const update2FA = async () => {
      if (!active) return;

      const author = {
        two_factor_enabled: true,
        preferred_2fa_method: active,
      };

      try {
        const response = await api.patch("/authors/profile", {author});
        console.log("2FA updated:", response);
      } catch (err) {
        console.error("2FA update error:", err);
      }
    };

    update2FA();
  }, [active]);

  const isEmailEnabled = active === "email";
  const isPhoneEnabled = active === "phone";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <p>Email</p>
        <Switch
          checked={isEmailEnabled}
          onCheckedChange={(val) => setActive(val ? "email" : null)}
          className={cn(
            isEmailEnabled && "bg-green-500",
            "data-[state=checked]:bg-green-500"
          )}
        />
        <span>{isEmailEnabled ? "Enabled" : "Disabled"}</span>
      </div>

      <div className="flex items-center gap-4">
        <p>Phone</p>
        <Switch
          checked={isPhoneEnabled}
          onCheckedChange={(val) => setActive(val ? "phone" : null)}
          className={cn(
            isPhoneEnabled && "bg-green-500",
            "data-[state=checked]:bg-green-500"
          )}
        />
        <span>{isPhoneEnabled ? "Enabled" : "Disabled"}</span>
      </div>
    </div>
  );
}
