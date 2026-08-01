"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface PresentSyncState {
  sceneIndex: number;
  blackout: boolean;
}

/**
 * Present Mode is meant to run across two displays: Presenter View on the
 * laptop, Audience View fullscreen on the projector/TV — opened as a second
 * browser tab/window via "Open Audience View". BroadcastChannel keeps them
 * in sync client-side with zero backend involvement, which is the correct
 * scope for a same-device dual-display setup (a remote-viewer scenario goes
 * through the real share link instead, not this channel).
 */
function usePresentSync(deckId: string, role: "presenter" | "audience") {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [state, setState] = useState<PresentSyncState>({ sceneIndex: 0, blackout: false });

  useEffect(() => {
    const channel = new BroadcastChannel(`motiondeck-present-${deckId}`);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<PresentSyncState>) => {
      if (role === "audience") setState(event.data);
    };

    return () => channel.close();
  }, [deckId, role]);

  const broadcast = useCallback((next: PresentSyncState) => {
    setState(next);
    channelRef.current?.postMessage(next);
  }, []);

  return { state, broadcast };
}

export { usePresentSync };
export type { PresentSyncState };
