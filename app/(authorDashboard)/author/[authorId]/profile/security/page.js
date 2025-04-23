"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

import { api } from "@/utils/api";


const Profile = () => {
  const router = useRouter();

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
        const response = await api.patch("/authors/profile", { author });
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
    <div>
      <section className="text-center mx-auto">
        <div className="flex justify-between ">
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => router.back()}
            className="ml-3 p-2 py-1 rounded-md cursor-pointer hover:bg-gray-400"
          />
          <h2 className="font-bold text-xl ">Privacy and Security</h2>
          <p className="mr-7" />
        </div>
      </section>

      <section>
        <div className="relative flex mx-auto flex-col items-center max-w-lg bg-white shadow-md rounded-lg mt-16  px-2 text-sm">
          <h3 className="absolute left-0 -top-6 text-lg">
            Multi-factor Authentication
          </h3>
          <div className="flex justify-between items-center w-full my-2">
            <div>
              <p className="text-lg text-gray-800">Phone</p>
              <p className="pt-1 text-xs text-gray-500">
                Secure sign-in with phone verification.
              </p>
            </div>
            <div className="cursor-pointer">
              <Switch
                checked={isPhoneEnabled}
                onCheckedChange={(val) => setActive(val ? "phone" : null)}
                className={cn(
                  isPhoneEnabled && "bg-green-500",
                  "data-[state=checked]:bg-green-500"
                )}
              />
              <p className="text-xs text-gray-500">
                {isPhoneEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center w-full mb-2">
            <div>
              <p className="text-lg text-gray-800">Email</p>
              <p className="pt-1 text-xs text-gray-500">
                Secure sign-in with email verification.
              </p>
            </div>
            <div className="cursor-pointer">
              <Switch
                checked={isEmailEnabled}
                onCheckedChange={(val) => setActive(val ? "email" : null)}
                className={cn(
                  isEmailEnabled && "bg-green-500",
                  "data-[state=checked]:bg-green-500"
                )}
              />
              <p className="text-xs text-gray-500">
                {isEmailEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
