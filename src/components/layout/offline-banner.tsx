"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WifiOff } from "lucide-react";

function useOnlineStatus() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return online;
}

/**
 * Mounted globally. When offline, editor autosave (or any mutating action)
 * should check `useOnlineStatus()` and queue changes locally instead of
 * firing a request that will just fail — this banner is the visible half of
 * that contract.
 */
function OfflineBanner() {
  const online = useOnlineStatus();

  return (
    <AnimatePresence>
      {!online && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0, 0, 0.2, 1] }}
          className="fixed inset-x-0 top-0 z-toast flex items-center justify-center gap-2 bg-warning py-2 text-sm font-medium text-neutral-900"
        >
          <WifiOff className="size-4" />
          You're offline — changes will sync once you're back online.
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { OfflineBanner, useOnlineStatus };
