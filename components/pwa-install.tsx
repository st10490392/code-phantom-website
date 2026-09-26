"use client";

import { useEffect, useState } from "react";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

export function PwaInstallButton() {
  const [promptEvent, setPromptEvent] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showIosHelp, setShowIosHelp] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    setInstalled(isStandalone());
    setIsIos(/iphone|ipad|ipod/i.test(navigator.userAgent));

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPromptEvent(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setPromptEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) {
    return <span className="text-xs text-muted-text">Installed on this device</span>;
  }

  const install = async () => {
    if (promptEvent) {
      await promptEvent.prompt();
      const choice = await promptEvent.userChoice;
      if (choice.outcome === "accepted") setPromptEvent(null);
      return;
    }
    if (isIos) {
      setShowIosHelp(true);
      return;
    }
    setShowIosHelp(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={install}
        className="rounded-full border border-cyber-blue/40 px-5 py-2.5 text-sm font-medium text-ghost-white transition hover:bg-cyber-blue/10"
      >
        Install CodePhantom
      </button>
      {showIosHelp && (
        <div className="mt-3 max-w-md rounded-xl border border-metallic-silver/10 bg-surface/80 p-4 text-sm leading-relaxed text-muted-text">
          {isIos ? (
            <>
              On iPhone or iPad, open this page in Safari, tap <strong className="text-ghost-white">Share</strong>,
              choose <strong className="text-ghost-white">Add to Home Screen</strong>, then tap
              <strong className="text-ghost-white"> Add</strong>.
            </>
          ) : (
            <>
              If your browser does not show an install prompt, open its menu and choose
              <strong className="text-ghost-white"> Install app</strong> or
              <strong className="text-ghost-white"> Add to Home screen</strong>.
            </>
          )}
        </div>
      )}
    </div>
  );
}
